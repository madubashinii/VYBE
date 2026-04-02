"use client";

import Link from "next/link";
import { useState } from "react";
import api from "../../services/api";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password });
            console.log("Login success:", response.data);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert("Login successful!");
            router.push("/dashboard");
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] flex items-center justify-center px-6 relative overflow-hidden">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-64 h-64 bg-[#ff6a00] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#1d2d57] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            </div>

            <div className="relative z-10 max-w-md w-full">
                <div className="bg-[#0f1833]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_24px_80px_rgba(0,0,0,0.45)] p-6 border border-[#2a3d6a]">

                    <div className="text-center mb-5">
                        <div className="inline-flex items-center justify-center ">
                            <div className="p-1.5 sm:p-2 rounded-xl border border-white/70 bg-white/70 shadow-md transition-all duration-300 group-hover:scale-110">
                                <img
                                    src="/logo.png"
                                    alt="VYBE Logo"
                                    className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xl"
                                />
                            </div>
                        </div>
                        <h2 className="text-[#f2f7ff] text-2xl font-bold mb-1">Welcome Back</h2>
                        <p className="text-[#9cb0d7] text-xs">Log in to continue your fitness journey</p>
                    </div>

                    {/* Login Form */}
                    <div className="flex flex-col gap-3">

                        <div className="relative group">
                            <label className="block text-[#d9e5ff] text-xs font-semibold mb-1.5">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-[#8ea4ce]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-3 py-2 text-sm bg-[#0b1228] border-2 border-[#2a3d6a] rounded-lg text-[#e7eefc] placeholder-[#8ea4ce]/60 focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-[#d9e5ff] text-xs font-semibold mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-[#8ea4ce]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-3 py-2 text-sm bg-[#0b1228] border-2 border-[#2a3d6a] rounded-lg text-[#e7eefc] placeholder-[#8ea4ce]/60 focus:border-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-1.5 cursor-pointer group">
                                <input type="checkbox" className="w-3.5 h-3.5 rounded border-2 border-[#49618f] text-[#ff6a00] focus:ring-2 focus:ring-[#ff6a00]/20 cursor-pointer" />
                                <span className="text-[#d9e5ff] group-hover:text-[#ff9e1a] transition-colors">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-[#ff9e1a] hover:text-[#ff6a00] font-semibold transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="relative group mt-1 overflow-hidden rounded-2xl bg-gradient-to-r from-[#ff6a00] via-[#ff9e1a] to-[#ff6a00] py-3 text-sm font-semibold text-[#130b05] shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Log In
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <span className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10"></span>
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-[#9cb0d7] text-xs">
                            Don't have an account?{" "}
                            <Link href="/register" className="font-semibold text-[#ff9e1a] transition-colors hover:text-[#ff6a00]">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}