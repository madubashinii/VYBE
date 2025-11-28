"use client";

import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
    { day: "Mon", workouts: 2 },
    { day: "Tue", workouts: 1 },
    { day: "Wed", workouts: 3 },
    { day: "Thu", workouts: 2 },
    { day: "Fri", workouts: 4 },
    { day: "Sat", workouts: 1 },
    { day: "Sun", workouts: 2 }
];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-[#0c4160] text-4xl font-bold mb-2">
                        Welcome Back, <span className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] bg-clip-text text-transparent">John</span> 👋
                    </h1>
                    <p className="text-[#0c4160]/80 text-lg">Track your fitness journey</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase mb-1">Workouts</p>
                        <p className="text-[#0c4160] text-3xl font-bold">45 💪</p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase mb-1">Hours</p>
                        <p className="text-[#0c4160] text-3xl font-bold">32 ⏱️</p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase mb-1">Streak</p>
                        <p className="text-[#0c4160] text-3xl font-bold">7 🔥</p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase mb-1">Rank</p>
                        <p className="text-[#0c4160] text-3xl font-bold">#12 🏆</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <Link href="/plans/create" className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all">
                        <h3 className="text-[#0c4160] text-lg font-bold mb-1">📝 Create Plan</h3>
                        <p className="text-[#738fa7] text-sm">Design your workout</p>
                    </Link>

                    <Link href="/progress" className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all">
                        <h3 className="text-[#0c4160] text-lg font-bold mb-1">📊 Track Progress</h3>
                        <p className="text-[#738fa7] text-sm">View improvements</p>
                    </Link>

                    <Link href="/history" className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all">
                        <h3 className="text-[#0c4160] text-lg font-bold mb-1">📅 History</h3>
                        <p className="text-[#738fa7] text-sm">Past workouts</p>
                    </Link>
                </div>

                {/* Chart */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/20 mb-8">
                    <h3 className="text-[#0c4160] text-xl font-bold mb-4">Weekly Activity</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={weeklyData}>
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
                                dataKey="workouts"
                                stroke="#0d659d"
                                strokeWidth={3}
                                dot={{ fill: "#0d659d", r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Recent Workouts */}
                <div>
                    <h2 className="text-[#0c4160] text-2xl font-bold mb-4">Recent Workouts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-[#0c4160] to-[#0d659d] rounded-2xl shadow-lg p-5 border border-[#738fa7]/20">
                            <h3 className="text-white text-xl font-bold mb-2">💪 Push Ups</h3>
                            <p className="text-[#c3ceda] text-sm">3 sets × 15 reps</p>
                        </div>
                        <div className="bg-gradient-to-br from-[#0c4160] to-[#0d659d] rounded-2xl shadow-lg p-5 border border-[#738fa7]/20">
                            <h3 className="text-white text-xl font-bold mb-2">🦵 Squats</h3>
                            <p className="text-[#c3ceda] text-sm">4 sets × 12 reps</p>
                        </div>
                        <div className="bg-gradient-to-br from-[#0c4160] to-[#0d659d] rounded-2xl shadow-lg p-5 border border-[#738fa7]/20">
                            <h3 className="text-white text-xl font-bold mb-2">💪 Pull Ups</h3>
                            <p className="text-[#c3ceda] text-sm">3 sets × 10 reps</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}