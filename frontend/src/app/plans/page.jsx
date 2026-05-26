"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getPlans } from "../../services/plansApi";

export default function PlansList() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const data = await getPlans();
                if (!mounted) return;
                setPlans(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load plans:", err);
            }
        }
        load();
        return () => (mounted = false);
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38]">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-[#e7eefc] text-3xl font-bold">My Plans</h1>
                        <Link href="/plans/create" className="bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] px-4 py-2 rounded-lg text-black font-semibold">+ New Plan</Link>
                    </div>

                    <div className="space-y-4">
                        {plans.length === 0 ? (
                            <div className="bg-[#101a37]/90 rounded-2xl p-6 border border-[#2a3d6a] text-[#9cb0d7]">No plans yet. Create one to get started.</div>
                        ) : (
                            plans.map((plan) => (
                                <div key={plan._id} className="bg-[#101a37]/90 rounded-2xl p-4 border border-[#2a3d6a] flex justify-between items-center">
                                    <div>
                                        <h3 className="text-[#e7eefc] font-bold">{plan.name}</h3>
                                        <p className="text-[#9cb0d7] text-sm">{plan.description || "No description"}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/plans/${plan._id}`} className="px-3 py-2 rounded-lg bg-[#1b2a52] text-[#e7eefc]">Edit</Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
