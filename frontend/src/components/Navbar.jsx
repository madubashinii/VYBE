"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="relative bg-gradient-to-r from-[#0c4160] via-[#0d659d] to-[#0c4160] text-white shadow-lg">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#738fa7] to-transparent opacity-60"></div>

            <div className="px-8 py-5 flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-gradient-to-br from-[#0d659d] to-[#738fa7] p-2 rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-110">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4m0 0v8m0-8l4-4m0 12h4m0 0v-8m0 8l4 4m-4-12h4" />
                        </svg>
                    </div>
                    <span className="font-bold text-3xl bg-gradient-to-r from-[#c3ceda] to-white bg-clip-text text-transparent tracking-tight">
                        VYBE
                    </span>
                </Link>

                {/* Navigation Links */}
                <ul className="flex gap-2">
                    <li>
                        <Link
                            href="/"
                            className="relative block px-4 py-2 rounded-lg text-[#c3ceda] font-medium transition-all duration-300 hover:text-white group overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#0d659d] to-[#738fa7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></span>
                            <span className="relative z-10">Home</span>
                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#738fa7] to-[#c3ceda] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard"
                            className="relative block px-4 py-2 rounded-lg text-[#c3ceda] font-medium transition-all duration-300 hover:text-white group overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#0d659d] to-[#738fa7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></span>
                            <span className="relative z-10">Dashboard</span>
                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#738fa7] to-[#c3ceda] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/workout/log"
                            className="relative block px-4 py-2 rounded-lg text-[#c3ceda] font-medium transition-all duration-300 hover:text-white group overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#0d659d] to-[#738fa7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></span>
                            <span className="relative z-10">Log Workout</span>
                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#738fa7] to-[#c3ceda] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/plans/browse"
                            className="relative block px-4 py-2 rounded-lg text-[#c3ceda] font-medium transition-all duration-300 hover:text-white group overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#0d659d] to-[#738fa7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></span>
                            <span className="relative z-10">Plans</span>
                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#738fa7] to-[#c3ceda] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/progress"
                            className="relative block px-4 py-2 rounded-lg text-[#c3ceda] font-medium transition-all duration-300 hover:text-white group overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#0d659d] to-[#738fa7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></span>
                            <span className="relative z-10">Progress</span>
                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#738fa7] to-[#c3ceda] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/profile"
                            className="relative block px-4 py-2 rounded-lg text-[#c3ceda] font-medium transition-all duration-300 hover:text-white group overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#0d659d] to-[#738fa7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></span>
                            <span className="relative z-10">Profile</span>
                            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#738fa7] to-[#c3ceda] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Subtle bottom shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#738fa7]/30 to-transparent"></div>
        </nav>
    );
}