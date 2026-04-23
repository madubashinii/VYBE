import { Router } from "express";
import User from "../models/User.js";
import Plan from "../models/Plan.js";
import crypto from "crypto";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
const router = Router();

const serializeUser = (user) => {
    if (!user) return null;

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        weight: user.weight ?? 0,
        height: user.height ?? 0,
        age: user.age ?? 0,
        role: user.role ?? "user",
        preferences: user.preferences,
        reminders: user.reminders ?? [],
        achievements: user.achievements,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists" });

        const hashed = await hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed,
            role,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Registered successfully", user: serializeUser(user), token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email" });

        const match = await compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Login success", token, user: serializeUser(user) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "No account found for that email" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();

        res.json({
            message: "Reset token generated",
            resetToken,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/reset-password", async (req, res) => {
    try {
        const { email, token, password } = req.body;

        if (!email || !token || !password) {
            return res.status(400).json({ message: "Email, token, and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        if (hashedToken !== user.resetPasswordToken || user.resetPasswordExpires < new Date()) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        user.password = await hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Update personal info
router.put("/me", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { weight, height, age } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { weight, height, age },
            { new: true }
        );

        res.json({ message: "Personal info updated", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Middleware to get user from token
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Get user profile
router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const plan = await Plan.findOne({ userId: req.userId }).lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            profile: {
                name: user.name ?? "",
                email: user.email ?? "",
                age: user.age ?? 0,
                weight: user.weight ?? 0,
                height: user.height ?? "",
            },
            preferences: {
                units: user.preferences?.units ?? "imperial",
                notifications: user.preferences?.notifications ?? false,
                publicProfile: user.preferences?.publicProfile ?? false,
            },
            reminders: user.reminders ?? [],
            achievements: user.achievements ?? [],
            plan: plan
                ? { ...plan, _id: plan._id }
                : { _id: null, name: "", description: "", duration: 4, goal: "General Fitness", difficulty: "Beginner" }
        });

    } catch (error) {
        console.error("PROFILE ROUTE ERROR:", error);
        res.status(500).json({ message: "Server error loading profile" });
    }
});


// Update user profile
router.put("/profile", authMiddleware, async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId);
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (req.body.email && req.body.email !== currentUser.email) {
            const emailExists = await User.findOne({ email: req.body.email, _id: { $ne: req.userId } });
            if (emailExists) {
                return res.status(400).json({ message: "Email already exists" });
            }
        }

        const updated = await User.findByIdAndUpdate(
            req.userId,
            {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                weight: req.body.weight,
                height: req.body.height
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile updated", updated: serializeUser(updated) });
    } catch (err) {
        console.error("PROFILE UPDATE ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/profile/plan", authMiddleware, async (req, res) => {
    try {
        const { name, description, duration, goal, difficulty } = req.body;
        let plan = await Plan.findOne({ userId: req.userId });

        if (!plan) {
            plan = await Plan.create({
                userId: req.userId,
                name: name ?? "My Plan",
                description: description ?? "",
                duration: Number(duration) || 4,
                goal: goal ?? "General Fitness",
                difficulty: difficulty ?? "Beginner",
                exercises: [],
            });
        } else {
            if (name !== undefined) plan.name = name;
            if (description !== undefined) plan.description = description;
            if (duration !== undefined) plan.duration = Number(duration) || plan.duration;
            if (goal !== undefined) plan.goal = goal;
            if (difficulty !== undefined) plan.difficulty = difficulty;

            await plan.save();
        }

        res.json({ message: "Plan updated", plan });
    } catch (err) {
        console.error("PROFILE PLAN UPDATE ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});


// Update user preferences
router.put("/preferences", authMiddleware, async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.userId,
            { preferences: req.body },
            { new: true }
        );

        res.json({ message: "Preferences updated", updated: serializeUser(updated) });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/reminders", authMiddleware, async (req, res) => {
    try {
        const reminders = Array.isArray(req.body.reminders) ? req.body.reminders : [];

        const updated = await User.findByIdAndUpdate(
            req.userId,
            { reminders },
            { new: true }
        );

        res.json({ message: "Reminders updated", reminders: updated.reminders ?? [] });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user: serializeUser(user) });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
