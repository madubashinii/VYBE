"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../services/api";

export default function AdminPanel() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [overview, setOverview] = useState(null);
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentPlans, setRecentPlans] = useState([]);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [savingRoleId, setSavingRoleId] = useState(null);

    useEffect(() => {
        const loadAdmin = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Sign in first to access admin tools.");
                    setLoading(false);
                    return;
                }

                const headers = { Authorization: `Bearer ${token}` };
                const [overviewRes, usersRes] = await Promise.all([
                    api.get("/admin/overview", { headers }),
                    api.get("/admin/users", { headers, params: { page, limit } }),
                ]);

                setOverview(overviewRes.data?.overview ?? null);
                setRecentUsers(Array.isArray(overviewRes.data?.recentUsers) ? overviewRes.data.recentUsers : []);
                setRecentPlans(Array.isArray(overviewRes.data?.recentPlans) ? overviewRes.data.recentPlans : []);
                setUsers(Array.isArray(usersRes.data?.users) ? usersRes.data.users : []);
                setTotal(usersRes.data?.total || 0);
                setSelectedUsers([]);
            } catch (err) {
                if (err.response?.status === 403) {
                    setError("Admin access required.");
                } else {
                    setError(err.response?.data?.message || "Failed to load admin data.");
                }
            } finally {
                setLoading(false);
            }
        };

        loadAdmin();
    }, []);

    const refreshUsers = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };
        const [overviewRes, usersRes] = await Promise.all([
            api.get("/admin/overview", { headers }),
            api.get("/admin/users", { headers, params: { page, limit, search } }),
        ]);

        setOverview(overviewRes.data?.overview ?? null);
        setRecentUsers(Array.isArray(overviewRes.data?.recentUsers) ? overviewRes.data.recentUsers : []);
        setRecentPlans(Array.isArray(overviewRes.data?.recentPlans) ? overviewRes.data.recentPlans : []);
        setUsers(Array.isArray(usersRes.data?.users) ? usersRes.data.users : []);
        setTotal(usersRes.data?.total || 0);
        setSelectedUsers([]);
    };

    const handleRoleChange = async (userId, currentRole) => {
        try {
            setSavingRoleId(userId);
            const token = localStorage.getItem("token");
            if (!token) return;

            const nextRole = currentRole === "admin" ? "user" : "admin";
            await api.put(
                `/admin/users/${userId}/role`,
                { role: nextRole },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Refresh current page
            await refreshUsers();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update role.");
        } finally {
            setSavingRoleId(null);
        }
    };

    // handle search submit
    const handleSearch = async (e) => {
        e.preventDefault();
        setPage(1);
        await refreshUsers();
    };

    const toggleSelectedUser = (userId) => {
        setSelectedUsers((current) =>
            current.includes(userId) ? current.filter((id) => id !== userId) : [...current, userId]
        );
    };

    const runBulkAction = async (action) => {
        if (!selectedUsers.length) return;
        const confirmMap = {
            promote: "Promote selected users to admin?",
            demote: "Demote selected admins to user?",
            activate: "Reactivate selected users?",
            deactivate: "Deactivate selected users?",
        };
        if (!confirm(confirmMap[action] || "Run bulk action?")) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            await api.post(
                "/admin/users/bulk",
                { action, ids: selectedUsers },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            await refreshUsers();
        } catch (err) {
            setError(err.response?.data?.message || "Bulk action failed.");
        }
    };

    const goPage = async (next) => {
        const newPage = next ? page + 1 : Math.max(1, page - 1);
        setPage(newPage);
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const headers = { Authorization: `Bearer ${token}` };
            const usersRes = await api.get("/admin/users", { headers, params: { page: newPage, limit, search } });
            setUsers(Array.isArray(usersRes.data?.users) ? usersRes.data.users : []);
            setTotal(usersRes.data?.total || 0);
            setSelectedUsers([]);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6">
                <div className="max-w-xl w-full bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-8 text-center">
                    <p className="text-[#9cb0d7] font-semibold">Loading admin tools...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6">
                <div className="max-w-xl w-full bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-8 text-center">
                    <h1 className="text-[#e7eefc] text-3xl font-bold mb-4">Admin tools</h1>
                    <p className="text-[#9cb0d7] leading-relaxed">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <ProtectedRoute role="admin">
            <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] px-6 py-8">
                <div className="mx-auto max-w-6xl space-y-6">
                    <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-[#ff9e1a] text-sm font-semibold uppercase tracking-[0.2em]">Admin panel</p>
                                <h1 className="text-[#e7eefc] text-3xl font-bold mt-2">Site management</h1>
                                <p className="text-[#9cb0d7] mt-2">Manage users and review the current platform state.</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Link href="/admin/dashboard" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Dashboard</Link>
                                <Link href="/admin/plans" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Plans</Link>
                                <Link href="/admin/progress" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Progress</Link>
                                <Link href="/admin/logs" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Logs</Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                            <StatCard label="Users" value={overview?.userCount ?? 0} />
                            <StatCard label="Admins" value={overview?.adminCount ?? 0} />
                            <StatCard label="Plans" value={overview?.planCount ?? 0} />
                            <StatCard label="Progress" value={overview?.progressCount ?? 0} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
                            <h2 className="text-[#e7eefc] text-xl font-bold mb-4">Recent users</h2>
                            <div className="space-y-3">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between rounded-2xl border border-[#2a3d6a] bg-[#0b1228] p-4">
                                        <div>
                                            <p className="text-[#e7eefc] font-semibold">{user.name}</p>
                                            <p className="text-[#9cb0d7] text-sm">{user.email}</p>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${user.role === "admin" ? "bg-[#ff6a00]/15 text-[#ff9e1a]" : "bg-[#2a3d6a]/30 text-[#d7e3ff]"}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
                            <h2 className="text-[#e7eefc] text-xl font-bold mb-4">Recent plans</h2>
                            <div className="space-y-3">
                                {recentPlans.map((plan) => (
                                    <div key={plan.id} className="rounded-2xl border border-[#2a3d6a] bg-[#0b1228] p-4">
                                        <p className="text-[#e7eefc] font-semibold">{plan.name}</p>
                                        <p className="text-[#9cb0d7] text-sm">{plan.goal} · {plan.difficulty}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
                        <h2 className="text-[#e7eefc] text-xl font-bold mb-4">User access</h2>
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <button onClick={() => runBulkAction("promote")} disabled={!selectedUsers.length} className="rounded-xl bg-[#ff6a00] px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">Bulk promote</button>
                            <button onClick={() => runBulkAction("demote")} disabled={!selectedUsers.length} className="rounded-xl bg-[#1b2a52] px-3 py-2 text-sm font-semibold text-[#d7e3ff] disabled:opacity-50">Bulk demote</button>
                            <button onClick={() => runBulkAction("activate")} disabled={!selectedUsers.length} className="rounded-xl bg-[#1b2a52] px-3 py-2 text-sm font-semibold text-[#d7e3ff] disabled:opacity-50">Bulk activate</button>
                            <button onClick={() => runBulkAction("deactivate")} disabled={!selectedUsers.length} className="rounded-xl bg-[#1b2a52] px-3 py-2 text-sm font-semibold text-[#d7e3ff] disabled:opacity-50">Bulk deactivate</button>
                            <span className="text-sm text-[#9cb0d7]">Selected: {selectedUsers.length}</span>
                        </div>
                        <div className="mb-4 flex items-center gap-3">
                            <form onSubmit={handleSearch} className="flex-1">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search users by name or email"
                                    className="w-full px-4 py-2 rounded-xl bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]"
                                />
                            </form>
                            <div className="flex items-center gap-2">
                                <button onClick={() => goPage(false)} className="px-3 py-2 rounded-lg bg-[#1b2a52]">Prev</button>
                                <div className="text-[#9cb0d7]">Page {page} / {Math.max(1, Math.ceil(total / limit))}</div>
                                <button onClick={() => goPage(true)} className="px-3 py-2 rounded-lg bg-[#1b2a52]">Next</button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {users.map((user) => (
                                <div key={user.id} className="flex flex-col gap-3 rounded-2xl border border-[#2a3d6a] bg-[#0b1228] p-4 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => toggleSelectedUser(user.id)}
                                            className="h-4 w-4 accent-[#ff6a00]"
                                        />
                                        <div>
                                            <Link href={`/admin/users/${user.id}`} className="block hover:underline">
                                                <p className="text-[#e7eefc] font-semibold">{user.name}</p>
                                                <p className="text-[#9cb0d7] text-sm">{user.email}</p>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleRoleChange(user.id, user.role)}
                                            disabled={savingRoleId === user.id}
                                            className="rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] disabled:opacity-60"
                                        >
                                            {savingRoleId === user.id
                                                ? "Updating..."
                                                : user.role === "admin"
                                                    ? "Demote to user"
                                                    : "Promote to admin"}
                                        </button>

                                        <Link href={`/admin/users/${user.id}`} className="rounded-2xl px-3 py-2 bg-[#1b2a52] text-sm text-[#9cb0d7]">View</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
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