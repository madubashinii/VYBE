"use client";

import Link from "next/link";

const features = [
    {
        title: "Workout Logging",
        desc: "Track every session with current and target values, dates, and calories in one place.",
    },
    {
        title: "Custom Plans",
        desc: "Build structured routines with sets, reps, and exercise split for each training day.",
    },
    {
        title: "Progress Analytics",
        desc: "Visualize consistency, trends, and personal records from your real saved data.",
    },
];

export default function Home() {
    return (
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-[#2a3d6a] bg-[#0f1833]/75 px-6 py-8 shadow-[0_32px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#ff6a00]/18 blur-3xl" />
                <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#ff9e1a]/12 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#1d2d57]/90 blur-3xl" />
            </div>

            <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-center gap-12 py-6 lg:gap-16">
                <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#324878] bg-[#121d3d]/90 px-4 py-2 text-sm font-semibold text-[#d7e3ff] shadow-lg">
                            <span className="h-2 w-2 rounded-full bg-[#ff6a00]" />
                            Dark mode performance theme
                        </div>

                        <div className="space-y-5">
                            <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-[#f4f7ff] sm:text-6xl lg:text-7xl">
                                Train in your
                                <span className="block bg-gradient-to-r from-[#ff6a00] via-[#ff9e1a] to-[#ff6a00] bg-clip-text text-transparent">
                                    own VYBE.
                                </span>
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-[#b9c8ea] sm:text-xl">
                                A full workout workspace with secure auth, progress tracking, custom plans, and clear history powered by your real backend data.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] px-6 py-4 text-base font-semibold text-[#120b05] shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                            >
                                Get Started
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center rounded-2xl border border-[#324878] bg-[#121d3d]/90 px-6 py-4 text-base font-semibold text-[#e7eefc] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[#ff6a00]/70"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-[#324878] bg-[#111a38]/90 p-6 text-[#ecf2ff] shadow-2xl sm:p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.22em] text-[#95a7cf]">Live Dashboard</p>
                                <h2 className="mt-2 text-2xl font-bold">All systems connected</h2>
                            </div>
                            <span className="rounded-xl bg-[#1d2d57] px-3 py-1.5 text-xs font-semibold text-[#ff9e1a]">Online</span>
                        </div>

                        <div className="mt-6 space-y-3">
                            {[
                                "Progress stats and weekly trends",
                                "Plans + exercises management",
                                "Workout history with filters",
                            ].map((item) => (
                                <div key={item} className="rounded-xl border border-[#2a3d6a] bg-[#0e1630] p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm text-[#c9d6f5]">{item}</p>
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6a00]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="grid gap-5 lg:grid-cols-3">
                    {features.map((feature) => (
                        <article key={feature.title} className="rounded-[1.6rem] border border-[#2a3d6a] bg-[#101a37]/90 p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1">
                            <div className="mb-4 h-1.5 w-14 rounded-full bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a]" />
                            <h3 className="text-2xl font-bold text-[#f1f6ff]">{feature.title}</h3>
                            <p className="mt-3 text-base leading-7 text-[#b6c6e8]">{feature.desc}</p>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    );
}
