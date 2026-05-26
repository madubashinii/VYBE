"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../../services/api";

export default function AdminPlans() {
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) return setError("Sign in first");
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.get("/admin/plans", { headers, params: { page, limit } });
            setPlans(res.data.plans || []);
            setTotal(res.data.total || 0);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load plans");
        } finally {
            setLoading(false);
        }
    };

    const doSearch = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.get("/admin/plans", { headers, params: { page: 1, limit, search } });
            setPlans(res.data.plans || []);
            setTotal(res.data.total || 0);
            setPage(1);
        } catch (err) {
            setError(err.response?.data?.message || "Search failed");
        } finally {
            setLoading(false);
        }
    };

    const goPage = async (next) => {
        const newPage = next ? page + 1 : Math.max(1, page - 1);
        setPage(newPage);
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.get("/admin/plans", { headers, params: { page: newPage, limit, search } });
            setPlans(res.data.plans || []);
            setTotal(res.data.total || 0);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to page");
        }
    };

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center">Loading plans...</div>;
    if (error) return <div className="min-h-[60vh] flex items-center justify-center">{error}</div>;

    return (
        <ProtectedRoute role="admin">
            <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] px-6 py-8">
                <div className="mx-auto max-w-6xl space-y-6">
                    <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
                        <h1 className="text-[#e7eefc] text-2xl font-bold mb-4">Manage Plans</h1>

                        <form onSubmit={doSearch} className="mb-4">
                            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search plans by name, goal, description" className="w-full px-4 py-2 rounded-xl bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]" />
                        </form>

                        <div className="space-y-3">
                            {plans.map((p) => (
                                <div key={p.id} className="flex items-center justify-between rounded-2xl border border-[#2a3d6a] bg-[#0b1228] p-4">
                                    <div>
                                        <Link href={`/admin/plans/${p.id}`} className="block hover:underline">
                                            <p className="text-[#e7eefc] font-semibold">{p.name}</p>
                                            <p className="text-[#9cb0d7] text-sm">{p.goal} · {p.difficulty}</p>
                                        </Link>
                                        <p className="text-[#9cb0d7] text-xs mt-1">Owner: {String(p.userId)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Link href={`/admin/plans/${p.id}`} className="px-3 py-2 rounded-lg bg-[#1b2a52] text-[#9cb0d7]">View</Link>
                                    </div>
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
