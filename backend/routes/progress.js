import { Router } from "express";
import Progress from "../models/Progress.js";
const router = Router();

// add progress
router.post("/", async (req, res) => {
    try {
        const progress = await Progress.create(req.body);
        res.json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get progress
router.get("/:userId", async (req, res) => {
    try {
        const records = await Progress.find({ userId: req.params.userId });
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
