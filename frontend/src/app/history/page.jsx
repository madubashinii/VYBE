"use client";

import { useState } from "react";
import Link from "next/link";

const workoutHistory = [
    { id: 1, exercise: "Push Ups", sets: 3, reps: 15, date: "2025-10-07", duration: 25, calories: 180, type: "Strength" },
    { id: 2, exercise: "Squats", sets: 4, reps: 12, date: "2025-10-06", duration: 30, calories: 220, type: "Strength" },
    { id: 3, exercise: "Plank", sets: 2, reps: 60, date: "2025-10-05", duration: 15, calories: 100, type: "Core" },
    { id: 4, exercise: "Running", sets: 1, reps: 1, date: "2025-10-05", duration: 45, calories: 400, type: "Cardio" },
    { id: 5, exercise: "Bench Press", sets: 4, reps: 10, date: "2025-10-04", duration: 35, calories: 250, type: "Strength" },
    { id: 6, exercise: "Yoga Flow", sets: 1, reps: 1, date: "2025-10-03", duration: 60, calories: 180, type: "Flexibility" },
    { id: 7, exercise: "Deadlift", sets: 3, reps: 8, date: "2025-10-03", duration: 30, calories: 280, type: "Strength" },
    { id: 8, exercise: "Cycling", sets: 1, reps: 1, date: "2025-10-02", duration: 50, calories: 450, type: "Cardio" },
];

function WorkoutCard({ workout, onDelete }) {
    const typeColors = {
        "Strength": "from-blue-500 to-cyan-500",
        "Cardio": "from-orange-500 to-red-500",
        "Core": "from-purple-500 to-pink-500",
        "Flexibility": "from-green-500 to-emerald-500"
    };

    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
            <div className={`h-2 bg-gradient-to-r ${typeColors[workout.type]}`}></div>
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-[#0c4160] text-xl font-bold">{workout.exercise}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${typeColors[workout.type]} text-white`}>
                                {workout.type}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => onDelete(workout.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-[#c3ceda]/20 rounded-lg p-3">
                        <p className="text-[#738fa7] text-xs font-semibold mb-1">Sets</p>
                        <p className="text-[#0c4160] text-xl font-bold">{workout.sets}</p>
                    </div>

                    <div className="bg-[#c3ceda]/20 rounded-lg p-3">
                        <p className="text-[#738fa7] text-xs font-semibold mb-1">Reps</p>
                        <p className="text-[#0c4160] text-xl font-bold">{workout.reps}</p>
                    </div>

                    <div className="bg-[#c3ceda]/20 rounded-lg p-3">
                        <p className="text-[#738fa7] text-xs font-semibold mb-1">Duration</p>
                        <p className="text-[#0c4160] text-xl font-bold">{workout.duration}m</p>
                    </div>

                    <div className="bg-[#c3ceda]/20 rounded-lg p-3">
                        <p className="text-[#738fa7] text-xs font-semibold mb-1">Calories</p>
                        <p className="text-[#0c4160] text-xl font-bold">{workout.calories}</p>
                    </div>
                </div>

                <p className="text-[#738fa7] text-sm">
                    {new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
            </div>
        </div>
    );
}

export default function WorkoutHistory() {
    const [workouts, setWorkouts] = useState(workoutHistory);
    const [filterType, setFilterType] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const deleteWorkout = (id) => {
        if (confirm("Delete this workout?")) {
            setWorkouts(workouts.filter(w => w.id !== id));
        }
    };

    const filteredWorkouts = workouts.filter(w => {
        const matchesType = filterType === "all" || w.type === filterType;
        const matchesSearch = w.exercise.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    const totalStats = {
        workouts: workouts.length,
        calories: workouts.reduce((sum, w) => sum + w.calories, 0),
        duration: workouts.reduce((sum, w) => sum + w.duration, 0)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#0c4160] hover:text-[#0d659d] font-semibold mb-4">
                        ← Back to Dashboard
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-[#0c4160] text-4xl font-bold mb-2">Workout History 📖</h1>
                            <p className="text-[#0c4160]/70 text-lg">Review your past workouts</p>
                        </div>
                        {/* <Link href="/workout/log" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all">
                            + Log Workout
                        </Link> */}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase mb-1">Workouts</p>
                        <p className="text-[#0c4160] text-3xl font-bold">{totalStats.workouts}</p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase mb-1">Calories</p>
                        <p className="text-[#0c4160] text-3xl font-bold">{totalStats.calories.toLocaleString()}</p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase mb-1">Time</p>
                        <p className="text-[#0c4160] text-3xl font-bold">{totalStats.duration}m</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-6 border border-white/20">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search workouts..."
                                className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                            />
                        </div>

                        {/* Type Filter */}
                        <div className="flex gap-2 flex-wrap">
                            {["all", "Strength", "Cardio", "Core", "Flexibility"].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${filterType === type
                                        ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white"
                                        : "bg-white border-2 border-[#c3ceda] text-[#0c4160]"
                                        }`}
                                >
                                    {type === "all" ? "All" : type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#c3ceda]/30">
                        <p className="text-[#0c4160] font-semibold">
                            {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                </div>

                {/* Workout List */}
                {filteredWorkouts.length > 0 ? (
                    <div className="space-y-4">
                        {filteredWorkouts.map(workout => (
                            <WorkoutCard key={workout.id} workout={workout} onDelete={deleteWorkout} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-12 text-center border border-white/20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-[#0c4160] text-2xl font-bold mb-2">No workouts found</h3>
                        <p className="text-[#738fa7] mb-6">Try adjusting your filters</p>
                        <button
                            onClick={() => {
                                setFilterType("all");
                                setSearchTerm("");
                            }}
                            className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}