import { Router } from "express";
import User from "../models/User.js";
import Plan from "../models/Plan.js";
import Progress from "../models/Progress.js";
import { auth } from "../middleware/auth.js";
import jwt from "jsonwebtoken";

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

router.get("/overview", async (req, res) => {
    try {
        const [userCount, adminCount, planCount, progressCount, recentUsers, recentPlans] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ role: "admin" }),
            Plan.countDocuments(),
            Progress.countDocuments(),
            User.find().sort({ createdAt: -1 }).limit(5),
            Plan.find().sort({ updatedAt: -1 }).limit(5),
        ]);

        res.json({
            overview: {
                userCount,
                adminCount,
                planCount,
                progressCount,
            },
            currentAdmin: serializeUser(req.adminUser),
            recentUsers: recentUsers.map(serializeUser),
            recentPlans: recentPlans.map((plan) => ({
                id: plan._id,
                name: plan.name,
                goal: plan.goal,
                difficulty: plan.difficulty,
                userId: plan.userId,
                updatedAt: plan.updatedAt,
            })),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/users", async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Number(req.query.limit) || 20);
        const skip = (page - 1) * limit;

        const search = req.query.search ? String(req.query.search).trim() : null;
        const role = req.query.role ? String(req.query.role).trim() : null;

        const filter = {};
        if (search) {
            const re = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
            filter.$or = [{ name: re }, { email: re }];
        }
        if (role) filter.role = role;

        const [users, total] = await Promise.all([
            User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            User.countDocuments(filter),
        ]);

        res.json({ users: users.map(serializeUser), total, page, limit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/users/:id/role", async (req, res) => {
    try {
        const { role } = req.body;
        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Role updated", user: serializeUser(updated) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: list plans with pagination and optional search/user filter
router.get("/plans", async (req, res) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(100, Number(req.query.limit) || 20);
        const skip = (page - 1) * limit;

        const search = req.query.search ? String(req.query.search).trim() : null;
        const userId = req.query.userId ? String(req.query.userId).trim() : null;

        const filter = {};
        if (search) {
            const re = new RegExp(search.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&"), "i");
            filter.$or = [{ name: re }, { description: re }, { goal: re }];
        }
        if (userId) filter.userId = userId;

        const [plans, total] = await Promise.all([
            Plan.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit).lean(),
            Plan.countDocuments(filter),
        ]);

        res.json({ plans: plans.map(p => ({ id: p._id, name: p.name, userId: p.userId, goal: p.goal, difficulty: p.difficulty, updatedAt: p.updatedAt })), total, page, limit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: get plan by id
router.get("/plans/:id", async (req, res) => {
    try {
        const plan = await Plan.findById(req.params.id).lean();
        if (!plan) return res.status(404).json({ message: "Plan not found" });
        res.json({ plan });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: update plan
router.put("/plans/:id", async (req, res) => {
    try {
        const allowed = ["name", "description", "duration", "difficulty", "goal", "exercises"];
        const update = {};
        for (const k of allowed) if (req.body[k] !== undefined) update[k] = req.body[k];

        const updated = await Plan.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!updated) return res.status(404).json({ message: "Plan not found" });
        res.json({ message: "Plan updated", plan: updated });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin: delete plan
router.delete("/plans/:id", async (req, res) => {
    try {
        const deleted = await Plan.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Plan not found" });
        res.json({ message: "Plan deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single user
router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user: serializeUser(user) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Set active flag (soft-deactivate/reactivate)
router.put("/users/:id/active", async (req, res) => {
    try {
        const { active } = req.body;
        if (typeof active !== "boolean") return res.status(400).json({ message: "Invalid active value" });

        const updated = await User.findByIdAndUpdate(req.params.id, { active }, { new: true });
        if (!updated) return res.status(404).json({ message: "User not found" });

        res.json({ message: active ? "User reactivated" : "User deactivated", user: serializeUser(updated) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Impersonate user: returns a short-lived token for the target user
router.post("/users/:id/impersonate", async (req, res) => {
    try {
        const target = await User.findById(req.params.id);
        if (!target) return res.status(404).json({ message: "User not found" });

        const token = jwt.sign({ id: target._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Impersonation token created", token, user: serializeUser(target) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;