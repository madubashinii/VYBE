"use client";

import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-[2rem] border border-[#2a3d6a] bg-[#0f1833]/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="text-center">
                    <div className="mb-4 text-5xl font-black text-[#ff6a00]">VYBE</div>
                    <h1 className="mb-2 text-3xl font-bold text-[#e7eefc]">Password reset</h1>
                    <p className="mb-8 text-sm leading-6 text-[#9cb0d7]">
                        Password recovery is not connected to a backend flow in this workspace yet. Use your current account password or return to the login screen.
                    </p>

                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105"
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
}