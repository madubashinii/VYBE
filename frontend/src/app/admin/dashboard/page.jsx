"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../../services/api";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const COLORS = ["#ff6a00", "#ff9e1a", "#2a9d8f", "#4f7cff", "#d7e3ff"];

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return setError("Sign in first");
                const headers = { Authorization: `Bearer ${token}` };
                const res = await api.get("/admin/dashboard", { headers });
                setData(res.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-[#e7eefc]">Loading dashboard...</div>;
    if (error) return <div className="min-h-[60vh] flex items-center justify-center text-[#e7eefc]">{error}</div>;

    return (
        <ProtectedRoute role="admin">
            <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] px-6 py-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-[#ff9e1a] text-sm font-semibold uppercase tracking-[0.2em]">Admin dashboard</p>
                                <h1 className="text-[#e7eefc] text-3xl font-bold mt-2">Activity overview</h1>
                                <p className="text-[#9cb0d7] mt-2">Platform usage, plan distribution, and recent moderation activity.</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Link href="/admin" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Users</Link>
                                <Link href="/admin/plans" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Plans</Link>
                                <Link href="/admin/progress" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Progress</Link>
                                <Link href="/admin/logs" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Logs</Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard label="Roles" value={data?.roleBreakdown?.reduce((sum, item) => sum + item.count, 0) ?? 0} />
                        <StatCard label="Goals" value={data?.planByGoal?.reduce((sum, item) => sum + item.count, 0) ?? 0} />
                        <StatCard label="Weekly updates" value={data?.progressSeries?.reduce((sum, item) => sum + item.count, 0) ?? 0} />
                        <StatCard label="Recent logs" value={data?.recentLogs?.length ?? 0} />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <Panel title="Role breakdown">
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={data?.roleBreakdown || []} dataKey="count" nameKey="role" cx="50%" cy="50%" outerRadius={110} label>
                                            {(data?.roleBreakdown || []).map((entry, index) => (
                                                <Cell key={`role-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </Panel>

                        <Panel title="Plan goals">
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data?.planByGoal || []}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#243454" />
                                        <XAxis dataKey="goal" stroke="#9cb0d7" tick={{ fill: "#9cb0d7" }} />
                                        <YAxis stroke="#9cb0d7" tick={{ fill: "#9cb0d7" }} />
                                        <Tooltip contentStyle={{ background: "#0b1228", border: "1px solid #2a3d6a", color: "#e7eefc" }} />
                                        <Bar dataKey="count" fill="#ff9e1a" radius={[10, 10, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Panel>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <Panel title="Progress trend">
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data?.progressSeries || []}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#243454" />
                                        <XAxis dataKey="day" stroke="#9cb0d7" tick={{ fill: "#9cb0d7" }} />
                                        <YAxis stroke="#9cb0d7" tick={{ fill: "#9cb0d7" }} />
                                        <Tooltip contentStyle={{ background: "#0b1228", border: "1px solid #2a3d6a", color: "#e7eefc" }} />
                                        <Legend />
                                        <Line type="monotone" dataKey="count" stroke="#ff6a00" strokeWidth={3} dot={{ r: 3 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Panel>

                        <Panel title="Recent audit logs">
                            <div className="space-y-3 max-h-80 overflow-auto pr-1">
                                {(data?.recentLogs || []).map((log) => (
                                    <div key={log.id} className="rounded-2xl border border-[#2a3d6a] bg-[#0b1228] p-4">
                                        <p className="text-[#e7eefc] font-semibold">{log.action}</p>
                                        <p className="text-[#9cb0d7] text-sm">{log.entityType}{log.entityId ? ` · ${log.entityId}` : ""}</p>
                                        <p className="text-[#9cb0d7] text-xs mt-1">{new Date(log.createdAt).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

function Panel({ title, children }) {
    return (
        <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
            <h2 className="text-[#e7eefc] text-xl font-bold mb-4">{title}</h2>
            {children}
        </div>
    );
}

function StatCard({ label, value }) {
    return (
        <div className="rounded-2xl border border-[#2a3d6a] bg-[#0b1228] p-4">
            <p className="text-[#9cb0d7] text-xs font-semibold uppercase mb-1">{label}</p>
            <p className="text-[#e7eefc] text-3xl font-bold">{value}</p>
        </div>
    );
}
