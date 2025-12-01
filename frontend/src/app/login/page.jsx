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
        <div className="h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] flex items-center justify-center px-6 relative overflow-hidden">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-64 h-64 bg-[#0d659d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#0c4160] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            </div>

            <div className="relative z-10 max-w-md w-full">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6">

                    <div className="text-center mb-5">
                        <div className="inline-flex items-center justify-center ">
                            <div className="p-1.5 sm:p-2 rounded-xl border-[#0d659d] transition-all duration-300 group-hover:scale-110">
                                <img
                                    src="/logo.png"
                                    alt="VYBE Logo"
                                    className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xl"
                                />
                            </div>
                        </div>
                        <h2 className="text-[#0c4160] text-2xl font-bold mb-1">Welcome Back</h2>
                        <p className="text-[#738fa7] text-xs">Log in to continue your fitness journey</p>
                    </div>

                    {/* Login Form */}
                    <div className="flex flex-col gap-3">

                        <div className="relative group">
                            <label className="block text-[#0c4160] text-xs font-semibold mb-1.5">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-[#738fa7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="block text-[#0c4160] text-xs font-semibold mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-4 h-4 text-[#738fa7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-1.5 cursor-pointer group">
                                <input type="checkbox" className="w-3.5 h-3.5 rounded border-2 border-[#738fa7] text-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/20 cursor-pointer" />
                                <span className="text-[#0c4160] group-hover:text-[#0d659d] transition-colors">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-[#0d659d] hover:text-[#0c4160] font-semibold transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="relative group bg-gradient-to-r from-[#0d659d] to-[#0c4160] hover:from-[#0c4160] hover:to-[#0d659d] text-white py-2.5 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mt-1"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Log In
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-[#738fa7] text-xs">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-[#0d659d] hover:text-[#0c4160] font-semibold transition-colors">
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}