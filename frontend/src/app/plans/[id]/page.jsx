"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPlan, updatePlan, deletePlan } from "../../../services/plansApi";

export default function EditPlan({ params }) {
    const router = useRouter();
    const { id } = params;
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const data = await getPlan(id);
                if (!mounted) return;
                setPlan(data);
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        }
        load();
        return () => (mounted = false);
    }, [id]);

    const handleSave = async () => {
        try {
            await updatePlan(id, {
                name: plan.name,
                description: plan.description,
                duration: plan.duration,
                goal: plan.goal,
                difficulty: plan.difficulty,
            });
            alert("Plan saved");
            router.push('/plans');
        } catch (err) {
            console.error(err);
            alert("Failed to save plan");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Delete this plan?")) return;
        try {
            await deletePlan(id);
            alert("Plan deleted");
            router.push('/plans');
        } catch (err) {
            console.error(err);
            alert("Failed to delete plan");
        }
    };

    if (loading) return <div className="p-8">Loading…</div>;
    if (!plan) return <div className="p-8">Plan not found</div>;

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38]">
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-[#e7eefc] text-2xl font-bold">Edit Plan</h1>
                        <div className="flex gap-2">
                            <Link href="/plans" className="px-3 py-2 rounded-lg bg-[#1b2a52] text-[#e7eefc]">Back</Link>
                            <button onClick={handleDelete} className="px-3 py-2 rounded-lg bg-red-600 text-white">Delete</button>
                        </div>
                    </div>

                    <div className="bg-[#101a37]/90 rounded-2xl p-6 border border-[#2a3d6a]">
                        <div className="space-y-4">
                            <input
                                value={plan.name}
                                onChange={(e) => setPlan({ ...plan, name: e.target.value })}
                                className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc]"
                            />

                            <textarea
                                value={plan.description}
                                onChange={(e) => setPlan({ ...plan, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc]"
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    value={plan.duration}
                                    onChange={(e) => setPlan({ ...plan, duration: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc]"
                                />
                                <input
                                    value={plan.goal}
                                    onChange={(e) => setPlan({ ...plan, goal: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc]"
                                />
                            </div>

                            <select
                                value={plan.difficulty}
                                onChange={(e) => setPlan({ ...plan, difficulty: e.target.value })}
                                className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc]"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>

                            <div className="flex justify-end">
                                <button onClick={handleSave} className="bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] px-6 py-3 rounded-xl text-black font-bold">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
