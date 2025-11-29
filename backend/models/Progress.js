import { Schema, model } from "mongoose";

const progressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    exerciseName: String,
    current: String,
    target: String,
    progressPercent: Number,
    dateRecorded: { type: Date, default: Date.now }
});

export default model("Progress", progressSchema);
