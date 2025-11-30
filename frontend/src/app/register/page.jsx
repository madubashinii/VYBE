"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Register() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        weight: "",
        height: "",
        age: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                formData
            );
            localStorage.setItem("token", response.data.token);
            alert("Registration complete!");
            window.location.href = "/login";
        } catch (err) {
            console.log(err.response?.data || err.message);
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen sm:h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-0 relative overflow-hidden">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 bg-[#0d659d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-48 h-48 sm:w-64 sm:h-64 bg-[#0c4160] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-5 sm:p-6">

                    <div className="text-center mb-4 sm:mb-5">
                        <div className="inline-flex items-center justify-center">
                            <div className="p-1.5 sm:p-2 rounded-xl border-[#0d659d] transition-all duration-300">
                                <img
                                    src="/logo.png"
                                    alt="VYBE Logo"
                                    className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xl"
                                />
                            </div>
                        </div>
                        <h2 className="text-[#0c4160] text-xl sm:text-2xl font-bold mb-1">
                            {step === 1 ? "Create Account" : "Personal Info"}
                        </h2>
                        <p className="text-[#738fa7] text-xs">
                            {step === 1 ? "Join VYBE and start your fitness journey" : "Tell us more about yourself"}
                        </p>
                    </div>

                    {/* Account Info */}
                    {step === 1 && (
                        <div className="flex flex-col gap-2.5 sm:gap-3">

                            <div className="relative group">
                                <label className="block text-[#0c4160] text-xs font-semibold mb-1.5">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-[#738fa7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        className="w-full pl-10 pr-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

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
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        required
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
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create a strong password"
                                        required
                                        className="w-full pl-10 pr-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={() => setStep(2)}
                                className="relative group bg-gradient-to-r from-[#0d659d] to-[#0c4160] hover:from-[#0c4160] hover:to-[#0d659d] text-white py-2.5 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mt-1"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Next
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                            </button>

                        </div>
                    )}
                    {/* Personal Info */}
                    {step === 2 && (
                        <div className="flex flex-col gap-2.5 sm:gap-3">

                            <div className="relative group">
                                <label className="block text-[#0c4160] text-xs font-semibold mb-1.5">Weight (kg)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-[#738fa7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                        </svg>
                                    </div>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder="70"
                                        required
                                        className="w-full pl-10 pr-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="block text-[#0c4160] text-xs font-semibold mb-1.5">Height (cm)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-[#738fa7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                        </svg>
                                    </div>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="175"
                                        required
                                        className="w-full pl-10 pr-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="block text-[#0c4160] text-xs font-semibold mb-1.5">Age</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-4 h-4 text-[#738fa7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="25"
                                        required
                                        className="w-full pl-10 pr-3 py-2 text-sm bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-2 focus:ring-[#0d659d]/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="relative group bg-gradient-to-r from-[#0d659d] to-[#0c4160] hover:from-[#0c4160] hover:to-[#0d659d] text-white py-2.5 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mt-1"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Finish Registration
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                            </button>

                            <button
                                onClick={() => setStep(1)}
                                className="text-[#0d659d] hover:text-[#0c4160] font-semibold text-sm transition-colors"
                            >
                                ← Back to Account Info
                            </button>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="text-center mt-3 sm:mt-4">
                            <p className="text-[#738fa7] text-xs">
                                Already have an account?{" "}
                                <Link href="/login" className="text-[#0d659d] hover:text-[#0c4160] font-semibold transition-colors">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}