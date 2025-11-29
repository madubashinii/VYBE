import { Schema, model } from "mongoose";

const exerciseSchema = new Schema({
    name: String,
    sets: Number,
    reps: Number,
    day: String,
});

const planSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    description: String,
    duration: Number,
    difficulty: String,
    goal: String,
    exercises: [exerciseSchema],
}, { timestamps: true });

export default model("Plan", planSchema);
