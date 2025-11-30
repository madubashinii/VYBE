import { Router } from "express";
import Progress from "../models/Progress.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// add progress
router.post("/", auth, async (req, res) => {
    try {
        const { exerciseName, current, target } = req.body;

        if (!exerciseName || !current || !target) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const percent = Math.floor((Number(current) / Number(target)) * 100);

        const newProgress = new Progress({
            userId: req.user.id,
            exerciseName,
            current,
            target,
            progressPercent: percent
        });

        await newProgress.save();
        res.json(newProgress);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get logged-in user's progress
router.get("/", auth, async (req, res) => {
    try {
        const range = req.query.range || "week";

        let startDate = new Date();
        if (range === "week") startDate.setDate(startDate.getDate() - 7);
        if (range === "month") startDate.setMonth(startDate.getMonth() - 1);
        if (range === "year") startDate.setFullYear(startDate.getFullYear() - 1);

        const records = await Progress.find({
            userId: req.user.id,
            dateRecorded: { $gte: startDate }
        });

        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get summary stats: totalUpdates, avgProgress, streak, rank
router.get("/stats", auth, async (req, res) => {
    try {
        const range = req.query.range || "week";

        let startDate = new Date();
        if (range === "week") startDate.setDate(startDate.getDate() - 7);
        if (range === "month") startDate.setMonth(startDate.getMonth() - 1);
        if (range === "year") startDate.setFullYear(startDate.getFullYear() - 1);

        const progress = await Progress.find({
            userId: req.user.id,
            dateRecorded: { $gte: startDate }
        }).sort({ dateRecorded: 1 });

        const totalUpdates = progress.length;

        const avgProgress =
            totalUpdates > 0
                ? Math.round(progress.reduce((sum, p) => sum + (p.progressPercent || 0), 0) / totalUpdates)
                : 0;

        let streak = 0;
        if (progress.length > 0) {

            const sorted = [...progress].sort((a, b) => b.dateRecorded - a.dateRecorded);

            streak = 1;
            for (let i = 1; i < sorted.length; i++) {
                const prev = new Date(sorted[i - 1].dateRecorded);
                const curr = new Date(sorted[i].dateRecorded);
                const diffDays = Math.floor((prev - curr) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) streak++;
                else break;
            }
        }

        const all = await Progress.aggregate([
            { $group: { _id: "$userId", avg: { $avg: "$progressPercent" } } },
            { $sort: { avg: -1 } }
        ]);

        const index = all.findIndex(u => u._id.toString() === req.user.id);
        const rank = index === -1 ? all.length : index + 1;


        res.json({ totalUpdates, avgProgress, streak, rank });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get aggregated counts per weekday for the user's records
router.get("/weekly", auth, async (req, res) => {
    try {
        const range = req.query.range || "week";

        let startDate = new Date();
        if (range === "week") startDate.setDate(startDate.getDate() - 7);
        if (range === "month") startDate.setMonth(startDate.getMonth() - 1);
        if (range === "year") startDate.setFullYear(startDate.getFullYear() - 1);

        const progress = await Progress.find({
            userId: req.user.id,
            dateRecorded: { $gte: startDate }
        });

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const weekly = days.map((d) => ({ day: d, count: 0 }));

        progress.forEach((p) => {
            const d = new Date(p.dateRecorded);
            const idx = d.getDay();
            weekly[idx].count++;
        });

        res.json(weekly);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get personal records: best progressPercent per exercise
router.get("/pr", auth, async (req, res) => {
    try {
        const range = req.query.range || "week";

        let startDate = new Date();
        if (range === "week") startDate.setDate(startDate.getDate() - 7);
        if (range === "month") startDate.setMonth(startDate.getMonth() - 1);
        if (range === "year") startDate.setFullYear(startDate.getFullYear() - 1);

        const progress = await Progress.find({
            userId: req.user.id,
            dateRecorded: { $gte: startDate }
        });

        // map exerciseName 
        const map = {};
        progress.forEach((p) => {
            const key = p.exerciseName || "Unknown";
            const val = map[key];
            if (!val || (p.progressPercent || 0) > (val.progressPercent || 0)) {
                map[key] = {
                    exercise: key,
                    current: p.current,
                    target: p.target,
                    progressPercent: p.progressPercent || 0,
                    dateRecorded: p.dateRecorded,
                };
            }
        });

        res.json(Object.values(map));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



export default router;
