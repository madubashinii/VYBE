"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import Link from "next/link";
import api from "../../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getProgress, getStats, getWeekly } from "../../services/progressApi";

export default function Dashboard() {

    const [user, setUser] = useState(null);
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
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
                const [profileRes, weekly, recentProgress, statsData] = await Promise.all([
                    api.get("/auth/profile"),
                    getWeekly("week"),
                    getProgress("month"),
                    getStats("week"),
                ]);

                const profile = profileRes.data?.profile ?? null;
                const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
                const fallbackUser = storedUser ? JSON.parse(storedUser) : null;

                setUser(profile ? { ...fallbackUser, ...profile } : fallbackUser);
                setPlan(profileRes.data?.plan ?? null);

                setWeeklyData(Array.isArray(weekly) ? weekly : []);
                setRecentWorkouts(
                    Array.isArray(recentProgress)
                        ? [...recentProgress].sort((a, b) => new Date(b.dateRecorded) - new Date(a.dateRecorded)).slice(0, 3)
                        : []
                );
                setStats(statsData);

            } catch (err) {
                console.log(err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };


        fetchData();
    }, []);

    const hasPlan = Boolean(plan?._id);

    const statCards = [
        { label: "Workouts", value: stats.totalUpdates, note: "this week" },
        { label: "Hours", value: stats.avgProgress, note: "avg session" },
        { label: "Streak", value: stats.streak, note: "days active" },
        { label: "Rank", value: `#${stats.rank}`, note: "community" },
    ];

    const quickActions = [
        {
            title: "Create Plan",
            description: "Build your next training block with clear targets.",
            href: "/plans/create",
            accent: "from-[#ff6a00]/20 to-[#ff6a00]/0"
        },
        {
            title: "Track Progress",
            description: "Update your numbers and monitor consistency.",
            href: "/progress",
            accent: "from-[#3fb7ff]/20 to-[#3fb7ff]/0"
        },
        {
            title: "Workout History",
            description: "Review sessions and spot performance trends.",
            href: "/history",
            accent: "from-[#7be495]/20 to-[#7be495]/0"
        },
    ];

    const firstRunActions = [
        {
            title: "Create your plan",
            description: "Set your goal, difficulty, and exercises to unlock the full dashboard.",
            href: "/plans/create",
        },
        {
            title: "Complete profile",
            description: "Update your height, weight, and experience so recommendations stay relevant.",
            href: "/profile",
        },
        {
            title: "Start logging",
            description: "Add your first progress entry once your plan is ready.",
            href: "/progress",
        },
    ];


    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] relative overflow-hidden">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ff6a00]/15 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#3fb7ff]/10 blur-3xl" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                    {loading ? (
                        <div className="mb-8 rounded-3xl border border-[#2a3d6a] bg-[#0d1734]/85 p-8 text-[#c8d6f4] shadow-2xl">
                            Loading your dashboard...
                        </div>
                    ) : null}

                    <div className="mb-8 border border-[#2a3d6a] rounded-3xl bg-[#0d1734]/85 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#9cb0d7] mb-3">Dashboard</p>
                        <h1 className="text-[#e7eefc] text-3xl sm:text-4xl font-bold mb-2">
                            Welcome back, <span className="bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] bg-clip-text text-transparent">{user?.name || "Athlete"}</span>
                        </h1>
                        <p className="text-[#c8d6f4] text-base sm:text-lg max-w-2xl">
                            Keep your momentum high with focused plans, measured progress, and consistent effort.
                        </p>
                    </div>

                    {!hasPlan ? (
                        <div className="mb-8 rounded-3xl border border-[#ff9e1a]/30 bg-gradient-to-r from-[#ff6a00]/15 to-[#101a37]/90 p-6 sm:p-8 shadow-2xl">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="max-w-2xl">
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#ffb067] mb-3">First-time setup</p>
                                    <h2 className="text-[#f2f7ff] text-2xl sm:text-3xl font-bold mb-3">Build your first plan to unlock the full experience</h2>
                                    <p className="text-[#d7e3ff] text-sm sm:text-base">
                                        Your dashboard will become much more useful once you add a training plan. Start with a plan, then track workouts and watch your progress chart fill up.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Link href="/plans/create" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] px-5 py-3 text-sm font-semibold text-[#130b05] shadow-lg transition-transform hover:scale-[1.01]">
                                        Create plan
                                    </Link>
                                    <Link href="/profile" className="inline-flex items-center justify-center rounded-2xl border border-[#2a3d6a] bg-[#0b1228] px-5 py-3 text-sm font-semibold text-[#e7eefc] transition-colors hover:border-[#ff9e1a] hover:text-[#ffb067]">
                                        Finish profile
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                {firstRunActions.map((action, index) => (
                                    <Link key={action.title} href={action.href} className="rounded-2xl border border-[#2a3d6a] bg-[#0b1228]/70 p-5 hover:border-[#4a639a] transition-colors">
                                        <p className="text-[#ffb067] text-xs uppercase tracking-[0.18em] mb-2">Step {index + 1}</p>
                                        <h3 className="text-[#e7eefc] text-lg font-bold mb-2">{action.title}</h3>
                                        <p className="text-[#9cb0d7] text-sm">{action.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mb-8 rounded-3xl border border-[#2a3d6a] bg-[#0d1734]/85 p-6 sm:p-8 shadow-2xl">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-[#9cb0d7] mb-3">Active plan</p>
                                    <h2 className="text-[#f2f7ff] text-2xl sm:text-3xl font-bold mb-2">{plan?.name || "Your training plan"}</h2>
                                    <p className="text-[#c8d6f4] text-sm sm:text-base max-w-2xl">
                                        {plan?.description || "Your plan is ready. Keep logging workouts and update progress to stay on track."}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Link href={`/plans/${plan?._id}`} className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] px-5 py-3 text-sm font-semibold text-[#130b05] shadow-lg transition-transform hover:scale-[1.01]">
                                        View plan
                                    </Link>
                                    <Link href="/progress" className="inline-flex items-center justify-center rounded-2xl border border-[#2a3d6a] bg-[#0b1228] px-5 py-3 text-sm font-semibold text-[#e7eefc] transition-colors hover:border-[#ff9e1a] hover:text-[#ffb067]">
                                        Add progress
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="rounded-2xl border border-[#2a3d6a] bg-[#0b1228]/70 p-4">
                                    <p className="text-[#9cb0d7] text-xs uppercase tracking-[0.18em] mb-2">Goal</p>
                                    <p className="text-[#e7eefc] font-semibold">{plan?.goal || "General Fitness"}</p>
                                </div>
                                <div className="rounded-2xl border border-[#2a3d6a] bg-[#0b1228]/70 p-4">
                                    <p className="text-[#9cb0d7] text-xs uppercase tracking-[0.18em] mb-2">Difficulty</p>
                                    <p className="text-[#e7eefc] font-semibold">{plan?.difficulty || "Beginner"}</p>
                                </div>
                                <div className="rounded-2xl border border-[#2a3d6a] bg-[#0b1228]/70 p-4">
                                    <p className="text-[#9cb0d7] text-xs uppercase tracking-[0.18em] mb-2">Duration</p>
                                    <p className="text-[#e7eefc] font-semibold">{plan?.duration ?? 4} weeks</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {statCards.map((card) => (
                            <div key={card.label} className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-[#2a3d6a] hover:border-[#4a639a] transition-colors">
                                <p className="text-[#9cb0d7] text-xs font-semibold uppercase mb-2 tracking-wider">{card.label}</p>
                                <p className="text-[#e7eefc] text-3xl font-bold leading-tight">{card.value}</p>
                                <p className="text-[#7f95c2] text-xs mt-2 uppercase tracking-wider">{card.note}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {(hasPlan ? quickActions : quickActions.slice(0, 2)).map((action) => (
                            <Link
                                key={action.title}
                                href={action.href}
                                className="group relative bg-[#101a37]/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-[#2a3d6a] hover:border-[#4a639a] hover:shadow-2xl transition-all overflow-hidden"
                            >
                                <div className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${action.accent} pointer-events-none`} />
                                <h3 className="text-[#e7eefc] text-lg font-bold mb-2 relative">{action.title}</h3>
                                <p className="text-[#9cb0d7] text-sm relative">{action.description}</p>
                                <p className="text-[#ffb067] text-xs uppercase tracking-[0.18em] mt-4 relative group-hover:text-[#ffd099] transition-colors">
                                    Open
                                </p>
                            </Link>
                        ))}
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
                                    <p className="text-[#8ca2ce] text-xs uppercase tracking-wider mb-2">Recent session</p>
                                    <h3 className="text-white text-xl font-bold mb-2">{ex.exerciseName}</h3>
                                    <p className="text-[#d0dcf6] text-sm mb-3">{ex.current} / {ex.target}</p>
                                    <div className="h-2 w-full rounded-full bg-[#253861] overflow-hidden mb-3">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a]"
                                            style={{ width: `${Math.max(0, Math.min(100, ex.progressPercent ?? 0))}%` }}
                                        />
                                    </div>
                                    <p className="text-[#b7c6e6] text-xs">
                                        {ex.progressPercent ?? 0}% complete{ex.caloriesBurned ? ` · ${ex.caloriesBurned} cal` : ""}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-[#2a3d6a] text-[#e7eefc]">
                            <h3 className="text-xl font-bold mb-2">{hasPlan ? "No recent workouts yet" : "Nothing to show yet"}</h3>
                            <p className="text-[#9cb0d7]">
                                {hasPlan
                                    ? "Log a progress entry to see it appear here."
                                    : "Create your first plan and add a workout to populate this section."}
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </ProtectedRoute>
    );
}