"use client";

import { useState } from "react";
import Link from "next/link";

export default function Reminders() {
    const [reminders, setReminders] = useState([
        { id: 1, title: "Morning Workout", time: "07:00", days: ["Mon", "Wed", "Fri"], enabled: true, type: "workout" },
        { id: 2, title: "Evening Cardio", time: "18:00", days: ["Tue", "Thu", "Sat"], enabled: true, type: "workout" },
        { id: 3, title: "Hydration Check", time: "12:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], enabled: false, type: "health" }
    ]);

    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        streakAlerts: true,
        prAlerts: true,
        weeklyReport: false,
        motivationalQuotes: true
    });

    const [showAddModal, setShowAddModal] = useState(false);
    const [newReminder, setNewReminder] = useState({
        title: "",
        time: "09:00",
        days: [],
        type: "workout"
    });

    const toggleReminder = (id) => {
        setReminders(reminders.map(r =>
            r.id === id ? { ...r, enabled: !r.enabled } : r
        ));
    };

    const deleteReminder = (id) => {
        setReminders(reminders.filter(r => r.id !== id));
    };

    const toggleNotification = (key) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    const toggleDay = (day) => {
        setNewReminder({
            ...newReminder,
            days: newReminder.days.includes(day)
                ? newReminder.days.filter(d => d !== day)
                : [...newReminder.days, day]
        });
    };

    const addReminder = () => {
        if (newReminder.title && newReminder.days.length > 0) {
            setReminders([...reminders, { ...newReminder, id: Date.now(), enabled: true }]);
            setNewReminder({ title: "", time: "09:00", days: [], type: "workout" });
            setShowAddModal(false);
        }
    };

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const getReminderIcon = (type) => {
        switch (type) {
            case "workout":
                return "M13 10V3L4 14h7v7l9-11h-7z";
            case "health":
                return "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z";
            case "meal":
                return "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z";
            default:
                return "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9";
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case "workout": return "from-blue-500 to-cyan-500";
            case "health": return "from-pink-500 to-rose-500";
            case "meal": return "from-green-500 to-emerald-500";
            default: return "from-purple-500 to-indigo-500";
        }
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
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-[#0c4160] text-4xl sm:text-5xl font-bold mb-2">Reminders ⏰</h1>
                            <p className="text-[#0c4160]/70 text-lg">Never miss a workout or important milestone</p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Reminder
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Active Reminders */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
                            <h2 className="text-[#0c4160] text-2xl font-bold mb-5 flex items-center gap-2">
                                <div className="bg-gradient-to-br from-[#0d659d] to-[#0c4160] p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                Active Reminders
                            </h2>

                            <div className="space-y-4">
                                {reminders.map(reminder => (
                                    <div key={reminder.id} className={`rounded-xl border-2 p-4 transition-all ${reminder.enabled ? 'bg-white border-[#c3ceda]/50' : 'bg-gray-100 border-gray-300 opacity-60'}`}>
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className={`bg-gradient-to-br ${getTypeColor(reminder.type)} p-2.5 rounded-lg`}>
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getReminderIcon(reminder.type)} />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-[#0c4160] font-bold text-lg mb-1">{reminder.title}</h3>
                                                    <p className="text-[#738fa7] text-sm font-semibold mb-2">{reminder.time}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {reminder.days.map(day => (
                                                            <span key={day} className="bg-[#0d659d]/10 text-[#0d659d] px-2 py-1 rounded-lg text-xs font-bold">
                                                                {day}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleReminder(reminder.id)}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${reminder.enabled ? 'bg-gradient-to-r from-[#0d659d] to-[#0c4160]' : 'bg-gray-300'
                                                        }`}
                                                >
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${reminder.enabled ? 'translate-x-6' : 'translate-x-1'
                                                        }`} />
                                                </button>
                                                <button
                                                    onClick={() => deleteReminder(reminder.id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {reminders.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">⏰</div>
                                        <p className="text-[#738fa7] text-lg mb-4">No reminders set yet</p>
                                        <button
                                            onClick={() => setShowAddModal(true)}
                                            className="text-[#0d659d] hover:text-[#0c4160] font-semibold"
                                        >
                                            Create your first reminder
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="space-y-6">
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
                            <h2 className="text-[#0c4160] text-xl font-bold mb-5 flex items-center gap-2">
                                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                Notification Settings
                            </h2>

                            <div className="space-y-4">
                                {[
                                    { key: "email", label: "Email Notifications", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                                    { key: "push", label: "Push Notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
                                    { key: "streakAlerts", label: "Streak Alerts", icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
                                    { key: "prAlerts", label: "Personal Record Alerts", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
                                    { key: "weeklyReport", label: "Weekly Report", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
                                    { key: "motivationalQuotes", label: "Motivational Quotes", icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" }
                                ].map(setting => (
                                    <div key={setting.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#c3ceda]/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-[#0d659d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={setting.icon} />
                                            </svg>
                                            <span className="text-[#0c4160] font-medium text-sm">{setting.label}</span>
                                        </div>
                                        <button
                                            onClick={() => toggleNotification(setting.key)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications[setting.key] ? 'bg-gradient-to-r from-[#0d659d] to-[#0c4160]' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications[setting.key] ? 'translate-x-6' : 'translate-x-1'
                                                }`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-br from-[#0d659d] to-[#0c4160] rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-lg font-bold mb-4">This Week</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#c3ceda] text-sm">Active Reminders</span>
                                    <span className="text-2xl font-bold">{reminders.filter(r => r.enabled).length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#c3ceda] text-sm">Notifications Sent</span>
                                    <span className="text-2xl font-bold">24</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#c3ceda] text-sm">Completion Rate</span>
                                    <span className="text-2xl font-bold">87%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Add Reminder Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[#0c4160] text-2xl font-bold">Add New Reminder</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-[#738fa7] hover:text-[#0c4160]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Reminder Title</label>
                                <input
                                    type="text"
                                    value={newReminder.title}
                                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                                    placeholder="e.g., Morning Workout"
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Time</label>
                                <input
                                    type="time"
                                    value={newReminder.time}
                                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Type</label>
                                <select
                                    value={newReminder.type}
                                    onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                >
                                    <option value="workout">Workout</option>
                                    <option value="health">Health Check</option>
                                    <option value="meal">Meal</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[#0c4160] text-sm font-semibold mb-2">Repeat on</label>
                                <div className="flex flex-wrap gap-2">
                                    {weekDays.map(day => (
                                        <button
                                            key={day}
                                            onClick={() => toggleDay(day)}
                                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${newReminder.days.includes(day)
                                                ? 'bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white'
                                                : 'bg-[#c3ceda]/20 text-[#0c4160] hover:bg-[#c3ceda]/40'
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={addReminder}
                                    className="flex-1 bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                                >
                                    Add Reminder
                                </button>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="px-6 py-3 bg-gray-200 text-[#0c4160] rounded-xl font-bold hover:bg-gray-300 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}