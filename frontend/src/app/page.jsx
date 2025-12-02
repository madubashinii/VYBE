"use client";

import Link from "next/link";

export default function Home() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] overflow-hidden">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#0d659d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#0c4160] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#738fa7] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">

                <section className="text-center max-w-3xl py-20">

                    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-8 animate-bounce">
                        <span className="w-2 h-2 bg-gradient-to-r from-[#0d659d] to-[#738fa7] rounded-full animate-pulse"></span>
                        <span className="text-[#0c4160] text-sm font-semibold">Your Fitness Journey Starts Here</span>
                    </div>

                    <h1 className="text-[#0c4160] text-6xl md:text-7xl font-bold mb-6 leading-tight">
                        Welcome to{" "}
                        <span className="bg-gradient-to-r from-[#0d659d] via-[#0c4160] to-[#0d659d] bg-clip-text text-transparent animate-gradient">
                            VYBE
                        </span>
                    </h1>

                    <p className="text-[#0c4160] text-xl md:text-2xl mb-12 leading-relaxed font-medium">
                        Track your workouts, build streaks, and reach your fitness goals with our smart workout tracker.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="group relative bg-gradient-to-r from-[#0d659d] to-[#0c4160] hover:from-[#0c4160] hover:to-[#0d659d] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Get Started
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                        </Link>

                        <Link
                            href="/login"
                            className="group relative bg-white/90 backdrop-blur-sm border-2 border-[#0d659d] text-[#0d659d] hover:bg-[#0d659d] hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Log In
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </section>


                <section className="max-w-6xl py-16 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0d659d] to-[#738fa7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                            <div className="bg-gradient-to-br from-[#0d659d] to-[#0c4160] w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>

                            <h3 className="text-[#0c4160] text-2xl font-bold mb-3">Track Workouts</h3>
                            <p className="text-[#0c4160]/80 text-base leading-relaxed">Log every set and rep with ease. Our intuitive interface makes tracking effortless.</p>
                        </div>


                        <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0d659d] to-[#738fa7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                            <div className="bg-gradient-to-br from-[#0d659d] to-[#0c4160] w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>

                            <h3 className="text-[#0c4160] text-2xl font-bold mb-3">Analyze Progress</h3>
                            <p className="text-[#0c4160]/80 text-base leading-relaxed">View trends, charts, and personal bests. Data-driven insights for smarter training.</p>
                        </div>


                        <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0d659d] to-[#738fa7] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                            <div className="bg-gradient-to-br from-[#0d659d] to-[#0c4160] w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>

                            <h3 className="text-[#0c4160] text-2xl font-bold mb-3">Stay Motivated</h3>
                            <p className="text-[#0c4160]/80 text-base leading-relaxed">Set reminders, build streaks, and compete on leaderboards. Keep pushing forward!</p>
                        </div>
                    </div>
                </section>


                <section className="max-w-4xl py-12 grid grid-cols-3 gap-8 text-center">
                    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                        <div className="text-4xl font-bold text-[#0d659d] mb-2">10K+</div>
                        <div className="text-[#0c4160] font-medium">Active Users</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                        <div className="text-4xl font-bold text-[#0d659d] mb-2">500K+</div>
                        <div className="text-[#0c4160] font-medium">Workouts Logged</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                        <div className="text-4xl font-bold text-[#0d659d] mb-2">95%</div>
                        <div className="text-[#0c4160] font-medium">Satisfaction Rate</div>
                    </div>
                </section>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% auto;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
}