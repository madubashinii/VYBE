"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { deleteProgress, getProgress } from "../../services/progressApi";


function WorkoutCard({ workout, onDelete }) {
    const typeColors = {
        "Strength": "from-blue-500 to-cyan-500",
        "Cardio": "from-orange-500 to-red-500",
        "Core": "from-purple-500 to-pink-500",
        "Flexibility": "from-green-500 to-emerald-500"
    };

    const progress = workout.progressPercent ?? (workout.target ? Math.min(100, Math.round((Number(workout.current) / Number(workout.target)) * 100)) : 0);
    const calories = workout.caloriesBurned ?? 0;

    return (
        <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl shadow-lg border border-[#2a3d6a]">
            <div className={`h-2 bg-gradient-to-r ${typeColors[workout.type] || typeColors.Strength}`}></div>
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-[#e7eefc] text-xl font-bold">{workout.exerciseName}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${typeColors[workout.type] || typeColors.Strength} text-white`}>
                                {workout.type}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => onDelete(workout._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                    >
                        Delete
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-[#2a3d6a]/20 rounded-lg p-3">
                        <p className="text-[#9cb0d7] text-xs font-semibold mb-1">Current</p>
                        <p className="text-[#e7eefc] text-xl font-bold">{workout.current}</p>
                    </div>

                    <div className="bg-[#2a3d6a]/20 rounded-lg p-3">
                        <p className="text-[#9cb0d7] text-xs font-semibold mb-1">Target</p>
                        <p className="text-[#e7eefc] text-xl font-bold">{workout.target}</p>
                    </div>

                    <div className="bg-[#2a3d6a]/20 rounded-lg p-3">
                        <p className="text-[#9cb0d7] text-xs font-semibold mb-1">Progress</p>
                        <p className="text-[#e7eefc] text-xl font-bold">{progress}%</p>
                    </div>

                    <div className="bg-[#2a3d6a]/20 rounded-lg p-3">
                        <p className="text-[#9cb0d7] text-xs font-semibold mb-1">Calories</p>
                        <p className="text-[#e7eefc] text-xl font-bold">{calories}</p>
                    </div>
                </div>

                <p className="text-[#9cb0d7] text-sm">
                    {new Date(workout.dateRecorded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
            </div>
        </div>
    );
}

export default function WorkoutHistory() {
    const [workouts, setWorkouts] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const determineType = (exerciseName) => {
        const strength = ["Bench Press", "Squats", "Deadlift", "Push Ups", "Bicep Curl", "Shoulder Press"];
        const cardio = ["Running", "Cycling", "Jump Rope", "Rowing"];
        const core = ["Plank", "Leg Raises", "Russian Twist"];
        const flexibility = ["Yoga Flow", "Hamstring Stretch", "Shoulder Stretch", "Quad Stretch"];

        if (strength.includes(exerciseName)) return "Strength";
        if (cardio.includes(exerciseName)) return "Cardio";
        if (core.includes(exerciseName)) return "Core";
        if (flexibility.includes(exerciseName)) return "Flexibility";
        return "Strength";
    };

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const records = await getProgress("year");
                setWorkouts(
                    Array.isArray(records)
                        ? [...records]
                            .sort((a, b) => new Date(b.dateRecorded) - new Date(a.dateRecorded))
                            .map((record) => ({
                                ...record,
                                type: determineType(record.exerciseName),
                            }))
                        : []
                );
            } catch (err) {
                console.log("Error fetching workouts:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);


    const deleteWorkout = async (id) => {
        if (!confirm("Delete this workout?")) return;

        try {
            await deleteProgress(id);
            setWorkouts(prev => prev.filter(w => w._id !== id));
        } catch (err) {
            console.error("Error deleting workout:", err);
        }
    };

    const filteredWorkouts = workouts.filter(w => {
        const matchesType = filterType === "all" || w.type === filterType;
        const matchesSearch = w.exerciseName?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    if (loading) return <p className="text-center mt-10 text-[#e7eefc] font-bold">Loading workouts...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#e7eefc] hover:text-[#ff6a00] font-semibold mb-4">
                        ← Back to Dashboard
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-[#e7eefc] text-4xl font-bold mb-2">Workout History 📖</h1>
                            <p className="text-[#e7eefc]/70 text-lg">Review your past workouts</p>
                        </div>
                    </div>
                </div>

                <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-6 border border-[#2a3d6a]">
                    <div className="flex flex-col lg:flex-row gap-4">

                        <div className="flex-1">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search workouts..."
                                className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc] focus:border-[#ff6a00] outline-none"
                            />
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {["all", "Strength", "Cardio", "Core", "Flexibility"].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${filterType === type
                                        ? "bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] text-white"
                                        : "bg-[#0f1833] border-2 border-[#2a3d6a] text-[#d7e3ff]"
                                        }`}
                                >
                                    {type === "all" ? "All" : type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#2a3d6a]/30">
                        <p className="text-[#e7eefc] font-semibold">
                            {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''} found
                        </p>
                    </div>
                </div>

                {/* workout List */}
                {filteredWorkouts.length > 0 ? (
                    <div className="space-y-4">
                        {filteredWorkouts.map(workout => (
                            <WorkoutCard key={workout._id} workout={workout} onDelete={deleteWorkout} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl shadow-lg p-12 text-center border border-[#2a3d6a]">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-[#e7eefc] text-2xl font-bold mb-2">No workouts found</h3>
                        <p className="text-[#9cb0d7] mb-6">Try adjusting your filters</p>
                        <button
                            onClick={() => {
                                setFilterType("all");
                                setSearchTerm("");
                            }}
                            className="bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}
