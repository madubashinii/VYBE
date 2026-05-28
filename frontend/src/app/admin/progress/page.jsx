"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../../services/api";

export default function AdminProgress() {
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        load();
    }, []);

    const load = async (nextPage = page, nextSearch = search, nextUserId = userId) => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) return setError("Sign in first");
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.get("/admin/progress", { headers, params: { page: nextPage, limit, search: nextSearch || undefined, userId: nextUserId || undefined } });
            setRecords(res.data.progress || []);
            setTotal(res.data.total || 0);
            setPage(nextPage);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load progress");
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async (e) => {
        e.preventDefault();
        await load(1, search, userId);
    };

    const deleteRecord = async (recordId) => {
        if (!confirm("Delete this progress record?")) return;
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            await api.delete(`/admin/progress/${recordId}`, { headers });
            await load(page, search, userId);
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    const exportCsv = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.get("/admin/progress/export", { headers, params: { search: search || undefined, userId: userId || undefined }, responseType: "blob" });
            const blob = new Blob([res.data], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "progress-export.csv";
            anchor.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            alert(err.response?.data?.message || "Export failed");
        }
    };

    const goPage = async (next) => {
        const nextPage = next ? page + 1 : Math.max(1, page - 1);
        await load(nextPage, search, userId);
    };

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-[#e7eefc]">Loading progress...</div>;
    if (error) return <div className="min-h-[60vh] flex items-center justify-center text-[#e7eefc]">{error}</div>;

    return (
        <ProtectedRoute role="admin">
            <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] px-6 py-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-[#ff9e1a] text-sm font-semibold uppercase tracking-[0.2em]">Progress moderation</p>
                                <h1 className="text-[#e7eefc] text-3xl font-bold mt-2">Progress records</h1>
                            </div>
                            <div className="flex gap-2">
                                <Link href="/admin" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Users</Link>
                                <Link href="/admin/logs" className="rounded-2xl bg-[#1b2a52] px-4 py-2 text-sm text-[#d7e3ff]">Logs</Link>
                                <button onClick={exportCsv} className="rounded-2xl bg-[#ff6a00] px-4 py-2 text-sm font-semibold text-white">Export CSV</button>
                            </div>
                        </div>

                        <form onSubmit={applyFilters} className="mt-4 grid gap-3 md:grid-cols-3">
                            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search exercise name" className="w-full px-4 py-2 rounded-xl bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]" />
                            <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Filter by user id" className="w-full px-4 py-2 rounded-xl bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]" />
                            <button className="rounded-xl bg-[#1b2a52] px-4 py-2 font-semibold text-[#d7e3ff]">Apply filters</button>
                        </form>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {records.map((record) => (
                            <div key={record.id} className="rounded-3xl border border-[#2a3d6a] bg-[#0b1228] p-5 shadow-lg">
                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <p className="text-[#e7eefc] text-lg font-semibold">{record.exerciseName}</p>
                                        <p className="text-[#9cb0d7] text-sm">User: {record.user?.name || String(record.userId)} · {record.user?.email || ""}</p>
                                        <p className="text-[#9cb0d7] text-sm mt-2">{record.current} / {record.target} · {record.progressPercent}% · {record.caloriesBurned || 0} calories</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-full bg-[#ff6a00]/15 px-3 py-1 text-xs font-bold text-[#ff9e1a]">{new Date(record.dateRecorded).toLocaleDateString()}</span>
                                        <button onClick={() => deleteRecord(record.id)} className="rounded-xl bg-[#1b2a52] px-3 py-2 text-sm text-[#d7e3ff]">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => goPage(false)} className="px-3 py-2 rounded-lg bg-[#1b2a52] text-[#d7e3ff]">Prev</button>
                        <div className="text-[#9cb0d7]">Page {page} / {Math.max(1, Math.ceil(total / limit))}</div>
                        <button onClick={() => goPage(true)} className="px-3 py-2 rounded-lg bg-[#1b2a52] text-[#d7e3ff]">Next</button>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
