import { Router } from "express";
import Progress from "../models/Progress.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// add progress
router.post("/", auth, async (req, res) => {
    try {
        const progress = await Progress.create({
            ...req.body,
            userId: req.user.id
        });

        res.json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get logged-in user's progress
router.get("/", auth, async (req, res) => {
    try {
        const records = await Progress.find({ userId: req.user.id });
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
