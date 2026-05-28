"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../../services/api";

export default function AdminLogs() {
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [total, setTotal] = useState(0);
    const [action, setAction] = useState("");
    const [entityType, setEntityType] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        load();
    }, []);

    const load = async (nextPage = page, nextAction = action, nextEntityType = entityType) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) return setError("Sign in first");
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.get("/admin/logs", { headers, params: { page: nextPage, limit, action: nextAction || undefined, entityType: nextEntityType || undefined } });
            setLogs(res.data.logs || []);
            setTotal(res.data.total || 0);
            setPage(nextPage);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load logs");
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async (e) => {
        e.preventDefault();
        await load(1, action, entityType);
    };

    const goPage = async (next) => {
        const nextPage = next ? page + 1 : Math.max(1, page - 1);
        await load(nextPage, action, entityType);
    };

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-[#e7eefc]">Loading logs...</div>;
    if (error) return <div className="min-h-[60vh] flex items-center justify-center text-[#e7eefc]">{error}</div>;

    return (
        <ProtectedRoute role="admin">
            <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] px-6 py-8">
                <div className="mx-auto max-w-6xl space-y-6">
                    <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-[#ff9e1a] text-sm font-semibold uppercase tracking-[0.2em]">Audit logs</p>
                                <h1 className="text-[#e7eefc] text-3xl font-bold mt-2">Admin activity</h1>
                            </div>
                            <div className="flex gap-2">
                                <Link href="/admin" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Users</Link>
                                <Link href="/admin/dashboard" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Dashboard</Link>
                            </div>
                        </div>

                        <form onSubmit={applyFilters} className="mt-4 grid gap-3 md:grid-cols-3">
                            <input value={action} onChange={(e) => setAction(e.target.value)} placeholder="Action filter" className="w-full px-4 py-2 rounded-xl bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]" />
                            <input value={entityType} onChange={(e) => setEntityType(e.target.value)} placeholder="Entity type filter" className="w-full px-4 py-2 rounded-xl bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]" />
                            <button className="rounded-xl bg-[#ff6a00] px-4 py-2 font-semibold text-white">Apply filters</button>
                        </form>
                    </div>

                    <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
                        <div className="space-y-3">
                            {logs.map((log) => (
                                <div key={log.id} className="rounded-2xl border border-[#2a3d6a] bg-[#0b1228] p-4">
                                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <p className="text-[#e7eefc] font-semibold">{log.action}</p>
                                            <p className="text-[#9cb0d7] text-sm">{log.entityType}{log.entityId ? ` · ${log.entityId}` : ""}</p>
                                        </div>
                                        <p className="text-[#9cb0d7] text-xs">{new Date(log.createdAt).toLocaleString()}</p>
                                    </div>
                                    <p className="text-[#9cb0d7] text-sm mt-2">Actor: {log.actorEmail || String(log.actorId)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex items-center gap-3">
                            <button onClick={() => goPage(false)} className="px-3 py-2 rounded-lg bg-[#1b2a52]">Prev</button>
                            <div className="text-[#9cb0d7]">Page {page} / {Math.max(1, Math.ceil(total / limit))}</div>
                            <button onClick={() => goPage(true)} className="px-3 py-2 rounded-lg bg-[#1b2a52]">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
