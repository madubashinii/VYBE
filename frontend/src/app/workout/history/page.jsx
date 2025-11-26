// import WorkoutCard from "../../../components/WorkoutCard";

// export default function WorkoutHistory() {
//     const workouts = [
//         { exercise: "Push Ups", sets: 3, reps: 15, date: "2025-10-07" },
//         { exercise: "Squats", sets: 4, reps: 12, date: "2025-10-06" },
//         { exercise: "Plank", sets: 2, reps: 60, date: "2025-10-05" },
//     ];

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <h1 className="text-grotto text-4xl font-bold mb-6">Workout History</h1>
//             {workouts.map((w, idx) => (
//                 <WorkoutCard
//                     key={idx}
//                     exercise={w.exercise}
//                     sets={w.sets}
//                     reps={w.reps}
//                     date={w.date}
//                 />
//             ))}
//         </div>
//     );
// }


"use client";

import { useState } from "react";
import Link from "next/link";

const workoutHistory = [
    { id: 1, exercise: "Push Ups", sets: 3, reps: 15, date: "2025-10-07", duration: 25, calories: 180, type: "Strength", notes: "Feeling strong today!" },
    { id: 2, exercise: "Squats", sets: 4, reps: 12, date: "2025-10-06", duration: 30, calories: 220, type: "Strength", notes: "Increased weight by 10 lbs" },
    { id: 3, exercise: "Plank", sets: 2, reps: 60, date: "2025-10-05", duration: 15, calories: 100, type: "Core", notes: "Held for 60 seconds each" },
    { id: 4, exercise: "Running", sets: 1, reps: 1, date: "2025-10-05", duration: 45, calories: 400, type: "Cardio", notes: "5K morning run" },
    { id: 5, exercise: "Bench Press", sets: 4, reps: 10, date: "2025-10-04", duration: 35, calories: 250, type: "Strength", notes: "New PR: 185 lbs!" },
    { id: 6, exercise: "Yoga Flow", sets: 1, reps: 1, date: "2025-10-03", duration: 60, calories: 180, type: "Flexibility", notes: "Evening session" },
    { id: 7, exercise: "Deadlift", sets: 3, reps: 8, date: "2025-10-03", duration: 30, calories: 280, type: "Strength", notes: "Good form maintained" },
    { id: 8, exercise: "Cycling", sets: 1, reps: 1, date: "2025-10-02", duration: 50, calories: 450, type: "Cardio", notes: "Hill training" },
];

function WorkoutCard({ workout, onDelete }) {
    const typeColors = {
        "Strength": "from-blue-500 to-cyan-500",
        "Cardio": "from-orange-500 to-red-500",
        "Core": "from-purple-500 to-pink-500",
        "Flexibility": "from-green-500 to-emerald-500"
    };

    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className={`h-2 bg-gradient-to-r ${typeColors[workout.type] || 'from-gray-400 to-gray-500'}`}></div>
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-[#0c4160] text-xl font-bold">{workout.exercise}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${typeColors[workout.type]} text-white`}>
                                {workout.type}
                            </span>
                        </div>
                        <p className="text-[#738fa7] text-sm mb-3">{workout.notes}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="text-[#0d659d] hover:text-[#0c4160] transition-colors p-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onDelete(workout.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-gradient-to-br from-[#c3ceda]/20 to-[#738fa7]/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-[#0d659d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span className="text-[#738fa7] text-xs font-semibold">Sets</span>
                        </div>
                        <p className="text-[#0c4160] text-xl font-bold">{workout.sets}</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#c3ceda]/20 to-[#738fa7]/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-[#0d659d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span className="text-[#738fa7] text-xs font-semibold">Reps</span>
                        </div>
                        <p className="text-[#0c4160] text-xl font-bold">{workout.reps}</p>
                    </div>

                    <div className="bg-gradient-to-br from-[#c3ceda]/20 to-[#738fa7]/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-[#0d659d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-[#738fa7] text-xs font-semibold">Duration</span>
                        </div>
                        <p className="text-[#0c4160] text-xl font-bold">{workout.duration}<span className="text-sm">m</span></p>
                    </div>

                    <div className="bg-gradient-to-br from-[#c3ceda]/20 to-[#738fa7]/10 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <svg className="w-4 h-4 text-[#0d659d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            </svg>
                            <span className="text-[#738fa7] text-xs font-semibold">Calories</span>
                        </div>
                        <p className="text-[#0c4160] text-xl font-bold">{workout.calories}</p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#c3ceda]/30">
                    <p className="text-[#738fa7] text-sm font-semibold">
                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(workout.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function WorkoutHistory() {
    const [workouts, setWorkouts] = useState(workoutHistory);
    const [filterType, setFilterType] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("date");

    const deleteWorkout = (id) => {
        if (confirm("Are you sure you want to delete this workout?")) {
            setWorkouts(workouts.filter(w => w.id !== id));
        }
    };

    const filteredWorkouts = workouts
        .filter(w => {
            const matchesType = filterType === "all" || w.type === filterType;
            const matchesSearch = w.exercise.toLowerCase().includes(searchTerm.toLowerCase()) ||
                w.notes.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesType && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === "date") return new Date(b.date) - new Date(a.date);
            if (sortBy === "calories") return b.calories - a.calories;
            if (sortBy === "duration") return b.duration - a.duration;
            return 0;
        });

    const totalStats = {
        workouts: workouts.length,
        calories: workouts.reduce((sum, w) => sum + w.calories, 0),
        duration: workouts.reduce((sum, w) => sum + w.duration, 0),
        avgCalories: Math.round(workouts.reduce((sum, w) => sum + w.calories, 0) / workouts.length)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#0d659d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0c4160] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#0c4160] hover:text-[#0d659d] font-semibold mb-4 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-[#0c4160] text-4xl sm:text-5xl font-bold mb-2">Workout History 📖</h1>
                            <p className="text-[#0c4160]/70 text-lg">Review your past workouts and track progress</p>
                        </div>
                        <Link href="/workout/log" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Log New Workout
                        </Link>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Total Workouts</p>
                        <p className="text-[#0c4160] text-3xl font-bold">{totalStats.workouts}</p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Total Calories</p>
                        <p className="text-[#0c4160] text-3xl font-bold">{totalStats.calories.toLocaleString()}</p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Total Time</p>
                        <p className="text-[#0c4160] text-3xl font-bold">{totalStats.duration}<span className="text-lg">m</span></p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-lg">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Avg Calories</p>
                        <p className="text-[#0c4160] text-3xl font-bold">{totalStats.avgCalories}</p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 mb-6 border border-white/20">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-[#738fa7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search workouts..."
                                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Type Filter */}
                        <div className="flex gap-2 flex-wrap">
                            {["all", "Strength", "Cardio", "Core", "Flexibility"].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${filterType === type
                                            ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white shadow-lg"
                                            : "bg-white border-2 border-[#c3ceda] text-[#0c4160] hover:border-[#0d659d]"
                                        }`}
                                >
                                    {type === "all" ? "All" : type}
                                </button>
                            ))}
                        </div>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] font-bold focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                        >
                            <option value="date">Sort by Date</option>
                            <option value="calories">Sort by Calories</option>
                            <option value="duration">Sort by Duration</option>
                        </select>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#c3ceda]/30">
                        <p className="text-[#0c4160] font-semibold">
                            {filteredWorkouts.length} {filteredWorkouts.length === 1 ? 'workout' : 'workouts'} found
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
                        <p className="text-[#738fa7] mb-6">Try adjusting your filters or search term</p>
                        <button
                            onClick={() => {
                                setFilterType("all");
                                setSearchTerm("");
                            }}
                            className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}