import { Router } from "express";
import Plan from "../models/Plan.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// create plan
router.post("/", auth, async (req, res) => {
    try {
        const plan = await Plan.create({
            ...req.body,
            userId: req.user.id
        });

        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get user plans
router.get("/", auth, async (req, res) => {
    try {
        const plans = await Plan.find({ userId: req.user.id });
        res.json(plans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const plan = await Plan.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!plan) return res.status(404).json({ message: "Plan not found" });
        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const plan = await Plan.findOne({ _id: req.params.id, userId: req.user.id });
        if (!plan) return res.status(404).json({ message: "Plan not found" });

        await plan.deleteOne();
        res.json({ message: "Plan deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Add Exercise to a Plan
router.post("/:planId/exercises", auth, async (req, res) => {
    try {
        const plan = await Plan.findOne({ _id: req.params.planId, userId: req.user.id });
        if (!plan) return res.status(404).json({ message: "Plan not found" });

        plan.exercises.push(req.body);
        await plan.save();

        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Update an exercise inside a plan
router.put("/:planId/exercises/:exerciseId", auth, async (req, res) => {
    try {
        const plan = await Plan.findOne({ _id: req.params.planId, userId: req.user.id });
        if (!plan) return res.status(404).json({ message: "Plan not found" });

        const exercise = plan.exercises.id(req.params.exerciseId);
        if (!exercise) return res.status(404).json({ message: "Exercise not found" });

        exercise.set(req.body);
        await plan.save();

        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Delete exercise from a plan
router.delete("/:planId/exercises/:exerciseId", auth, async (req, res) => {
    try {
        const plan = await Plan.findOne({ _id: req.params.planId, userId: req.user.id });
        if (!plan) return res.status(404).json({ message: "Plan not found" });

        plan.exercises.pull({ _id: req.params.exerciseId });
        await plan.save();

        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;
