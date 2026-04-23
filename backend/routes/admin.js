import { Router } from "express";
import User from "../models/User.js";
import Plan from "../models/Plan.js";
import Progress from "../models/Progress.js";
import { auth } from "../middleware/auth.js";

const router = Router();

const serializeUser = (user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role ?? "user",
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
        const users = await User.find().sort({ createdAt: -1 });
        res.json({ users: users.map(serializeUser) });
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

export default router;