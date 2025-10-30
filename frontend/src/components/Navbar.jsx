"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="relative bg-gradient-to-r from-[#0c4160] via-[#0d659d] to-[#0c4160] text-white shadow-lg z-50">
            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#738fa7] to-transparent opacity-60"></div>

            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                    <div className="p-1.5 sm:p-2 rounded-xl border-[#0d659d] transition-all duration-300 group-hover:scale-110">
                        <img
                            src="/logo.png"
                            alt="VYBE Logo"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xl"
                        />
                    </div>
                    <span className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-[#c3ceda] to-white bg-clip-text text-transparent tracking-tight">
                        VYBE
                    </span>
                </Link>


                {/* Desktop Navigation Links */}
                <ul className="hidden lg:flex gap-2">
                    <NavItem href="/" label="Home" />
                    <NavItem href="/dashboard" label="Dashboard" />
                    <NavItem href="/logout" label="Logout" />
                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 pb-4 space-y-2 bg-[#0c4160]/50 backdrop-blur-sm">
                    <MobileLink href="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
                    <MobileLink href="/dashboard" label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
                    <MobileLink href="/logout" label="Logout" onClick={() => setMobileMenuOpen(false)} />
                </div>
            </div>

            {/* Subtle bottom shadow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#738fa7]/30 to-transparent"></div>
        </nav>
    );
}

/* ---------- Helper Components ---------- */

function NavItem({ href, label }) {
    return (
        <li>
            <Link
                href={href}
                className="relative block px-4 py-2 rounded-lg text-[#c3ceda] font-medium transition-all duration-300 hover:text-white group overflow-hidden"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-[#0d659d] to-[#738fa7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></span>
                <span className="relative z-10">{label}</span>
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#738fa7] to-[#c3ceda] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            </Link>
        </li>
    );
}

function MobileLink({ href, label, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block px-4 py-3 rounded-lg text-[#c3ceda] font-medium hover:bg-gradient-to-r hover:from-[#0d659d] hover:to-[#738fa7] hover:text-white transition-all"
        >
            {label}
        </Link>
    );
}
