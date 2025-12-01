"use client";

import { useState, useEffect } from "react";
import api from "../../services/api";
import Link from "next/link";

export default function Profile() {
    const [activeTab, setActiveTab] = useState("profile");
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        age: 0,
        weight: 0,
        height: 0
    });
    const [preferences, setPreferences] = useState({
        units: "imperial",
        notifications: true,
        publicProfile: true,
    });

    const [achievements, setAchievements] = useState([]);
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const res = await api.get("/auth/profile", {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                const { profile, preferences, achievements, plan } = res.data;

                setProfileData(profile);
                setPreferences(preferences);
                setAchievements(achievements);
                setPlan(plan);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
            }
        };

        fetchProfile();
    }, []);

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await api.put("/auth/profile", profileData, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Failed to update profile:", err);
            alert("Failed to update profile.");
        }
    };

    const handleSavePreferences = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await api.put("/auth/preferences", preferences, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            alert("Preferences saved successfully!");
        } catch (err) {
            console.error("Failed to update preferences:", err);
            alert("Failed to save preferences.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#0c4160] hover:text-[#0d659d] font-semibold mb-4">
                        ← Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#0d659d] to-[#0c4160] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                            {profileData?.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-[#0c4160] text-4xl font-bold mb-1">{profileData?.name}</h1>
                            <p className="text-[#738fa7] text-lg">{profileData?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg mb-6 inline-flex gap-2">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "profile"
                            ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white"
                            : "text-[#0c4160] hover:bg-white"
                            }`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("preferences")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "preferences"
                            ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white"
                            : "text-[#0c4160] hover:bg-white"
                            }`}
                    >
                        Preferences
                    </button>
                    <button
                        onClick={() => setActiveTab("achievements")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "achievements"
                            ? "bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white"
                            : "text-[#0c4160] hover:bg-white"
                            }`}
                    >
                        Achievements
                    </button>
                </div>

                {activeTab === "profile" && (
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 sm:p-8 border border-white/20">
                        <h2 className="text-[#0c4160] text-2xl font-bold mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={profileData?.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profileData?.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Age</label>
                                <input
                                    type="number"
                                    value={profileData?.age}
                                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Weight (lbs)</label>
                                <input
                                    type="number"
                                    value={profileData?.weight}
                                    onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Height</label>
                                <input
                                    type="text"
                                    value={profileData?.height}
                                    onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Experience</label>
                                <select
                                    value={plan?.difficulty ?? "Beginner"}
                                    onChange={(e) => setPlan({ ...plan, difficulty: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Fitness Goal</label>
                                <select
                                    value={plan?.goal ?? "General Fitness"}
                                    onChange={(e) => setPlan({ ...plan, goal: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] outline-none"
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
                            className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                )}

                {/* preferences*/}
                {activeTab === "preferences" && (
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 sm:p-8 border border-white/20">
                        <h2 className="text-[#0c4160] text-2xl font-bold mb-6">App Preferences</h2>
                        <div className="space-y-6 mb-6">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#c3ceda]/10">
                                <div>
                                    <h3 className="text-[#0c4160] font-bold mb-1">Measurement Units</h3>
                                    <p className="text-[#738fa7] text-sm">Imperial or Metric</p>
                                </div>
                                <select
                                    value={preferences?.units || "imperial"}
                                    onChange={(e) => setPreferences({ ...preferences, units: e.target.value })}
                                    className="px-4 py-2 bg-white border-2 border-[#c3ceda] rounded-lg text-[#0c4160] font-semibold focus:border-[#0d659d] outline-none"
                                >
                                    <option value="imperial">Imperial</option>
                                    <option value="metric">Metric</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#c3ceda]/10">
                                <div>
                                    <h3 className="text-[#0c4160] font-bold mb-1">Push Notifications</h3>
                                    <p className="text-[#738fa7] text-sm">Workout reminders</p>
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

                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#c3ceda]/10">
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
                        </div>
                        <button
                            onClick={handleSavePreferences}
                            className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Save Preferences
                        </button>
                    </div>
                )}

                {/* achievements*/}
                {activeTab === "achievements" && (
                    <div className="space-y-4">
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-[#0c4160] text-2xl font-bold mb-1">Achievements 🏆</h2>
                                    <p className="text-[#738fa7]">
                                        Unlocked {achievements.filter(a => a.unlocked).length} of {achievements.length}
                                    </p>
                                </div>
                                <div className="text-4xl font-bold text-[#0d659d]">
                                    {achievements.length > 0
                                        ? Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)
                                        : 0}%
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {achievements.map(achievement => (
                                <div
                                    key={achievement.id}
                                    className={`rounded-2xl shadow-lg p-6 border-2 ${achievement.unlocked
                                        ? 'bg-white border-[#0d659d]/50'
                                        : 'bg-white/50 border-[#c3ceda]/30 opacity-60'
                                        }`}
                                >
                                    <div className="text-5xl mb-3">{achievement.icon}</div>
                                    <h3 className="text-[#0c4160] text-lg font-bold mb-2">{achievement.title}</h3>
                                    <p className="text-[#738fa7] text-sm mb-3">{achievement.description}</p>

                                    {achievement.unlocked ? (
                                        <div className="text-green-600 text-sm font-semibold">
                                            ✓ Unlocked {achievement.date}
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="w-full bg-[#c3ceda]/30 rounded-full h-2 mb-2">
                                                <div
                                                    className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] h-2 rounded-full"
                                                    style={{ width: `${achievement.total ? (achievement.progress / achievement.total) * 100 : 0}%` }}
                                                />
                                            </div>
                                            <p className="text-[#738fa7] text-xs font-semibold">
                                                {achievement.progress}/{achievement.total}
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