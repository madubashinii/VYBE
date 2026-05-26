"use client";

import ProtectedRoute from "../../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../services/api";

export default function AdminPlanDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [plan, setPlan] = useState(null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        load();
    }, [id]);

    const load = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.get(`/admin/plans/${id}`, { headers });
            setPlan(res.data.plan);
            setForm({ name: res.data.plan.name, description: res.data.plan.description, duration: res.data.plan.duration, difficulty: res.data.plan.difficulty, goal: res.data.plan.goal });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load plan");
        } finally {
            setLoading(false);
        }
    };

    const save = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.put(`/admin/plans/${id}`, form, { headers });
            setPlan(res.data.plan);
            setEditing(false);
            alert(res.data.message || "Saved");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save");
        }
    };

    const remove = async () => {
        if (!confirm("Delete this plan? This action cannot be undone.")) return;
        try {
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            await api.delete(`/admin/plans/${id}`, { headers });
            alert("Plan deleted");
            router.push("/admin/plans");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete");
        }
    };

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center">Loading plan...</div>;
    if (error) return <div className="min-h-[60vh] flex items-center justify-center">{error}</div>;
    if (!plan) return <div className="min-h-[60vh] flex items-center justify-center">Plan not found</div>;

    return (
        <ProtectedRoute role="admin">
            <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] px-6 py-8">
                <div className="mx-auto max-w-4xl space-y-6">
                    <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-[#e7eefc] text-2xl font-bold">{plan.name}</h1>
                                <p className="text-[#9cb0d7]">Owner: {String(plan.userId)}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setEditing(!editing)} className="px-3 py-2 rounded-lg bg-[#1b2a52] text-[#9cb0d7]">{editing ? 'Cancel' : 'Edit'}</button>
                                <button onClick={remove} className="px-3 py-2 rounded-lg bg-[#ff6a00] text-white">Delete</button>
                            </div>
                        </div>

                        {!editing && (
                            <div className="mt-4 text-[#9cb0d7]">
                                <p><strong>Goal:</strong> {plan.goal}</p>
                                <p><strong>Difficulty:</strong> {plan.difficulty}</p>
                                <p><strong>Duration:</strong> {plan.duration} weeks</p>
                                <p className="mt-2"><strong>Description:</strong></p>
                                <p className="mt-1">{plan.description}</p>

                                <div className="mt-4">
                                    <h3 className="text-[#e7eefc] font-semibold">Exercises</h3>
                                    <div className="space-y-2 mt-2">
                                        {Array.isArray(plan.exercises) && plan.exercises.map((ex) => (
                                            <div key={ex._id} className="rounded-xl p-3 bg-[#0b1228] border border-[#2a3d6a]">
                                                <p className="text-[#e7eefc] font-semibold">{ex.exercise}</p>
                                                <p className="text-[#9cb0d7] text-sm">{ex.sets} sets · {ex.reps} reps · {ex.day}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {editing && (
                            <div className="mt-4 space-y-3">
                                <input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]" />
                                <input value={form.goal || ''} onChange={(e) => setForm({ ...form, goal: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]" />
                                <input value={form.difficulty || ''} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]" />
                                <input type="number" value={form.duration || 0} onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })} className="w-full px-3 py-2 rounded-lg bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]" />
                                <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-[#0b1228] border-2 border-[#2a3d6a] text-[#e7eefc]" rows={4} />
                                <div className="flex items-center gap-3">
                                    <button onClick={save} className="px-4 py-2 rounded-lg bg-[#ff6a00] text-white">Save</button>
                                    <button onClick={() => { setEditing(false); setForm({ name: plan.name, description: plan.description, duration: plan.duration, difficulty: plan.difficulty, goal: plan.goal }); }} className="px-3 py-2 rounded-lg bg-[#1b2a52] text-[#9cb0d7]">Reset</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
