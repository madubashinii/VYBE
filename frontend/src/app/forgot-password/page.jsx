"use client";

import { useState } from "react";
import Link from "next/link";
import api from "../../services/api";

export default function ForgotPassword() {
    const [step, setStep] = useState("request");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [issuedToken, setIssuedToken] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const requestReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await api.post("/auth/forgot-password", { email });
            setIssuedToken(res.data?.resetToken ?? "");
            setToken(res.data?.resetToken ?? "");
            setStep("reset");
            setMessage("Reset token generated. Use it below to set a new password.");
        } catch (err) {
            setMessage(err.response?.data?.message || "Unable to generate reset token.");
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            await api.post("/auth/reset-password", { email, token, password });
            setStep("done");
            setMessage("Password updated successfully. You can log in now.");
        } catch (err) {
            setMessage(err.response?.data?.message || "Unable to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-[2rem] border border-[#2a3d6a] bg-[#0f1833]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="text-center">
                    <div className="mb-4 text-5xl font-black text-[#ff6a00]">VYBE</div>
                    <h1 className="mb-2 text-3xl font-bold text-[#e7eefc]">Password reset</h1>
                    <p className="mb-6 text-sm leading-6 text-[#9cb0d7]">
                        Request a reset token, then use it to set a new password.
                    </p>

                    {message && (
                        <div className="mb-5 rounded-2xl border border-[#2a3d6a] bg-[#0b1228] px-4 py-3 text-left text-sm text-[#d7e3ff]">
                            {message}
                        </div>
                    )}

                    {step === "request" && (
                        <form className="space-y-4 text-left" onSubmit={requestReset}>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#e7eefc]">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border-2 border-[#2a3d6a] bg-[#0b1228] px-4 py-3 text-[#e7eefc] outline-none placeholder:text-[#8ea4ce]/60 focus:border-[#ff6a00]"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] disabled:opacity-60"
                            >
                                {loading ? "Generating..." : "Generate reset token"}
                            </button>
                        </form>
                    )}

                    {step === "reset" && (
                        <form className="space-y-4 text-left" onSubmit={resetPassword}>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[#e7eefc]">Reset token</label>
                                <input
                                    type="text"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    className="w-full rounded-xl border-2 border-[#2a3d6a] bg-[#0b1228] px-4 py-3 text-[#e7eefc] outline-none focus:border-[#ff6a00]"
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#e7eefc]">New password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-xl border-2 border-[#2a3d6a] bg-[#0b1228] px-4 py-3 text-[#e7eefc] outline-none focus:border-[#ff6a00]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-[#e7eefc]">Confirm</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full rounded-xl border-2 border-[#2a3d6a] bg-[#0b1228] px-4 py-3 text-[#e7eefc] outline-none focus:border-[#ff6a00]"
                                    />
                                </div>
                            </div>
                            {issuedToken && (
                                <div className="rounded-2xl border border-[#2a3d6a] bg-[#0b1228] px-4 py-3 text-xs text-[#9cb0d7]">
                                    Dev token: {issuedToken}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] disabled:opacity-60"
                            >
                                {loading ? "Updating..." : "Reset password"}
                            </button>
                        </form>
                    )}

                    {step === "done" && (
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105"
                        >
                            Back to login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}