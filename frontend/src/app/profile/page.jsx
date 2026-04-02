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

            const profileResponse = await api.put("/auth/profile", profileData, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            await api.put("/auth/profile/plan", {
                name: plan?.name || "My Plan",
                description: plan?.description || "",
                duration: plan?.duration ?? 4,
                goal: plan?.goal ?? "General Fitness",
                difficulty: plan?.difficulty ?? "Beginner",
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (profileResponse.data?.updated) {
                localStorage.setItem("user", JSON.stringify(profileResponse.data.updated));
                setProfileData({
                    name: profileResponse.data.updated.name ?? "",
                    email: profileResponse.data.updated.email ?? "",
                    age: profileResponse.data.updated.age ?? 0,
                    weight: profileResponse.data.updated.weight ?? 0,
                    height: profileResponse.data.updated.height ?? "",
                });
            }

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
        <div className="min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#e7eefc] hover:text-[#ff6a00] font-semibold mb-4">
                        ← Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#ff6a00] to-[#ff9e1a] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                            {profileData?.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-[#e7eefc] text-4xl font-bold mb-1">{profileData?.name}</h1>
                            <p className="text-[#9cb0d7] text-lg">{profileData?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-[#101a37]/90 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg mb-6 inline-flex gap-2 border border-[#2a3d6a]">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "profile"
                            ? "bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] text-white"
                            : "text-[#e7eefc] hover:bg-[#1b2a52]"
                            }`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab("preferences")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "preferences"
                            ? "bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] text-white"
                            : "text-[#e7eefc] hover:bg-[#1b2a52]"
                            }`}
                    >
                        Preferences
                    </button>
                    <button
                        onClick={() => setActiveTab("achievements")}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "achievements"
                            ? "bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] text-white"
                            : "text-[#e7eefc] hover:bg-[#1b2a52]"
                            }`}
                    >
                        Achievements
                    </button>
                </div>

                {activeTab === "profile" && (
                    <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 sm:p-8 border border-[#2a3d6a]">
                        <h2 className="text-[#e7eefc] text-2xl font-bold mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-[#e7eefc] text-sm font-semibold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={profileData?.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc] focus:border-[#ff6a00] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#e7eefc] text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profileData?.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc] focus:border-[#ff6a00] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#e7eefc] text-sm font-semibold mb-2">Age</label>
                                <input
                                    type="number"
                                    value={profileData?.age}
                                    onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc] focus:border-[#ff6a00] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#e7eefc] text-sm font-semibold mb-2">Weight (lbs)</label>
                                <input
                                    type="number"
                                    value={profileData?.weight}
                                    onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc] focus:border-[#ff6a00] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#e7eefc] text-sm font-semibold mb-2">Height</label>
                                <input
                                    type="text"
                                    value={profileData?.height}
                                    onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc] focus:border-[#ff6a00] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#e7eefc] text-sm font-semibold mb-2">Experience</label>
                                <select
                                    value={plan?.difficulty ?? "Beginner"}
                                    onChange={(e) => setPlan((current) => ({ ...(current ?? {}), difficulty: e.target.value }))}
                                    className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc] focus:border-[#ff6a00] outline-none"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-[#e7eefc] text-sm font-semibold mb-2">Fitness Goal</label>
                                <select
                                    value={plan?.goal ?? "General Fitness"}
                                    onChange={(e) => setPlan((current) => ({ ...(current ?? {}), goal: e.target.value }))}
                                    className="w-full px-4 py-3 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-xl text-[#e7eefc] focus:border-[#ff6a00] outline-none"
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
                            className="bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Save Changes
                        </button>
                    </div>
                )}

                {/* preferences*/}
                {activeTab === "preferences" && (
                    <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 sm:p-8 border border-[#2a3d6a]">
                        <h2 className="text-[#e7eefc] text-2xl font-bold mb-6">App Preferences</h2>
                        <div className="space-y-6 mb-6">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#2a3d6a]/10">
                                <div>
                                    <h3 className="text-[#e7eefc] font-bold mb-1">Measurement Units</h3>
                                    <p className="text-[#9cb0d7] text-sm">Imperial or Metric</p>
                                </div>
                                <select
                                    value={preferences?.units || "imperial"}
                                    onChange={(e) => setPreferences({ ...preferences, units: e.target.value })}
                                    className="px-4 py-2 bg-[#0b1228] border-2 border-[#2a3d6a] rounded-lg text-[#e7eefc] font-semibold focus:border-[#ff6a00] outline-none"
                                >
                                    <option value="imperial">Imperial</option>
                                    <option value="metric">Metric</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#2a3d6a]/10">
                                <div>
                                    <h3 className="text-[#e7eefc] font-bold mb-1">Push Notifications</h3>
                                    <p className="text-[#9cb0d7] text-sm">Workout reminders</p>
                                </div>
                                <button
                                    onClick={() => setPreferences({ ...preferences, notifications: !preferences.notifications })}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${preferences.notifications ? 'bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a]' : 'bg-gray-300'
                                        }`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-[#2a3d6a]/10">
                                <div>
                                    <h3 className="text-[#e7eefc] font-bold mb-1">Public Profile</h3>
                                    <p className="text-[#9cb0d7] text-sm">Let others view your profile</p>
                                </div>
                                <button
                                    onClick={() => setPreferences({ ...preferences, publicProfile: !preferences.publicProfile })}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${preferences.publicProfile ? 'bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a]' : 'bg-gray-300'
                                        }`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${preferences.publicProfile ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={handleSavePreferences}
                            className="bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Save Preferences
                        </button>
                    </div>
                )}

                {/* achievements*/}
                {activeTab === "achievements" && (
                    <div className="space-y-4">
                        <div className="bg-[#101a37]/90 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-[#2a3d6a] mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-[#e7eefc] text-2xl font-bold mb-1">Achievements 🏆</h2>
                                    <p className="text-[#9cb0d7]">
                                        Unlocked {achievements.filter(a => a.unlocked).length} of {achievements.length}
                                    </p>
                                </div>
                                <div className="text-4xl font-bold text-[#ff6a00]">
                                    {achievements.length > 0
                                        ? Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)
                                        : 0}%
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {achievements.map(achievement => (
                                <div
                                    key={achievement.id ?? achievement.title}
                                    className={`rounded-2xl shadow-lg p-6 border-2 ${achievement.unlocked
                                        ? 'bg-[#101a37]/90 border-[#ff6a00]/50'
                                        : 'bg-[#101a37]/60 border-[#2a3d6a]/30 opacity-60'
                                        }`}
                                >
                                    <div className="text-5xl mb-3">{achievement.icon}</div>
                                    <h3 className="text-[#e7eefc] text-lg font-bold mb-2">{achievement.title}</h3>
                                    <p className="text-[#9cb0d7] text-sm mb-3">{achievement.description}</p>

                                    {achievement.unlocked ? (
                                        <div className="text-green-600 text-sm font-semibold">
                                            ✓ Unlocked {achievement.date}
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="w-full bg-[#2a3d6a]/30 rounded-full h-2 mb-2">
                                                <div
                                                    className="bg-gradient-to-r from-[#ff6a00] to-[#ff9e1a] h-2 rounded-full"
                                                    style={{ width: `${achievement.total ? (achievement.progress / achievement.total) * 100 : 0}%` }}
                                                />
                                            </div>
                                            <p className="text-[#9cb0d7] text-xs font-semibold">
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