"use client";

import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login attempt", { email, password });
    };

    return (
        <div className="h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-64 h-64 bg-[#0d659d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#0c4160] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 max-w-md w-full">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6">
                    {/* Logo/Brand */}
                    <div className="text-center mb-5">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#0d659d] to-[#0c4160] rounded-xl mb-3 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4m0 0v8m0-8l4-4m0 12h4m0 0v-8m0 8l4 4m-4-12h4" />
                            </svg>
                        </div>
                        <h2 className="text-[#0c4160] text-2xl font-bold mb-1">Welcome Back</h2>
                        <p className="text-[#738fa7] text-xs">Log in to continue your fitness journey</p>
                    </div>

                    {/* Login Form */}
                    <div className="flex flex-col gap-3">
                        {/* Email Input */}
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

                        {/* Password Input */}
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

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center gap-1.5 cursor-pointer group">
                                <input type="checkbox" className="w-3.5 h-3.5 rounded border-2 border-[#738fa7] text-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/20 cursor-pointer" />
                                <span className="text-[#0c4160] group-hover:text-[#0d659d] transition-colors">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-[#0d659d] hover:text-[#0c4160] font-semibold transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
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

                    {/* Divider */}
                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#c3ceda]"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-3 bg-white text-[#738fa7] font-medium">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-white border border-[#c3ceda] hover:border-[#738fa7] rounded-lg font-medium text-[#0c4160] transition-all hover:shadow-md">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span>Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm bg-white border border-[#c3ceda] hover:border-[#738fa7] rounded-lg font-medium text-[#0c4160] transition-all hover:shadow-md">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                            </svg>
                            <span>GitHub</span>
                        </button>
                    </div>

                    {/* Sign Up Link */}
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