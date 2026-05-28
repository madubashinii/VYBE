"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../services/api";

export default function UserDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Sign in first");
                    setLoading(false);
                    return;
                }
                const headers = { Authorization: `Bearer ${token}` };
                const res = await api.get(`/admin/users/${id}`, { headers });
                setUser(res.data.user);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load user");
            } finally {
                setLoading(false);
            }
        };

        if (id) load();
    }, [id]);

    const toggleActive = async () => {
        if (!user) return;
        const confirmMsg = user.active ? "Deactivate this user? They will be unable to sign in." : "Reactivate this user?";
        if (!confirm(confirmMsg)) return;

        try {
            setSaving(true);
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.put(`/admin/users/${id}/active`, { active: !user.active }, { headers });
            setUser(res.data.user);
            alert(res.data.message || "Updated");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update user");
        } finally {
            setSaving(false);
        }
    };

    const impersonate = async () => {
        if (!confirm("Start impersonation session as this user? You will be logged in as them for 1 hour.")) return;
        try {
            setSaving(true);
            const token = localStorage.getItem("token");
            const headers = { Authorization: `Bearer ${token}` };
            const res = await api.post(`/admin/users/${id}/impersonate`, {}, { headers });
            const { token: impToken, user: impUser } = res.data;
            if (!impToken) return alert("No token returned");

            localStorage.setItem("token", impToken);
            localStorage.setItem("user", JSON.stringify(impUser));

            alert("Impersonation started — you are now signed in as the user.");
            router.push("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to impersonate");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (<div className="min-h-[60vh] flex items-center justify-center">Loading...</div>);
    if (error) return (<div className="min-h-[60vh] flex items-center justify-center">{error}</div>);
    if (!user) return (<div className="min-h-[60vh] flex items-center justify-center">User not found</div>);

    return (
        <ProtectedRoute role="admin">
            <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] px-6 py-8">
                <div className="mx-auto max-w-3xl space-y-6">
                    <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#2a3d6a]/30 p-6">
                        <h1 className="text-[#e7eefc] text-2xl font-bold">User details</h1>
                        <p className="text-[#9cb0d7] mt-2">Manage this user's access and impersonation.</p>

                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[#e7eefc] font-semibold">{user.name}</p>
                                    <p className="text-[#9cb0d7] text-sm">{user.email}</p>
                                </div>
                                <div className="text-sm">
                                    <div className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${user.role === "admin" ? "bg-[#ff6a00]/15 text-[#ff9e1a]" : "bg-[#2a3d6a]/30 text-[#d7e3ff]"}`}>
                                        {user.role}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button onClick={toggleActive} disabled={saving} className="px-4 py-2 rounded-xl bg-[#ff6a00] text-white">
                                    {user.active ? "Deactivate" : "Reactivate"}
                                </button>

                                <button onClick={impersonate} disabled={saving} className="px-4 py-2 rounded-xl bg-[#1b6aff] text-white">
                                    Impersonate
                                </button>

                                <button onClick={() => router.back()} className="px-3 py-2 rounded-lg bg-[#1b2a52] text-[#9cb0d7]">Back</button>
                            </div>

                            <div className="text-sm text-[#9cb0d7] mt-4">
                                <div>Account active: <strong className="text-[#e7eefc]">{String(user.active)}</strong></div>
                                <div>Created: <strong className="text-[#e7eefc]">{new Date(user.createdAt).toLocaleString()}</strong></div>
                                <div>Last updated: <strong className="text-[#e7eefc]">{new Date(user.updatedAt).toLocaleString()}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
