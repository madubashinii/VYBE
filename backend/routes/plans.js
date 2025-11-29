import { Router } from "express";
import Plan from "../models/Plan.js";
const router = Router();

// create plan
router.post("/", async (req, res) => {
    try {
        const plan = await Plan.create(req.body);
        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get user plans
router.get("/:userId", async (req, res) => {
    try {
        const plans = await Plan.find({ userId: req.params.userId });
        res.json(plans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
