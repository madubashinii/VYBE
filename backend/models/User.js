import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weight: Number,
    height: Number,
    age: Number,
    role: { type: String, default: "user" },
    preferences: {
        units: { type: String, default: "imperial" },
        notifications: { type: Boolean, default: true },
        publicProfile: { type: Boolean, default: true },
    },
    achievements: [
        {
            id: Number,
            title: String,
            description: String,
            icon: String,
            unlocked: { type: Boolean, default: false },
            progress: { type: Number, default: 0 },
            total: { type: Number, default: 0 },
            date: Date,
        },
    ],
}, { timestamps: true });

export default model("User", userSchema);