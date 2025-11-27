"use client";

import { useState } from "react";
import Link from "next/link";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");
    const [profileData, setProfileData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        age: "28",
        weight: "175",
        height: "5'10\"",
        goal: "Build Muscle",
        experience: "Intermediate"
    });

    const [preferences, setPreferences] = useState({
        units: "imperial",
        theme: "light",
        notifications: true,
        publicProfile: false,
        showStats: true
    });

    const achievements = [
        { id: 1, title: "First Workout", description: "Complete your first workout", icon: "🏆", unlocked: true, date: "Oct 1, 2025" },
        { id: 2, title: "7 Day Streak", description: "Maintain a 7-day workout streak", icon: "🔥", unlocked: true, date: "Oct 7, 2025" },
        { id: 3, title: "100 Workouts", description: "Complete 100 total workouts", icon: "💯", unlocked: false, progress: 45 },
        { id: 4, title: "PR Crusher", description: "Set 10 personal records", icon: "💪", unlocked: true, date: "Oct 15, 2025" },
        { id: 5, title: "Early Bird", description: "Complete 5 workouts before 7 AM", icon: "🌅", unlocked: false, progress: 2 },
        { id: 6, title: "Marathon", description: "Log 50+ hours of workouts", icon: "⏱️", unlocked: false, progress: 32 },
        { id: 7, title: "Diverse Trainer", description: "Complete all workout types", icon: "🎯", unlocked: true, date: "Oct 20, 2025" },
        { id: 8, title: "Social Butterfly", description: "Share 10 workouts", icon: "🦋", unlocked: false, progress: 6 }
    ];

    const stats = [
        { label: "Total Workouts", value: "45", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "from-blue-500 to-cyan-500" },
        { label: "Current Streak", value: "7 Days", icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z", color: "from-orange-500 to-red-500" },
        { label: "Total Hours", value: "32", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "from-purple-500 to-pink-500" },
        { label: "Calories Burned", value: "3,710", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "from-green-500 to-emerald-500" }
    ];

    const handleSaveProfile = () => {
        alert("Profile updated successfully!");
    };

    const handleSavePreferences = () => {
        alert("Preferences saved!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#0d659d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0c4160] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#0c4160] hover:text-[#0d659d] font-semibold mb-4 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex items-center gap-6">
                            {/* Profile Avatar */}
                            <div className="relative">
                                <div className="w-24 h-24 bg-gradient-to-br from-[#0d659d] to-[#0c4160] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                                    {profileData.name.charAt(0)}
                                </div>
                                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4 text-[#0d659d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <h1 className="text-[#0c4160] text-4xl font-bold mb-1">{profileData.name}</h1>
                                <p className="text-[#738fa7] text-lg mb-2">{profileData.email}</p>
                                <div className="flex gap-2">
                                    <span className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {profileData.experience}
                                    </span>
                                    <span className="bg-white/80 backdrop-blur-sm text-[#0c4160] px-3 py-1 rounded-full text-xs font-bold border border-[#c3ceda]">
                                        {profileData.goal}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/20 hover:shadow-xl hover:-translate-y-1 transition-all">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`bg-gradient-to-br ${stat.color} p-2 rounded-lg`}>
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">{stat.label}</p>
                            <p className="text-[#0c4160] text-2xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg mb-6 inline-flex gap-2">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "profile"
                            ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white shadow-lg"
                            : "text-[#0c4160] hover:bg-white"
                            }`}
                    >
                        Profile Info
                    </button>
                    <button
                        onClick={() => setActiveTab("preferences")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "preferences"
                            ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white shadow-lg"
                            : "text-[#0c4160] hover:bg-white"
                            }`}
                    >
                        Preferences
                    </button>
                    <button
                        onClick={() => setActiveTab("achievements")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "achievements"
                            ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white shadow-lg"
                            : "text-[#0c4160] hover:bg-white"
                            }`}
                    >
                        Achievements
                    </button>
                </div>

                {/* Profile Info Tab */}
                {activeTab === "profile" && (
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 sm:p-8 border border-white/20">
                        <h2 className="text-[#0c4160] text-2xl font-bold mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Age</label>
                                <input
                                    type="number"
                                    value={profileData.age}
                                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Weight (lbs)</label>
                                <input
                                    type="number"
                                    value={profileData.weight}
                                    onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Height</label>
                                <input
                                    type="text"
                                    value={profileData.height}
                                    onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Experience Level</label>
                                <select
                                    value={profileData.experience}
                                    onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Fitness Goal</label>
                                <select
                                    value={profileData.goal}
                                    onChange={(e) => setProfileData({ ...profileData, goal: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                >
                                    <option value="Build Muscle">Build Muscle</option>
                                    <option value="Lose Weight">Lose Weight</option>
                                    <option value="Increase Strength">Increase Strength</option>
                                    <option value="Improve Endurance">Improve Endurance</option>
                                    <option value="General Fitness">General Fitness</option>
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={handleSaveProfile}
                            className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                )}

                {/* Preferences Tab */}
                {activeTab === "preferences" && (
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 sm:p-8 border border-white/20">
                        <h2 className="text-[#0c4160] text-2xl font-bold mb-6">App Preferences</h2>
                        <div className="space-y-6 mb-6">
                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-[#c3ceda]/10 transition-colors">
                                <div>
                                    <h3 className="text-[#0c4160] font-bold mb-1">Measurement Units</h3>
                                    <p className="text-[#738fa7] text-sm">Choose between imperial and metric</p>
                                </div>
                                <select
                                    value={preferences.units}
                                    onChange={(e) => setPreferences({ ...preferences, units: e.target.value })}
                                    className="px-4 py-2 bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] font-semibold focus:border-[#0d659d] outline-none"
                                >
                                    <option value="imperial">Imperial</option>
                                    <option value="metric">Metric</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-[#c3ceda]/10 transition-colors">
                                <div>
                                    <h3 className="text-[#0c4160] font-bold mb-1">Push Notifications</h3>
                                    <p className="text-[#738fa7] text-sm">Receive workout reminders</p>
                                </div>
                                <button
                                    onClick={() => setPreferences({ ...preferences, notifications: !preferences.notifications })}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${preferences.notifications ? 'bg-gradient-to-r from-[#0d659d] to-[#0c4160]' : 'bg-gray-300'
                                        }`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-[#c3ceda]/10 transition-colors">
                                <div>
                                    <h3 className="text-[#0c4160] font-bold mb-1">Public Profile</h3>
                                    <p className="text-[#738fa7] text-sm">Let others view your profile</p>
                                </div>
                                <button
                                    onClick={() => setPreferences({ ...preferences, publicProfile: !preferences.publicProfile })}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${preferences.publicProfile ? 'bg-gradient-to-r from-[#0d659d] to-[#0c4160]' : 'bg-gray-300'
                                        }`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${preferences.publicProfile ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-[#c3ceda]/10 transition-colors">
                                <div>
                                    <h3 className="text-[#0c4160] font-bold mb-1">Show Stats on Dashboard</h3>
                                    <p className="text-[#738fa7] text-sm">Display detailed statistics</p>
                                </div>
                                <button
                                    onClick={() => setPreferences({ ...preferences, showStats: !preferences.showStats })}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${preferences.showStats ? 'bg-gradient-to-r from-[#0d659d] to-[#0c4160]' : 'bg-gray-300'
                                        }`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${preferences.showStats ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handleSavePreferences}
                            className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                            Save Preferences
                        </button>
                    </div>
                )}

                {/* Achievements Tab */}
                {activeTab === "achievements" && (
                    <div className="space-y-4">
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-[#0c4160] text-2xl font-bold mb-1">Achievements</h2>
                                    <p className="text-[#738fa7]">
                                        Unlocked {achievements.filter(a => a.unlocked).length} of {achievements.length}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#0d659d]">
                                        {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%
                                    </div>
                                    <div className="text-[#738fa7] text-sm">Complete</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {achievements.map(achievement => (
                                <div
                                    key={achievement.id}
                                    className={`rounded-2xl shadow-lg p-6 border-2 transition-all hover:scale-105 ${achievement.unlocked
                                        ? 'bg-gradient-to-br from-white to-[#c3ceda]/20 border-[#0d659d]/50'
                                        : 'bg-white/50 border-[#c3ceda]/30 opacity-60'
                                        }`}
                                >
                                    <div className="text-5xl mb-3">{achievement.icon}</div>
                                    <h3 className="text-[#0c4160] text-lg font-bold mb-2">{achievement.title}</h3>
                                    <p className="text-[#738fa7] text-sm mb-3">{achievement.description}</p>

                                    {achievement.unlocked ? (
                                        <div className="flex items-center gap-2 text-green-600">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm font-semibold">Unlocked {achievement.date}</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="w-full bg-[#c3ceda]/30 rounded-full h-2 mb-2">
                                                <div
                                                    className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] h-2 rounded-full transition-all"
                                                    style={{ width: `${(achievement.progress / (achievement.id === 3 ? 100 : achievement.id === 5 ? 5 : achievement.id === 6 ? 50 : 10)) * 100}%` }}
                                                />
                                            </div>
                                            <p className="text-[#738fa7] text-xs font-semibold">
                                                Progress: {achievement.progress}/{achievement.id === 3 ? 100 : achievement.id === 5 ? 5 : achievement.id === 6 ? 50 : 10}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}