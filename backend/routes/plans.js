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

export default router;
