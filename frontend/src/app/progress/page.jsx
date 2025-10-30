// import Chart from "../../components/Chart";

// export default function Progress() {
//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <h1 className="text-grotto text-4xl font-bold mb-6">Progress</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <Chart title="Weekly Progress" />
//                 <Chart title="Monthly Progress" />
//             </div>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

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

const monthlyProgress = [
    { week: "W1", workouts: 8, weight: 180, volume: 12000 },
    { week: "W2", workouts: 12, weight: 178, volume: 15000 },
    { week: "W3", workouts: 10, weight: 177, volume: 14500 },
    { week: "W4", workouts: 15, weight: 175, volume: 18000 }
];

const exerciseProgress = [
    { exercise: "Bench Press", current: 185, target: 225, progress: 82 },
    { exercise: "Squat", current: 245, target: 315, progress: 78 },
    { exercise: "Deadlift", current: 315, target: 405, progress: 78 },
    { exercise: "Pull-ups", current: 12, target: 20, progress: 60 }
];

const bodyStats = [
    { stat: "Strength", value: 85 },
    { stat: "Endurance", value: 70 },
    { stat: "Flexibility", value: 60 },
    { stat: "Speed", value: 75 },
    { stat: "Balance", value: 80 }
];

const personalRecords = [
    { exercise: "Bench Press", weight: "185 lbs", date: "Oct 25, 2025", improvement: "+15 lbs" },
    { exercise: "Squat", weight: "245 lbs", date: "Oct 22, 2025", improvement: "+20 lbs" },
    { exercise: "Deadlift", weight: "315 lbs", date: "Oct 20, 2025", improvement: "+25 lbs" },
    { exercise: "Pull-ups", weight: "12 reps", date: "Oct 18, 2025", improvement: "+4 reps" }
];

function StatCard({ title, value, change, icon, gradient }) {
    const isPositive = change?.startsWith("+");
    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
                <div className={`bg-gradient-to-br ${gradient} p-3 rounded-xl shadow-lg`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                </div>
            </div>
            <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">{title}</p>
            <p className="text-[#0c4160] text-3xl font-bold mb-2">{value}</p>
            {change && (
                <p className={`text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {change} this month
                </p>
            )}
        </div>
    );
}

function ChartCard({ title, children }) {
    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-[#0c4160] text-xl font-bold mb-4">{title}</h3>
            {children}
        </div>
    );
}

function PRCard({ record }) {
    return (
        <div className="bg-gradient-to-br from-[#0c4160] to-[#0d659d] rounded-xl p-5 border border-[#738fa7]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className="text-white text-lg font-bold mb-1">{record.exercise}</h4>
                    <p className="text-[#c3ceda] text-2xl font-bold">{record.weight}</p>
                </div>
                <div className="bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                    <p className="text-green-300 text-sm font-bold">{record.improvement}</p>
                </div>
            </div>
            <p className="text-[#c3ceda] text-xs">{record.date}</p>
        </div>
    );
}

function ProgressBar({ exercise, current, target, progress }) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[#c3ceda]/30">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[#0c4160] font-bold text-sm">{exercise}</span>
                <span className="text-[#0d659d] font-bold text-sm">{progress}%</span>
            </div>
            <div className="w-full bg-[#c3ceda]/30 rounded-full h-3 mb-2 overflow-hidden">
                <div
                    className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex items-center justify-between text-xs text-[#738fa7]">
                <span>Current: {current} lbs</span>
                <span>Target: {target} lbs</span>
            </div>
        </div>
    );
}

export default function Progress() {
    const [timeRange, setTimeRange] = useState("month");

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#0d659d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0c4160] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

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
                            <h1 className="text-[#0c4160] text-4xl sm:text-5xl font-bold mb-2">Your Progress 📊</h1>
                            <p className="text-[#0c4160]/70 text-lg">Track your fitness journey and achievements</p>
                        </div>
                        {/* Time Range Selector */}
                        <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-xl shadow-lg">
                            <button
                                onClick={() => setTimeRange("week")}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${timeRange === "week"
                                        ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white shadow-lg"
                                        : "text-[#0c4160] hover:bg-white"
                                    }`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setTimeRange("month")}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${timeRange === "month"
                                        ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white shadow-lg"
                                        : "text-[#0c4160] hover:bg-white"
                                    }`}
                            >
                                Month
                            </button>
                            <button
                                onClick={() => setTimeRange("year")}
                                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${timeRange === "year"
                                        ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white shadow-lg"
                                        : "text-[#0c4160] hover:bg-white"
                                    }`}
                            >
                                Year
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        title="Total Workouts"
                        value="45"
                        change="+12 workouts"
                        icon="M13 10V3L4 14h7v7l9-11h-7z"
                        gradient="from-blue-500 to-cyan-500"
                    />
                    <StatCard
                        title="Calories Burned"
                        value="3,710"
                        change="+8%"
                        icon="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                        gradient="from-orange-500 to-red-500"
                    />
                    <StatCard
                        title="Weight Progress"
                        value="175 lbs"
                        change="-5 lbs"
                        icon="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        gradient="from-green-500 to-emerald-500"
                    />
                    <StatCard
                        title="Total Volume"
                        value="59,500"
                        change="+15%"
                        icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        gradient="from-purple-500 to-pink-500"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Weekly Activity */}
                    <ChartCard title="Weekly Activity">
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={weeklyWorkouts}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0d659d" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0d659d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
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
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#0d659d"
                                    strokeWidth={3}
                                    fill="url(#colorCount)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    {/* Calories Burned */}
                    <ChartCard title="Calories Burned">
                        <ResponsiveContainer width="100%" height={250}>
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
                    </ChartCard>

                    {/* Monthly Trends */}
                    <ChartCard title="Monthly Trends">
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={monthlyProgress}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#c3ceda" opacity={0.3} />
                                <XAxis dataKey="week" stroke="#738fa7" />
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
                                    dataKey="workouts"
                                    stroke="#0d659d"
                                    strokeWidth={3}
                                    dot={{ fill: "#0d659d", r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>

                    {/* Body Stats Radar */}
                    <ChartCard title="Body Stats Overview">
                        <ResponsiveContainer width="100%" height={250}>
                            <RadarChart data={bodyStats}>
                                <PolarGrid stroke="#c3ceda" />
                                <PolarAngleAxis dataKey="stat" stroke="#738fa7" />
                                <PolarRadiusAxis stroke="#738fa7" />
                                <Radar
                                    name="Stats"
                                    dataKey="value"
                                    stroke="#0d659d"
                                    fill="#0d659d"
                                    fillOpacity={0.3}
                                    strokeWidth={2}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Exercise Progress */}
                <div className="mb-8">
                    <h2 className="text-[#0c4160] text-2xl font-bold mb-4">Exercise Progress to Goals</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {exerciseProgress.map((item, index) => (
                            <ProgressBar key={index} {...item} />
                        ))}
                    </div>
                </div>

                {/* Personal Records */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[#0c4160] text-2xl font-bold flex items-center gap-2">
                            Personal Records 🏆
                        </h2>
                        <Link href="/workout/history" className="text-[#0d659d] hover:text-[#0c4160] font-bold text-sm flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all">
                            View All PRs
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
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