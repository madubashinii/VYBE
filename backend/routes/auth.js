import { Router } from "express";
import User from "../models/User.js";
import Plan from "../models/Plan.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
const router = Router();

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

        res.json({ message: "Registered successfully", user, token });
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

        res.json({ message: "Login success", token, user });
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

        res.json({
            profile: {
                name: user.name ?? "",
                email: user.email ?? "",
                age: user.age ?? 0,
                weight: user.weight ?? 0,
                height: user.height ?? "",
            },
            preferences: user.preferences ?? { units: "imperial", notifications: false, publicProfile: false },
            achievements: user.achievements ?? [],
            plan: plan ?? { goal: "General Fitness", difficulty: "Beginner" }
        });

    } catch (error) {
        console.error("PROFILE ROUTE ERROR:", error);
        res.status(500).json({ message: "Server error loading profile" });
    }
});


// Update user profile
router.put("/profile", authMiddleware, async (req, res) => {
    try {
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

        res.json({ message: "Profile updated", updated });
    } catch (err) {
        console.error("PROFILE UPDATE ERROR:", err);
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

        res.json({ message: "Preferences updated", updated });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
