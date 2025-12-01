"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useIsLoggedIn, useLogout } from "../services/auth";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const loggedIn = useIsLoggedIn();
    const logout = useLogout();


    // Close profile menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="relative bg-gradient-to-r from-[#0c4160] via-[#0d659d] to-[#0c4160] text-white shadow-lg z-50">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#738fa7] to-transparent opacity-60"></div>

            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex justify-between items-center max-w-7xl mx-auto">

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

                <div className="hidden lg:flex items-center gap-2">
                    <NavItem href="/" label="Home" />
                    {loggedIn && <NavItem href="/dashboard" label="Dashboard" />}

                    {loggedIn && (
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>

                            {profileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#c3ceda]/30 overflow-hidden">
                                    <Link
                                        href="/profile"
                                        onClick={() => setProfileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-[#0c4160] hover:bg-[#c3ceda]/20 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="font-medium">My Account</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setProfileMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 transition-colors border-t border-[#c3ceda]/30"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                </div>

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
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 pb-4 space-y-2 bg-[#0c4160]/50 backdrop-blur-sm">
                    <MobileLink href="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
                    {loggedIn && (
                        <MobileLink href="/dashboard" label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
                    )}
                    <div className="border-t border-[#738fa7]/30 my-2"></div>

                    {loggedIn ? (
                        <>
                            <MobileLink href="/profile" label="My Account" onClick={() => setMobileMenuOpen(false)} icon="profile" />
                            <button
                                onClick={() => {
                                    logout();
                                    setMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 font-medium hover:bg-red-50 transition-all w-full text-left"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <MobileLink href="/auth/login" label="Login" />
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#738fa7]/30 to-transparent"></div>
        </nav>
    );
}

/* ---------- Helper Components ---------- */

function NavItem({ href, label }) {
    return (
        <Link
            href={href}
            className="relative block px-4 py-2 rounded-lg text-[#c3ceda] font-medium transition-all duration-300 hover:text-white group overflow-hidden"
        >
            <span className="absolute inset-0 bg-gradient-to-r from-[#0d659d] to-[#738fa7] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300"></span>
            <span className="relative z-10">{label}</span>
            <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#738fa7] to-[#c3ceda] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
        </Link>
    );
}

function MobileLink({ href, label, onClick, icon }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#c3ceda] font-medium hover:bg-gradient-to-r hover:from-[#0d659d] hover:to-[#738fa7] hover:text-white transition-all"
        >
            {icon === "profile" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            )}
            {icon === "logout" && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            )}
            <span>{label}</span>
        </Link>
    );
}