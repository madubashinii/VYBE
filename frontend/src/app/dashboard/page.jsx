"use client";

import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getProgress, getStats, getWeekly } from "../../services/progressApi";

export default function Dashboard() {

    const [user, setUser] = useState(null);
    const [weeklyData, setWeeklyData] = useState([]);
    const [recentWorkouts, setRecentWorkouts] = useState([]);
    const [stats, setStats] = useState({
        totalUpdates: 0,
        avgProgress: 0,
        streak: 0,
        rank: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
                setUser(storedUser ? JSON.parse(storedUser) : null);

                const [weekly, recentProgress, statsData] = await Promise.all([
                    getWeekly("week"),
                    getProgress("month"),
                    getStats("week"),
                ]);

                setWeeklyData(Array.isArray(weekly) ? weekly : []);
                setRecentWorkouts(
                    Array.isArray(recentProgress)
                        ? [...recentProgress].sort((a, b) => new Date(b.dateRecorded) - new Date(a.dateRecorded)).slice(0, 3)
                        : []
                );
                setStats(statsData);

            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };


        fetchData();
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <h1 className="text-[#e7eefc] text-4xl font-bold mb-2">
                        Welcome Back, <span className="bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] bg-clip-text text-transparent">{user?.name}</span> 👋
                    </h1>
                    <p className="text-[#e7eefc]/80 text-lg">Track your fitness journey</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-[#2a3d6a]">
                        <p className="text-[#9cb0d7] text-xs font-semibold uppercase mb-1">Workouts</p>
                        <p className="text-[#e7eefc] text-3xl font-bold">{stats.totalUpdates}  💪</p>
                    </div>

                    <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-[#2a3d6a]">
                        <p className="text-[#9cb0d7] text-xs font-semibold uppercase mb-1">Hours</p>
                        <p className="text-[#e7eefc] text-3xl font-bold">{stats.avgProgress} ⏱️</p>
                    </div>

                    <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-[#2a3d6a]">
                        <p className="text-[#9cb0d7] text-xs font-semibold uppercase mb-1">Streak</p>
                        <p className="text-[#e7eefc] text-3xl font-bold">{stats.streak} 🔥</p>
                    </div>

                    <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-[#2a3d6a]">
                        <p className="text-[#9cb0d7] text-xs font-semibold uppercase mb-1">Rank</p>
                        <p className="text-[#e7eefc] text-3xl font-bold">#{stats.rank}  🏆</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <Link href="/plans/create" className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-[#2a3d6a] hover:shadow-2xl transition-all">
                        <h3 className="text-[#e7eefc] text-lg font-bold mb-1">📝 Create Plan</h3>
                        <p className="text-[#9cb0d7] text-sm">Design your workout</p>
                    </Link>

                    <Link href="/progress" className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-[#2a3d6a] hover:shadow-2xl transition-all">
                        <h3 className="text-[#e7eefc] text-lg font-bold mb-1">📊 Track Progress</h3>
                        <p className="text-[#9cb0d7] text-sm">View improvements</p>
                    </Link>

                    <Link href="/history" className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-[#2a3d6a] hover:shadow-2xl transition-all">
                        <h3 className="text-[#e7eefc] text-lg font-bold mb-1">📅 History</h3>
                        <p className="text-[#9cb0d7] text-sm">Past workouts</p>
                    </Link>
                </div>

                <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-[#2a3d6a] mb-8">
                    <h3 className="text-[#e7eefc] text-xl font-bold mb-4">Weekly Activity</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2a3d6a" opacity={0.3} />
                            <XAxis dataKey="day" stroke="#9cb0d7" />
                            <YAxis stroke="#9cb0d7" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#0f1833",
                                    border: "none",
                                    borderRadius: "12px",
                                    color: "#e7eefc"
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="count"
                                stroke="#ff6a00"
                                strokeWidth={3}
                                dot={{ fill: "#ff6a00", r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* recent workouts */}
                {recentWorkouts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {recentWorkouts.map((ex, idx) => (
                            <div key={ex._id ?? idx} className="bg-gradient-to-br from-[#131f42] to-[#1d2d57] rounded-2xl shadow-lg p-5 border border-[#9cb0d7]/20">
                                <h3 className="text-white text-xl font-bold mb-2">💪 {ex.exerciseName}</h3>
                                <p className="text-[#d0dcf6] text-sm mb-2">{ex.current} / {ex.target}</p>
                                <p className="text-[#b7c6e6] text-xs">
                                    {ex.progressPercent ?? 0}% complete{ex.caloriesBurned ? ` · ${ex.caloriesBurned} cal` : ""}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-[#2a3d6a] text-[#e7eefc]">
                        <h3 className="text-xl font-bold mb-2">No recent workouts yet</h3>
                        <p className="text-[#9cb0d7]">Log a progress entry to see it appear here.</p>
                    </div>
                )}

            </div>
        </div>
    );
}