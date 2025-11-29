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

router.get("/stats", auth, async (req, res) => {
    try {
        const progress = await Progress.find({ userId: req.user.id });

        // total number of progress updates
        const totalUpdates = progress.length;

        // average progress percentage
        const avgProgress =
            totalUpdates > 0
                ? Math.round(
                    progress.reduce((sum, p) => sum + (p.progressPercent || 0), 0) / totalUpdates
                )
                : 0;

        // workout streak calculation 
        let streak = 0;
        if (progress.length > 0) {

            const sorted = progress.sort((a, b) => b.dateRecorded - a.dateRecorded);

            streak = 1;
            for (let i = 1; i < sorted.length; i++) {
                const prev = new Date(sorted[i - 1].dateRecorded);
                const curr = new Date(sorted[i].dateRecorded);

                const diffDays = Math.floor((prev - curr) / (1000 * 60 * 60 * 24));

                if (diffDays === 1) {
                    streak++;
                } else {
                    break;
                }
            }
        }

        const rank = avgProgress > 0 ? Math.max(1, 100 - avgProgress) : 100;

        res.json({
            totalUpdates,
            avgProgress,
            streak,
            rank
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



export default router;
