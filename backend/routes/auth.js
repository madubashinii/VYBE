import { Router } from "express";
import User from "../models/User.js";
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

export default router;
