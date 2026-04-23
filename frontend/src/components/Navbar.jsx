"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useIsLoggedIn, useLogout } from "../services/auth";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState(null);
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

    useEffect(() => {
        if (typeof window === "undefined") return;

        try {
            const storedUser = localStorage.getItem("user");
            setUserRole(storedUser ? JSON.parse(storedUser)?.role ?? null : null);
        } catch {
            setUserRole(null);
        }
    }, [loggedIn]);

    return (
        <nav className="relative z-50 border-b border-[#24345d] bg-[#0c142d]/80 text-[#e7eefc] shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff6a00]/80 to-transparent"></div>

            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex justify-between items-center max-w-7xl mx-auto">

                <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                    <div className="rounded-2xl border border-[#273a69] bg-[#121d3d]/85 p-1.5 shadow-lg transition-all duration-300 group-hover:scale-105">
                        {/* <img
                            src="/logo.png"
                            alt="VYBE Logo"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xl"
                        /> */}
                    </div>
                    <span className="font-bold text-2xl sm:text-3xl bg-gradient-to-r from-[#ff6a00] via-[#ff9e1a] to-[#ff6a00] bg-clip-text text-transparent tracking-tight">
                        VYBE
                    </span>
                </Link>

                <div className="hidden lg:flex items-center gap-2">
                    <NavItem href="/" label="Home" />
                    {loggedIn && <NavItem href="/dashboard" label="Dashboard" />}
                    {loggedIn && userRole === "admin" && <NavItem href="/admin" label="Admin" />}

                    {loggedIn && (
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                className="rounded-full border border-[#2a3d6a] bg-[#162145] p-2 shadow-sm transition-all hover:bg-[#1c2a56]"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>

                            {profileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-[#2a3d6a] bg-[#121d3d]/95 shadow-2xl backdrop-blur-xl">
                                    <Link
                                        href="/profile"
                                        onClick={() => setProfileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 text-[#dfe8fb] transition-colors hover:bg-[#1b2a52]"
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
                                        className="flex w-full items-center gap-3 border-t border-[#2a3d6a] px-4 py-3 text-left text-[#ff9d76] transition-colors hover:bg-[#2a1730]"
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
                    className="rounded-lg border border-[#2a3d6a] bg-[#162145] p-2 text-[#dfe8fb] transition-colors hover:bg-[#1d2b56] lg:hidden"
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
                <div className="space-y-2 border-t border-[#2a3d6a] bg-[#101a37]/95 px-4 pb-4 backdrop-blur-xl">
                    <MobileLink href="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
                    {loggedIn && (
                        <MobileLink href="/dashboard" label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
                    )}
                    {loggedIn && userRole === "admin" && (
                        <MobileLink href="/admin" label="Admin" onClick={() => setMobileMenuOpen(false)} />
                    )}
                    <div className="my-2 border-t border-[#2e4574]"></div>

                    {loggedIn ? (
                        <>
                            <MobileLink href="/profile" label="My Account" onClick={() => setMobileMenuOpen(false)} icon="profile" />
                            <button
                                onClick={() => {
                                    logout();
                                    setMobileMenuOpen(false);
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium text-[#ff9d76] transition-all hover:bg-[#2a1730]"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <MobileLink href="/login" label="Login" />
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff6a00]/40 to-transparent"></div>
        </nav>
    );
}

/* ---------- Helper Components ---------- */

function NavItem({ href, label }) {
    return (
        <Link
            href={href}
            className="group relative block overflow-hidden rounded-xl px-4 py-2 font-medium text-[#dfe8fb] transition-all duration-300 hover:text-[#ff9e1a]"
        >
            <span className="absolute inset-0 rounded-xl bg-transparent transition-colors duration-300 group-hover:bg-[#1c2b56]"></span>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff6a00]/20 to-[#ff9e1a]/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="relative z-10">{label}</span>
            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
        </Link>
    );
}

function MobileLink({ href, label, onClick, icon }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-[#dfe8fb] transition-all hover:bg-[#1c2b56] hover:text-[#ff9e1a]"
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