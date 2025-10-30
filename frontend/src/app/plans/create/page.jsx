// export default function CreatePlan() {
//     return (
//         <div className="max-w-lg mx-auto py-10">
//             <h2 className="text-grotto text-3xl font-bold mb-6">Create Custom Plan</h2>
//             <form className="flex flex-col gap-4">
//                 <input type="text" placeholder="Plan Name" className="p-3 rounded bg-bluegray text-white" />
//                 <textarea placeholder="Description" className="p-3 rounded bg-bluegray text-white" />
//                 <button className="bg-grotto py-3 rounded text-white hover:bg-navy">Create Plan</button>
//             </form>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreatePlan() {
    const [planData, setPlanData] = useState({
        name: "",
        description: "",
        duration: "4",
        difficulty: "",
        goal: ""
    });

    const [exercises, setExercises] = useState([
        { id: 1, name: "", sets: "", reps: "", day: "" }
    ]);

    const addExercise = () => {
        setExercises([...exercises, { id: Date.now(), name: "", sets: "", reps: "", day: "" }]);
    };

    const removeExercise = (id) => {
        setExercises(exercises.filter(ex => ex.id !== id));
    };

    const updateExercise = (id, field, value) => {
        setExercises(exercises.map(ex =>
            ex.id === id ? { ...ex, [field]: value } : ex
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Plan Created:", { planData, exercises });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#0d659d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0c4160] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#0c4160] hover:text-[#0d659d] font-semibold mb-4 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </Link>
                    <h1 className="text-[#0c4160] text-4xl sm:text-5xl font-bold mb-2">Create Custom Plan 💪</h1>
                    <p className="text-[#0c4160]/70 text-lg">Design your perfect workout routine</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 mb-6">

                    {/* Plan Details Section */}
                    <div className="mb-8">
                        <h2 className="text-[#0c4160] text-2xl font-bold mb-5 flex items-center gap-2">
                            <div className="bg-gradient-to-br from-[#0d659d] to-[#0c4160] p-2 rounded-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            Plan Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Plan Name */}
                            <div className="sm:col-span-2">
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Plan Name *</label>
                                <input
                                    type="text"
                                    value={planData.name}
                                    onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
                                    placeholder="e.g., Summer Shred Program"
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Duration (weeks) *</label>
                                <select
                                    value={planData.duration}
                                    onChange={(e) => setPlanData({ ...planData, duration: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="2">2 weeks</option>
                                    <option value="4">4 weeks</option>
                                    <option value="8">8 weeks</option>
                                    <option value="12">12 weeks</option>
                                    <option value="16">16 weeks</option>
                                </select>
                            </div>

                            {/* Difficulty */}
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Difficulty *</label>
                                <select
                                    value={planData.difficulty}
                                    onChange={(e) => setPlanData({ ...planData, difficulty: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select difficulty</option>
                                    <option value="beginner">Beginner 🌱</option>
                                    <option value="intermediate">Intermediate 💪</option>
                                    <option value="advanced">Advanced 🔥</option>
                                </select>
                            </div>

                            {/* Goal */}
                            <div className="sm:col-span-2">
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Goal *</label>
                                <select
                                    value={planData.goal}
                                    onChange={(e) => setPlanData({ ...planData, goal: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">Select your goal</option>
                                    <option value="strength">Build Strength 💪</option>
                                    <option value="muscle">Gain Muscle 🏋️</option>
                                    <option value="weight-loss">Lose Weight 🔥</option>
                                    <option value="endurance">Improve Endurance 🏃</option>
                                    <option value="general">General Fitness ⚡</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div className="sm:col-span-2">
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Description</label>
                                <textarea
                                    value={planData.description}
                                    onChange={(e) => setPlanData({ ...planData, description: e.target.value })}
                                    placeholder="Describe your workout plan, goals, and any special notes..."
                                    rows="4"
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Exercises Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-[#0c4160] text-2xl font-bold flex items-center gap-2">
                                <div className="bg-gradient-to-br from-[#0d659d] to-[#0c4160] p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                Exercises
                            </h2>
                            <button
                                type="button"
                                onClick={addExercise}
                                className="flex items-center gap-2 bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Exercise
                            </button>
                        </div>

                        <div className="space-y-4">
                            {exercises.map((exercise, index) => (
                                <div key={exercise.id} className="bg-gradient-to-br from-[#c3ceda]/30 to-[#738fa7]/20 rounded-2xl p-4 border-2 border-[#c3ceda]/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[#0c4160] font-bold text-sm">Exercise #{index + 1}</span>
                                        {exercises.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeExercise(exercise.id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div className="sm:col-span-2">
                                            <input
                                                type="text"
                                                value={exercise.name}
                                                onChange={(e) => updateExercise(exercise.id, 'name', e.target.value)}
                                                placeholder="Exercise name (e.g., Bench Press)"
                                                className="w-full px-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                value={exercise.sets}
                                                onChange={(e) => updateExercise(exercise.id, 'sets', e.target.value)}
                                                placeholder="Sets"
                                                className="w-full px-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                value={exercise.reps}
                                                onChange={(e) => updateExercise(exercise.id, 'reps', e.target.value)}
                                                placeholder="Reps"
                                                className="w-full px-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <select
                                                value={exercise.day}
                                                onChange={(e) => updateExercise(exercise.id, 'day', e.target.value)}
                                                className="w-full px-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all appearance-none cursor-pointer"
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
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleSubmit}
                            className="flex-1 bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Create Plan
                        </button>
                        <button
                            type="button"
                            className="sm:w-auto bg-white border-2 border-[#c3ceda] text-[#0c4160] px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Preview
                        </button>
                    </div>
                </div>

                {/* Tips Card */}
                <div className="bg-gradient-to-br from-[#0d659d]/10 to-[#0c4160]/10 backdrop-blur-sm rounded-2xl p-6 border border-[#0d659d]/30">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-[#0d659d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-[#0c4160] font-bold mb-2">💡 Pro Tips</h3>
                            <ul className="text-[#0c4160]/80 text-sm space-y-1">
                                <li>• Include rest days for optimal recovery</li>
                                <li>• Mix compound and isolation exercises</li>
                                <li>• Progress gradually by increasing weight or reps</li>
                                <li>• Balance muscle groups throughout the week</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}