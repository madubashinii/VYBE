import { Router } from "express";
import User from "../models/User.js";
import Plan from "../models/Plan.js";
import Progress from "../models/Progress.js";
import AuditLog from "../models/AuditLog.js";
import { auth } from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { buildCsv, buildWeeklySeries, escapeRegExp } from "../lib/adminUtils.js";

const router = Router();

const serializeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role ?? "user",
    active: user.active !== undefined ? user.active : true,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});

const isObjectId = (value) => Types.ObjectId.isValid(String(value));

const auditAction = async (req, action, entityType, entityId, meta = {}) => {
    try {
        await AuditLog.create({
            actorId: req.adminUser?._id || req.user?.id,
            actorEmail: req.adminUser?.email,
            action,
            entityType,
            entityId: entityId ? String(entityId) : undefined,
            meta,
            ip: req.ip,
            userAgent: req.headers["user-agent"],
        });
    } catch (err) {
        console.error("Audit log write failed:", err.message);
    }
};

const rateLimitBuckets = new Map();
const rateLimitAdmin = (limit = 40, windowMs = 60_000) => (req, res, next) => {
    const key = `${req.ip}:${req.baseUrl}${req.path}`;
    const now = Date.now();
    const bucket = rateLimitBuckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
        rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
        return next();
    }

    if (bucket.count >= limit) {
        return res.status(429).json({ message: "Too many admin requests. Please try again shortly." });
    }

    bucket.count += 1;
    next();
};

const normalizePlan = (plan) => ({
    id: plan._id,
    name: plan.name,
    userId: plan.userId && typeof plan.userId === "object" ? plan.userId._id : plan.userId,
    user: plan.userId && typeof plan.userId === "object" ? serializeUser(plan.userId) : null,
    goal: plan.goal,
    difficulty: plan.difficulty,
    description: plan.description,
    duration: plan.duration,
    exercises: plan.exercises ?? [],
    updatedAt: plan.updatedAt,
    createdAt: plan.createdAt,
});

const normalizeProgress = (progress) => ({
    id: progress._id,
    userId: progress.userId && typeof progress.userId === "object" ? progress.userId._id : progress.userId,
    user: progress.userId && typeof progress.userId === "object" ? serializeUser(progress.userId) : null,
    exerciseName: progress.exerciseName,
    current: progress.current,
    target: progress.target,
    progressPercent: progress.progressPercent,
    caloriesBurned: progress.caloriesBurned,
    dateRecorded: progress.dateRecorded,
});

const requireAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        if ((user.role ?? "user") !== "admin") {
            return res.status(403).json({ message: "Admin access required" });
        }

        req.adminUser = user;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

router.use(auth);
router.use(requireAdmin);

// Overview / Dashboard
router.get("/overview", rateLimitAdmin(), async (req, res) => {
    try {
        const since = new Date();
        since.setDate(since.getDate() - 7);

        const [userCount, adminCount, planCount, progressCount, recentUsers, recentPlans, recentLogs, roleBreakdown, progressByDay] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: "admin" }),
            Plan.countDocuments(),
            Progress.countDocuments(),
            User.find().sort({ createdAt: -1 }).limit(5),
            Plan.find().sort({ updatedAt: -1 }).limit(5),
            AuditLog.find().sort({ createdAt: -1 }).limit(5),
            User.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
            Progress.aggregate([
                { $match: { dateRecorded: { $gte: since } } },
                { $group: { _id: { $dayOfWeek: "$dateRecorded" }, count: { $sum: 1 } } },
            ]),
        ]);

        const weekly = buildWeeklySeries(progressByDay);

        res.json({
            overview: { userCount, adminCount, planCount, progressCount },
            currentAdmin: serializeUser(req.adminUser),
            recentUsers: recentUsers.map(serializeUser),
            recentPlans: recentPlans.map(normalizePlan),
            recentLogs: recentLogs.map((log) => ({
                id: log._id,
                actorId: log.actorId,
                actorEmail: log.actorEmail,
                action: log.action,
                entityType: log.entityType,
                entityId: log.entityId,
                meta: log.meta,
                createdAt: log.createdAt,
            })),
            roleBreakdown,
            progressByDay: weekly,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Users list
router.get("/users", rateLimitAdmin(), async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Number(req.query.limit) || 20);
        const skip = (page - 1) * limit;

        const search = req.query.search ? String(req.query.search).trim() : null;
        const role = req.query.role ? String(req.query.role).trim() : null;
        const active = req.query.active;

        const filter = {};
        if (search) {
            const re = new RegExp(escapeRegExp(search), "i");
            filter.$or = [{ name: re }, { email: re }];
        }
        if (role) filter.role = role;
        if (active === "true") filter.active = true;
        if (active === "false") filter.active = false;

        const [users, total] = await Promise.all([
            User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            User.countDocuments(filter),
        ]);

        res.json({ users: users.map(serializeUser), total, page, limit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Bulk user actions
router.post("/users/bulk", rateLimitAdmin(), async (req, res) => {
    try {
        const { action, ids } = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "ids must be a non-empty array" });
        }

        const validIds = ids.filter((id) => isObjectId(id)).map(String);
        if (!validIds.length) return res.status(400).json({ message: "No valid user ids provided" });

        let update = {};
        if (action === "promote") update = { role: "admin" };
        else if (action === "demote") update = { role: "user" };
        else if (action === "activate") update = { active: true };
        else if (action === "deactivate") update = { active: false };
        else return res.status(400).json({ message: "Invalid bulk action" });

        const result = await User.updateMany({ _id: { $in: validIds } }, update);
        await auditAction(req, `users.bulk.${action}`, "user", null, { ids: validIds, matched: result.matchedCount ?? result.n, modified: result.modifiedCount ?? result.nModified });

        res.json({ message: "Bulk action complete", matched: result.matchedCount ?? result.n, modified: result.modifiedCount ?? result.nModified });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update single user's role
router.put("/users/:id/role", rateLimitAdmin(), async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid user id" });

        const { role } = req.body;
        if (!["user", "admin"].includes(role)) return res.status(400).json({ message: "Invalid role" });

        const updated = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
        if (!updated) return res.status(404).json({ message: "User not found" });

        await auditAction(req, "user.role.updated", "user", updated._id, { role });
        res.json({ message: "Role updated", user: serializeUser(updated) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single user
router.get("/users/:id", rateLimitAdmin(), async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid user id" });

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user: serializeUser(user) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Set active flag (soft-deactivate/reactivate)
router.put("/users/:id/active", rateLimitAdmin(), async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid user id" });

        const { active } = req.body;
        if (typeof active !== "boolean") return res.status(400).json({ message: "Invalid active value" });

        const updated = await User.findByIdAndUpdate(req.params.id, { active }, { new: true });
        if (!updated) return res.status(404).json({ message: "User not found" });

        await auditAction(req, active ? "user.reactivated" : "user.deactivated", "user", updated._id, { active });
        res.json({ message: active ? "User reactivated" : "User deactivated", user: serializeUser(updated) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Impersonate user: returns a short-lived token for the target user
router.post("/users/:id/impersonate", rateLimitAdmin(10, 60_000), async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid user id" });

        const target = await User.findById(req.params.id);
        if (!target) return res.status(404).json({ message: "User not found" });

        const token = jwt.sign({ id: target._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        await auditAction(req, "user.impersonated", "user", target._id, {});

        res.json({ message: "Impersonation token created", token, user: serializeUser(target) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Plans moderation
router.get("/plans", rateLimitAdmin(), async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Number(req.query.limit) || 20);
        const skip = (page - 1) * limit;
        const search = req.query.search ? String(req.query.search).trim() : null;
        const userId = req.query.userId ? String(req.query.userId).trim() : null;

        const filter = {};
        if (search) {
            const re = new RegExp(escapeRegExp(search), "i");
            filter.$or = [{ name: re }, { description: re }, { goal: re }, { difficulty: re }];
        }
        if (userId) {
            if (!isObjectId(userId)) return res.status(400).json({ message: "Invalid user id" });
            filter.userId = userId;
        }

        const [plans, total] = await Promise.all([
            Plan.find(filter).populate("userId", "name email role active").sort({ updatedAt: -1 }).skip(skip).limit(limit),
            Plan.countDocuments(filter),
        ]);

        res.json({ plans: plans.map(normalizePlan), total, page, limit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/plans/:id", rateLimitAdmin(), async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid plan id" });

        const plan = await Plan.findById(req.params.id).populate("userId", "name email role active");
        if (!plan) return res.status(404).json({ message: "Plan not found" });
        res.json({ plan: normalizePlan(plan) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/plans/:id", rateLimitAdmin(), async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid plan id" });

        const allowed = ["name", "description", "duration", "difficulty", "goal", "exercises"];
        const update = {};
        for (const key of allowed) if (req.body[key] !== undefined) update[key] = req.body[key];

        const updated = await Plan.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!updated) return res.status(404).json({ message: "Plan not found" });

        await auditAction(req, "plan.updated", "plan", updated._1d ?? updated._id, { fields: Object.keys(update) });
        res.json({ message: "Plan updated", plan: normalizePlan(updated) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/plans/:id", rateLimitAdmin(), async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid plan id" });

        const deleted = await Plan.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Plan not found" });

        await auditAction(req, "plan.deleted", "plan", deleted._id, {});
        res.json({ message: "Plan deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Progress moderation
router.get("/progress", rateLimitAdmin(), async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Number(req.query.limit) || 20);
        const skip = (page - 1) * limit;
        const search = req.query.search ? String(req.query.search).trim() : null;
        const userId = req.query.userId ? String(req.query.userId).trim() : null;

        const filter = {};
        if (search) {
            const re = new RegExp(escapeRegExp(search), "i");
            filter.$or = [{ exerciseName: re }];
        }
        if (userId) {
            if (!isObjectId(userId)) return res.status(400).json({ message: "Invalid user id" });
            filter.userId = userId;
        }

        const [records, total] = await Promise.all([
            Progress.find(filter).populate("userId", "name email role active").sort({ dateRecorded: -1 }).skip(skip).limit(limit),
            Progress.countDocuments(filter),
        ]);

        res.json({ progress: records.map(normalizeProgress), total, page, limit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/progress/:id", rateLimitAdmin(), async (req, res) => {
    try {
        if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid progress id" });

        const deleted = await Progress.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Progress record not found" });

        await auditAction(req, "progress.deleted", "progress", deleted._id, {});
        res.json({ message: "Progress record deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/progress/export", rateLimitAdmin(), async (req, res) => {
    try {
        const search = req.query.search ? String(req.query.search).trim() : null;
        const userId = req.query.userId ? String(req.query.userId).trim() : null;
        const filter = {};
        if (search) filter.exerciseName = new RegExp(escapeRegExp(search), "i");
        if (userId) {
            if (!isObjectId(userId)) return res.status(400).json({ message: "Invalid user id" });
            filter.userId = userId;
        }

        const records = await Progress.find(filter).populate("userId", "name email").sort({ dateRecorded: -1 });
        const header = ["userName", "userEmail", "exerciseName", "current", "target", "progressPercent", "caloriesBurned", "dateRecorded"];
        const csv = buildCsv(header, records.map((record) => {
            const user = record.userId || {};
            return [user.name, user.email, record.exerciseName, record.current, record.target, record.progressPercent, record.caloriesBurned, record.dateRecorded?.toISOString?.() || ""];
        }));

        await auditAction(req, "progress.exported", "progress", null, { count: records.length });

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", 'attachment; filename="progress-export.csv"');
        res.send(csv);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Audit logs
router.get("/logs", rateLimitAdmin(), async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Number(req.query.limit) || 20);
        const skip = (page - 1) * limit;
        const action = req.query.action ? String(req.query.action).trim() : null;
        const entityType = req.query.entityType ? String(req.query.entityType).trim() : null;

        const filter = {};
        if (action) filter.action = action;
        if (entityType) filter.entityType = entityType;

        const [logs, total] = await Promise.all([
            AuditLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            AuditLog.countDocuments(filter),
        ]);

        res.json({
            logs: logs.map((log) => ({
                id: log._1d ?? log._id,
                actorId: log.actorId,
                actorEmail: log.actorEmail,
                action: log.action,
                entityType: log.entityType,
                entityId: log.entityId,
                meta: log.meta,
                ip: log.ip,
                userAgent: log.userAgent,
                createdAt: log.createdAt,
            })),
            total,
            page,
            limit,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dashboard
router.get("/dashboard", rateLimitAdmin(), async (req, res) => {
    try {
        const since = new Date();
        since.setDate(since.getDate() - 30);

        const [recentLogs, roleBreakdown, planByGoal, progressByDay, topUsers] = await Promise.all([
            AuditLog.find().sort({ createdAt: -1 }).limit(10),
            User.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
            Plan.aggregate([{ $group: { _id: "$goal", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
            Progress.aggregate([
                { $match: { dateRecorded: { $gte: since } } },
                { $group: { _id: { $dayOfWeek: "$dateRecorded" }, count: { $sum: 1 } } },
            ]),
            Progress.aggregate([
                { $group: { _id: "$userId", totalUpdates: { $sum: 1 }, avgProgress: { $avg: "$progressPercent" } } },
                { $sort: { totalUpdates: -1 } },
                { $limit: 5 },
            ]),
        ]);

        const progressSeries = buildWeeklySeries(progressByDay);

        res.json({
            roleBreakdown: roleBreakdown.map((item) => ({ role: item._id, count: item.count })),
            planByGoal: planByGoal.map((item) => ({ goal: item._id || "Unknown", count: item.count })),
            progressSeries,
            recentLogs: recentLogs.map((log) => ({ id: log._id, action: log.action, entityType: log.entityType, entityId: log.entityId, actorEmail: log.actorEmail, createdAt: log.createdAt })),
            topUsers,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
