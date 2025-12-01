"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import api from "../../services/api";


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
                        onClick={() => onDelete(workout._id)}
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

    const estimateDuration = (exercise, sets, reps) => {
        const type = determineType(exercise);
        let minutesPerSet = 2;

        if (type === "Cardio") minutesPerSet = 15;
        if (type === "Core") minutesPerSet = 1.5;
        if (type === "Flexibility") minutesPerSet = 2;
        if (type === "Strength") minutesPerSet = 2;

        return Math.round(sets * minutesPerSet);
    };

    const estimateCalories = (exercise, duration) => {
        const type = determineType(exercise);
        let calPerMin = 5;

        if (type === "Strength") calPerMin = 6;
        if (type === "Cardio") calPerMin = 10;
        if (type === "Core") calPerMin = 5;
        if (type === "Flexibility") calPerMin = 3;

        return Math.round(calPerMin * duration);
    };

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const res = await api.get("/plans", {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                const data = res.data;

                const allExercises = data.flatMap(plan =>
                    plan.exercises.map(ex => {
                        const type = determineType(ex.exercise);
                        const duration = estimateDuration(ex.exercise, ex.sets, ex.reps);
                        const calories = estimateCalories(ex.exercise, duration);
                        return { ...ex, type, duration, calories, date: ex.date || new Date().toISOString() };
                    })
                );

                setWorkouts(allExercises);
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
            const token = localStorage.getItem("token");
            if (!token) return;

            // find the plan containing the exercise
            const res = await api.get("/plans", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const plans = res.data;
            const planContainingExercise = plans.find(plan => plan.exercises.some(ex => ex._id === id));

            if (!planContainingExercise) return;

            // delete the exercise
            await api.delete(`/plans/${planContainingExercise._id}/exercises/${id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            setWorkouts(prev => prev.filter(w => w._id !== id));
        } catch (err) {
            console.error("Error deleting workout:", err);
        }
    };

    const filteredWorkouts = workouts.filter(w => {
        const matchesType = filterType === "all" || w.type === filterType;
        const matchesSearch = w.exercise?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesType && matchesSearch;
    });

    if (loading) return <p className="text-center mt-10 text-[#0c4160] font-bold">Loading workouts...</p>;

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
                    </div>
                </div>

                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-6 border border-white/20">
                    <div className="flex flex-col lg:flex-row gap-4">

                        <div className="flex-1">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search workouts..."
                                className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                            />
                        </div>

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

                {/* workout List */}
                {filteredWorkouts.length > 0 ? (
                    <div className="space-y-4">
                        {filteredWorkouts.map(workout => (
                            <WorkoutCard key={workout._id} workout={workout} onDelete={deleteWorkout} />
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
