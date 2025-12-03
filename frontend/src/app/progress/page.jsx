"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import * as api from "../../services/progressApi";

function StatCard({ title, value, icon, gradient }) {
    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
                <div className={`bg-gradient-to-br ${gradient} p-2.5 rounded-xl`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                    </svg>
                </div>
            </div>
            <p className="text-[#738fa7] text-xs font-semibold mb-1">{title}</p>
            <p className="text-[#0c4160] text-3xl font-bold">{value}</p>
        </div>
    );
}

function ProgressBar({ exercise, current, target, progress }) {
    const pct = Math.max(0, Math.min(100, Number(progress) || 0));
    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[#0c4160] font-bold text-sm">{exercise}</span>
                <span className="text-[#0d659d] font-bold text-sm">{pct}%</span>
            </div>
            <div className="w-full bg-[#c3ceda]/30 rounded-full h-3 mb-2">
                <div
                    className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] h-full rounded-full"
                    style={{ width: `${pct}%` }}
                />
            </div>
            <div className="flex items-center justify-between text-xs text-[#738fa7]">
                <span>Current: {current ?? "—"}</span>
                <span>Target: {target ?? "—"}</span>
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
                    <p className="text-[#c3ceda] text-2xl font-bold">{record.current}</p>
                </div>
                <div className="bg-green-500/20 px-3 py-1 rounded-lg">
                    <p className="text-green-300 text-sm font-bold">{record.progressPercent}%</p>
                </div>
            </div>
            <p className="text-[#c3ceda] text-xs">{new Date(record.dateRecorded).toLocaleDateString()}</p>
        </div>
    );
}

export default function ProgressPage() {
    const [progressData, setProgressData] = useState([]);
    const [stats, setStats] = useState(null);
    const [weekly, setWeekly] = useState([]);
    const [prs, setPrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState("week");

    useEffect(() => {
        let mounted = true;
        async function loadAll() {
            setLoading(true);
            try {
                const [prog, st, wk, pr] = await Promise.all([
                    api.getProgress(timeRange),
                    api.getStats(timeRange),
                    api.getWeekly(timeRange),
                    api.getPRs(timeRange),
                ]);
                if (!mounted) return;
                setProgressData(Array.isArray(prog) ? prog.reverse() : []);
                setStats(st);
                setWeekly(Array.isArray(wk) ? wk : []);
                setPrs(Array.isArray(pr) ? pr : []);
            } catch (err) {
                console.error("Load error:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        loadAll();
        return () => {
            mounted = false;
        };
    }, [timeRange]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#0c4160] hover:text-[#0d659d] font-semibold mb-4">
                        ← Back to Dashboard
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-[#0c4160] text-4xl font-bold mb-2">Your Progress</h1>
                            <p className="text-[#0c4160]/70 text-lg">Track your fitness journey</p>
                        </div>

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

<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <StatCard
        title="Total Workouts"
        value={stats?.totalUpdates ?? "0"}
        icon="M13 10V3L4 14h7v7l9-11h-7z"
        gradient="from-blue-500 to-cyan-500"
    />
    <StatCard
        title="Avg Progress"
        value={`${stats?.avgProgress ?? 0}%`}
        icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        gradient="from-green-500 to-emerald-500"
    />
    <StatCard
        title="Streak"
        value={stats?.streak ?? 0}
        icon="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        gradient="from-orange-500 to-red-500"
    />
    <StatCard
        title="Rank"
        value={`#${stats?.rank ?? "-"}`}
        icon="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        gradient="from-purple-500 to-pink-500"
    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
                        <h3 className="text-[#0c4160] text-xl font-bold mb-4">Weekly Activity</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={weekly}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#c3ceda" opacity={0.3} />
                                <XAxis dataKey="day" stroke="#738fa7" />
                                <YAxis stroke="#738fa7" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0c4160",
                                        border: "none",
                                        borderRadius: "12px",
                                        color: "#fff",
                                    }}
                                />
                                <Line type="monotone" dataKey="count" stroke="#0d659d" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
                        <h3 className="text-[#0c4160] text-xl font-bold mb-4">Workouts (by day)</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={weekly}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#c3ceda" opacity={0.3} />
                                <XAxis dataKey="day" stroke="#738fa7" />
                                <YAxis stroke="#738fa7" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#0c4160",
                                        border: "none",
                                        borderRadius: "12px",
                                        color: "#fff",
                                    }}
                                />
                                <Bar dataKey="count" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* exercise progress list */}
                <div className="mb-8">
                    <h2 className="text-[#0c4160] text-2xl font-bold mb-4">Exercise Progress</h2>
                    {loading ? (
                        <p>Loading…</p>
                    ) : progressData.length === 0 ? (
                        <p className="text-sm text-[#0c4160]/70">No progress recorded yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {progressData.map((item, i) => (
                                <ProgressBar
                                    key={item._id ?? i}
                                    exercise={item.exerciseName}
                                    current={item.current}
                                    target={item.target}
                                    progress={item.progressPercent}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* personal Records */}
                <div>
                    <h2 className="text-[#0c4160] text-2xl font-bold mb-4">Personal Records</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {prs.length === 0 ? (
                            <p className="text-sm text-[#0c4160]/70">No personal records yet.</p>
                        ) : (
                            prs.map((rec, i) => <PRCard key={rec.exercise ?? i} record={rec} />)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
