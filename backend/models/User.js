import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weight: Number,
    height: Number,
    age: Number,
    role: { type: String, default: "user" },
}, { timestamps: true });

export default model("User", userSchema);