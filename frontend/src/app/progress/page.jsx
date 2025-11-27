"use client";

import { useState } from "react";
import Link from "next/link";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample data
const weeklyWorkouts = [
    { day: "Mon", count: 2, calories: 450 },
    { day: "Tue", count: 1, calories: 320 },
    { day: "Wed", count: 3, calories: 680 },
    { day: "Thu", count: 2, calories: 510 },
    { day: "Fri", count: 4, calories: 850 },
    { day: "Sat", count: 1, calories: 380 },
    { day: "Sun", count: 2, calories: 520 }
];

const exerciseProgress = [
    { exercise: "Bench Press", current: 185, target: 225, progress: 82 },
    { exercise: "Squat", current: 245, target: 315, progress: 78 },
    { exercise: "Deadlift", current: 315, target: 405, progress: 78 },
    { exercise: "Pull-ups", current: 12, target: 20, progress: 60 }
];

const personalRecords = [
    { exercise: "Bench Press", weight: "185 lbs", date: "Oct 25", improvement: "+15 lbs" },
    { exercise: "Squat", weight: "245 lbs", date: "Oct 22", improvement: "+20 lbs" },
    { exercise: "Deadlift", weight: "315 lbs", date: "Oct 20", improvement: "+25 lbs" },
    { exercise: "Pull-ups", weight: "12 reps", date: "Oct 18", improvement: "+4 reps" }
];

function StatCard({ title, value, change }) {
    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20">
            <p className="text-[#738fa7] text-xs font-semibold uppercase mb-1">{title}</p>
            <p className="text-[#0c4160] text-3xl font-bold mb-2">{value}</p>
            {change && <p className="text-green-600 text-xs font-semibold">{change}</p>}
        </div>
    );
}

function ProgressBar({ exercise, current, target, progress }) {
    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[#0c4160] font-bold text-sm">{exercise}</span>
                <span className="text-[#0d659d] font-bold text-sm">{progress}%</span>
            </div>
            <div className="w-full bg-[#c3ceda]/30 rounded-full h-3 mb-2">
                <div
                    className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] h-full rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex items-center justify-between text-xs text-[#738fa7]">
                <span>Current: {current}</span>
                <span>Target: {target}</span>
            </div>
        </div>
    );
}

function PRCard({ record }) {
    return (
        <div className="bg-gradient-to-br from-[#0c4160] to-[#0d659d] rounded-xl p-5 border border-[#738fa7]/20">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className="text-white text-lg font-bold mb-1">{record.exercise}</h4>
                    <p className="text-[#c3ceda] text-2xl font-bold">{record.weight}</p>
                </div>
                <div className="bg-green-500/20 px-3 py-1 rounded-lg">
                    <p className="text-green-300 text-sm font-bold">{record.improvement}</p>
                </div>
            </div>
            <p className="text-[#c3ceda] text-xs">{record.date}</p>
        </div>
    );
}

export default function Progress() {
    const [timeRange, setTimeRange] = useState("month");

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#0c4160] hover:text-[#0d659d] font-semibold mb-4">
                        ← Back to Dashboard
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-[#0c4160] text-4xl font-bold mb-2">Your Progress 📊</h1>
                            <p className="text-[#0c4160]/70 text-lg">Track your fitness journey</p>
                        </div>
                        {/* Time Range Selector */}
                        <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-xl shadow-lg">
                            <button
                                onClick={() => setTimeRange("week")}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${timeRange === "week"
                                    ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white"
                                    : "text-[#0c4160] hover:bg-white"
                                    }`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setTimeRange("month")}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${timeRange === "month"
                                    ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white"
                                    : "text-[#0c4160] hover:bg-white"
                                    }`}
                            >
                                Month
                            </button>
                            <button
                                onClick={() => setTimeRange("year")}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${timeRange === "year"
                                    ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white"
                                    : "text-[#0c4160] hover:bg-white"
                                    }`}
                            >
                                Year
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard title="Workouts" value="45" change="+12 this month" />
                    <StatCard title="Calories" value="3,710" change="+8%" />
                    <StatCard title="Weight" value="175 lbs" change="-5 lbs" />
                    <StatCard title="Volume" value="59,500" change="+15%" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Weekly Activity */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
                        <h3 className="text-[#0c4160] text-xl font-bold mb-4">Weekly Activity</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={weeklyWorkouts}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#c3ceda" opacity={0.3} />
                                <XAxis dataKey="day" stroke="#738fa7" />
                                <YAxis stroke="#738fa7" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0c4160",
                                        border: "none",
                                        borderRadius: "12px",
                                        color: "#fff"
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#0d659d"
                                    strokeWidth={3}
                                    dot={{ fill: "#0d659d", r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Calories Burned */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
                        <h3 className="text-[#0c4160] text-xl font-bold mb-4">Calories Burned</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={weeklyWorkouts}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#c3ceda" opacity={0.3} />
                                <XAxis dataKey="day" stroke="#738fa7" />
                                <YAxis stroke="#738fa7" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0c4160",
                                        border: "none",
                                        borderRadius: "12px",
                                        color: "#fff"
                                    }}
                                />
                                <Bar dataKey="calories" fill="#0d659d" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Exercise Progress */}
                <div className="mb-8">
                    <h2 className="text-[#0c4160] text-2xl font-bold mb-4">Exercise Progress</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {exerciseProgress.map((item, index) => (
                            <ProgressBar key={index} {...item} />
                        ))}
                    </div>
                </div>

                {/* Personal Records */}
                <div>
                    <h2 className="text-[#0c4160] text-2xl font-bold mb-4">Personal Records 🏆</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {personalRecords.map((record, index) => (
                            <PRCard key={index} record={record} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}