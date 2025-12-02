"use client";

import { useState } from "react";
import Link from "next/link";
import { createPlan } from "../services/plansApi";

export default function CreatePlan() {
    const [planData, setPlanData] = useState({
        name: "",
        description: "",
        duration: "4",
        difficulty: "",
        goal: ""
    });

    const [exercises, setExercises] = useState([
        { id: 1, exercise: "", sets: "", reps: "", day: "" }
    ]);

    const addExercise = () => {
        setExercises([...exercises, { id: Date.now(), exercise: "", sets: "", reps: "", day: "" }]);
    };

    const removeExercise = (id) => {
        setExercises(exercises.filter(ex => ex.id !== id));
    };

    const updateExercise = (id, field, value) => {
        setExercises(exercises.map(ex =>
            ex.id === id ? { ...ex, [field]: value } : ex
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in first!");
                return;
            }

            const data = await createPlan({ ...planData, exercises });

            if (res.ok) {
                alert("Plan created successfully!");
                window.location.href = "/dashboard";
            } else {
                alert(data.error || "Failed to create plan");
            }

        } catch (error) {
            console.log("Error:", error);
            alert("Something went wrong");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#0c4160] hover:text-[#0d659d] font-semibold mb-4">
                        ←  Back to Dashboard
                    </Link>
                    <h1 className="text-[#0c4160] text-4xl font-bold mb-2">Create Custom Plan 📝</h1>
                    <p className="text-[#0c4160]/70 text-lg">Design your workout routine</p>
                </div>

                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20 mb-6">

                    <div className="mb-8">
                        <h2 className="text-[#0c4160] text-xl font-bold mb-4">Plan Details</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Plan Name</label>
                                <input
                                    type="text"
                                    value={planData.name}
                                    onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
                                    placeholder="e.g., Summer Shred Program"
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#0c4160] text-sm font-semibold mb-2">Duration</label>
                                    <select
                                        value={planData.duration}
                                        onChange={(e) => setPlanData({ ...planData, duration: e.target.value })}
                                        className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                                    >
                                        <option value="2">2 weeks</option>
                                        <option value="4">4 weeks</option>
                                        <option value="8">8 weeks</option>
                                        <option value="12">12 weeks</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[#0c4160] text-sm font-semibold mb-2">Difficulty</label>
                                    <select
                                        value={planData.difficulty}
                                        onChange={(e) => setPlanData({ ...planData, difficulty: e.target.value })}
                                        className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Goal</label>
                                <select
                                    value={planData.goal}
                                    onChange={(e) => setPlanData({ ...planData, goal: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                                >
                                    <option value="">Select your goal</option>
                                    <option value="strength">Build Strength</option>
                                    <option value="muscle">Gain Muscle</option>
                                    <option value="weight-loss">Lose Weight</option>
                                    <option value="endurance">Improve Endurance</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Description</label>
                                <textarea
                                    value={planData.description}
                                    onChange={(e) => setPlanData({ ...planData, description: e.target.value })}
                                    placeholder="Describe your workout plan..."
                                    rows="3"
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[#0c4160] text-xl font-bold">Exercises</h2>
                            <button
                                type="button"
                                onClick={addExercise}
                                className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                + Add Exercise
                            </button>
                        </div>

                        <div className="space-y-4">
                            {exercises.map((exercise, index) => (
                                <div key={exercise.id} className="bg-[#c3ceda]/20 rounded-xl p-4 border-2 border-[#c3ceda]/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[#0c4160] font-bold text-sm">Exercise #{index + 1}</span>
                                        {exercises.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeExercise(exercise.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <select
                                            value={exercise.exercise}
                                            onChange={(e) => updateExercise(exercise.id, "exercise", e.target.value)}
                                            className="w-full px-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] focus:border-[#0d659d] outline-none"
                                        >
                                            <option value="">Select Exercise</option>

                                            <optgroup label="Strength">
                                                <option value="Bench Press">Bench Press</option>
                                                <option value="Squats">Squats</option>
                                                <option value="Deadlift">Deadlift</option>
                                                <option value="Shoulder Press">Shoulder Press</option>
                                                <option value="Bicep Curl">Bicep Curl</option>
                                            </optgroup>

                                            <optgroup label="Cardio">
                                                <option value="Running">Running</option>
                                                <option value="Cycling">Cycling</option>
                                                <option value="Jump Rope">Jump Rope</option>
                                                <option value="Rowing">Rowing</option>
                                            </optgroup>

                                            <optgroup label="Core">
                                                <option value="Plank">Plank</option>
                                                <option value="Leg Raises">Leg Raises</option>
                                                <option value="Russian Twist">Russian Twist</option>
                                            </optgroup>

                                            <optgroup label="Flexibility">
                                                <option value="Hamstring Stretch">Hamstring Stretch</option>
                                                <option value="Shoulder Stretch">Shoulder Stretch</option>
                                                <option value="Quad Stretch">Quad Stretch</option>
                                            </optgroup>
                                        </select>

                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="number"
                                                value={exercise.sets}
                                                onChange={(e) => updateExercise(exercise.id, "sets", e.target.value)}
                                                placeholder="Sets"
                                                className="w-full px-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] focus:border-[#0d659d] outline-none"
                                            />

                                            <input
                                                type="number"
                                                value={exercise.reps}
                                                onChange={(e) => updateExercise(exercise.id, "reps", e.target.value)}
                                                placeholder="Reps"
                                                className="w-full px-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] focus:border-[#0d659d] outline-none"
                                            />
                                        </div>

                                        <select
                                            value={exercise.day}
                                            onChange={(e) => updateExercise(exercise.id, "day", e.target.value)}
                                            className="w-full px-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] focus:border-[#0d659d] outline-none"
                                        >
                                            <option value="">Select day</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="wednesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                    >
                        ✓ Create Plan
                    </button>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#c3ceda]">
                    <h3 className="text-[#0c4160] font-bold mb-2">💡 Tips</h3>
                    <ul className="text-[#0c4160]/80 text-sm space-y-1">
                        <li>• Include rest days for recovery</li>
                        <li>• Mix different exercise types</li>
                        <li>• Progress gradually over time</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}