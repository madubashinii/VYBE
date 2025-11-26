// "use client";

// import Link from "next/link";
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const weeklyData = [
//     { day: "Mon", workouts: 2 },
//     { day: "Tue", workouts: 1 },
//     { day: "Wed", workouts: 3 },
//     { day: "Thu", workouts: 2 },
//     { day: "Fri", workouts: 4 },
//     { day: "Sat", workouts: 1 },
//     { day: "Sun", workouts: 2 }
// ];

// const monthlyData = [
//     { week: "W1", workouts: 8 },
//     { week: "W2", workouts: 12 },
//     { week: "W3", workouts: 10 },
//     { week: "W4", workouts: 15 }
// ];

// function Chart({ title, data, type = "line" }) {
//     return (
//         <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 group">
//             <h3 className="text-[#0c4160] text-xl font-bold mb-4 group-hover:text-[#0d659d] transition-colors">{title}</h3>
//             <ResponsiveContainer width="100%" height={200}>
//                 {type === "line" ? (
//                     <LineChart data={data}>
//                         <defs>
//                             <linearGradient id="colorWorkouts" x1="0" y1="0" x2="0" y2="1">
//                                 <stop offset="5%" stopColor="#0d659d" stopOpacity={0.3} />
//                                 <stop offset="95%" stopColor="#0d659d" stopOpacity={0} />
//                             </linearGradient>
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#c3ceda" opacity={0.3} />
//                         <XAxis dataKey={data[0]?.day ? "day" : "week"} stroke="#738fa7" />
//                         <YAxis stroke="#738fa7" />
//                         <Tooltip
//                             contentStyle={{
//                                 backgroundColor: "#0c4160",
//                                 border: "none",
//                                 borderRadius: "12px",
//                                 color: "#fff",
//                                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
//                             }}
//                         />
//                         <Line
//                             type="monotone"
//                             dataKey="workouts"
//                             stroke="#0d659d"
//                             strokeWidth={3}
//                             fill="url(#colorWorkouts)"
//                             dot={{ fill: "#0d659d", r: 6, strokeWidth: 2, stroke: "#fff" }}
//                             activeDot={{ r: 8, stroke: "#fff", strokeWidth: 3 }}
//                         />
//                     </LineChart>
//                 ) : (
//                     <BarChart data={data}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#c3ceda" opacity={0.3} />
//                         <XAxis dataKey={data[0]?.day ? "day" : "week"} stroke="#738fa7" />
//                         <YAxis stroke="#738fa7" />
//                         <Tooltip
//                             contentStyle={{
//                                 backgroundColor: "#0c4160",
//                                 border: "none",
//                                 borderRadius: "12px",
//                                 color: "#fff"
//                             }}
//                         />
//                         <Bar dataKey="workouts" fill="#0d659d" radius={[8, 8, 0, 0]} />
//                     </BarChart>
//                 )}
//             </ResponsiveContainer>
//         </div>
//     );
// }

// function WorkoutCard({ exercise, sets, reps, date }) {
//     return (
//         <div className="relative bg-gradient-to-br from-[#0c4160] via-[#0d659d] to-[#0c4160] rounded-2xl shadow-lg p-5 border border-[#738fa7]/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
//             {/* Animated background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

//             <div className="relative flex items-start justify-between">
//                 <div className="flex-1">
//                     <h3 className="text-white text-xl font-bold mb-3">{exercise}</h3>
//                     <div className="flex items-center gap-4 text-[#c3ceda]">
//                         <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                             </svg>
//                             <span className="font-semibold text-sm">{sets} sets</span>
//                         </span>
//                         <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                             </svg>
//                             <span className="font-semibold text-sm">{reps} reps</span>
//                         </span>
//                     </div>
//                 </div>
//                 <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2">
//                     <p className="text-white text-xs font-semibold">{date}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function ActionCard({ href, title, description, icon, gradient }) {
//     return (
//         <Link href={href} className="group">
//             <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
//                 {/* Animated gradient background on hover */}
//                 <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

//                 <div className="relative flex items-start gap-4">
//                     <div className={`bg-gradient-to-br ${gradient} p-3.5 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
//                         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
//                         </svg>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                         <h3 className="text-[#0c4160] text-lg font-bold mb-1 group-hover:text-[#0d659d] transition-colors">{title}</h3>
//                         <p className="text-[#738fa7] text-sm leading-relaxed">{description}</p>
//                     </div>
//                     <svg className="w-5 h-5 text-[#738fa7] group-hover:translate-x-1 group-hover:text-[#0d659d] transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                 </div>
//             </div>
//         </Link>
//     );
// }

// export default function Dashboard() {
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] relative overflow-hidden">
//             {/* Animated background blobs */}
//             <div className="absolute top-20 right-20 w-96 h-96 bg-[#0d659d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//             <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0c4160] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

//             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

//                 {/* Header with Welcome Message */}
//                 <div className="mb-8">
//                     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//                         <div>
//                             <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-3 shadow-lg">
//                                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                                 <span className="text-[#0c4160] text-sm font-semibold">You're on a 7-day streak! 🔥</span>
//                             </div>
//                             <h1 className="text-[#0c4160] text-4xl sm:text-5xl font-bold mb-2 leading-tight">Welcome Back, <span className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] bg-clip-text text-transparent">John</span>! 👋</h1>
//                             <p className="text-[#0c4160]/80 text-lg sm:text-xl">Ready to crush your fitness goals today?</p>
//                         </div>
//                         <div className="flex gap-3">
//                             <Link href="/workout/log" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                                 </svg>
//                                 Log Workout
//                             </Link>
//                             <Link href="/workout/history" className="inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm text-[#0c4160] px-6 py-3.5 rounded-2xl font-bold border-2 border-white/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 History
//                             </Link>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Overview - Bento Grid Style */}
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
//                     <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
//                         <div className="flex items-center gap-3 mb-3">
//                             <div className="bg-gradient-to-br from-[#0d659d] to-[#0c4160] p-3 rounded-xl shadow-lg">
//                                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                                 </svg>
//                             </div>
//                         </div>
//                         <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Total Workouts</p>
//                         <p className="text-[#0c4160] text-3xl font-bold">45</p>
//                         <p className="text-green-600 text-xs font-semibold mt-2">↑ 12% this month</p>
//                     </div>

//                     <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
//                         <div className="flex items-center gap-3 mb-3">
//                             <div className="bg-gradient-to-br from-[#0d659d] to-[#0c4160] p-3 rounded-xl shadow-lg">
//                                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                             </div>
//                         </div>
//                         <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Hours Trained</p>
//                         <p className="text-[#0c4160] text-3xl font-bold">32</p>
//                         <p className="text-green-600 text-xs font-semibold mt-2">↑ 8% this month</p>
//                     </div>

//                     <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
//                         <div className="flex items-center gap-3 mb-3">
//                             <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl shadow-lg">
//                                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
//                                 </svg>
//                             </div>
//                         </div>
//                         <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Current Streak</p>
//                         <p className="text-[#0c4160] text-3xl font-bold">7 Days 🔥</p>
//                         <p className="text-orange-600 text-xs font-semibold mt-2">Keep it up!</p>
//                     </div>

//                     <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
//                         <div className="flex items-center gap-3 mb-3">
//                             <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
//                                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                                 </svg>
//                             </div>
//                         </div>
//                         <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Global Rank</p>
//                         <p className="text-[#0c4160] text-3xl font-bold">#12</p>
//                         <p className="text-purple-600 text-xs font-semibold mt-2">Top 5% 🏆</p>
//                     </div>
//                 </div>

//                 {/* Quick Actions - Modern Card Grid */}
//                 <div className="mb-8">
//                     <h2 className="text-[#0c4160] text-2xl sm:text-3xl font-bold mb-5">Quick Actions</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <ActionCard
//                             href="/plans/create"
//                             title="Create Plan"
//                             description="Design your custom workout plan"
//                             icon="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                             gradient="from-blue-500 to-cyan-500"
//                         />
//                         <ActionCard
//                             href="/plans/browse"
//                             title="Browse Plans"
//                             description="Explore expert workout programs"
//                             icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                             gradient="from-purple-500 to-pink-500"
//                         />
//                         <ActionCard
//                             href="/progress"
//                             title="Track Progress"
//                             description="View your fitness improvements"
//                             icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                             gradient="from-green-500 to-emerald-500"
//                         />
//                         <ActionCard
//                             href="/reminders"
//                             title="Set Reminders"
//                             description="Never miss a workout session"
//                             icon="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                             gradient="from-orange-500 to-red-500"
//                         />
//                         <ActionCard
//                             href="/workout/history"
//                             title="Workout History"
//                             description="Review all past workouts"
//                             icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                             gradient="from-indigo-500 to-blue-500"
//                         />
//                         <ActionCard
//                             href="/profile"
//                             title="My Profile"
//                             description="Manage account & preferences"
//                             icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                             gradient="from-pink-500 to-rose-500"
//                         />
//                     </div>
//                 </div>

//                 {/* Charts - Side by Side */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
//                     <Chart title="Weekly Activity" data={weeklyData} type="line" />
//                     <Chart title="Monthly Overview" data={monthlyData} type="bar" />
//                 </div>

//                 {/* Recent Workouts */}
//                 <div>
//                     <div className="flex items-center justify-between mb-5">
//                         <h2 className="text-[#0c4160] text-2xl sm:text-3xl font-bold">Recent Workouts</h2>
//                         <Link href="/workout/history" className="text-[#0d659d] hover:text-[#0c4160] font-bold text-sm flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all">
//                             View All
//                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                             </svg>
//                         </Link>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <WorkoutCard exercise="Push Ups" sets={3} reps={15} date="Oct 7" />
//                         <WorkoutCard exercise="Squats" sets={4} reps={12} date="Oct 6" />
//                         <WorkoutCard exercise="Pull Ups" sets={3} reps={10} date="Oct 5" />
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }



// ====================

// "use client";

// import Link from "next/link";
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const weeklyData = [
//     { day: "Mon", workouts: 2 },
//     { day: "Tue", workouts: 1 },
//     { day: "Wed", workouts: 3 },
//     { day: "Thu", workouts: 2 },
//     { day: "Fri", workouts: 4 },
//     { day: "Sat", workouts: 1 },
//     { day: "Sun", workouts: 2 }
// ];

// const monthlyData = [
//     { week: "W1", workouts: 8 },
//     { week: "W2", workouts: 12 },
//     { week: "W3", workouts: 10 },
//     { week: "W4", workouts: 15 }
// ];

// function Chart({ title, data, type = "line" }) {
//     return (
//         <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-gray-900 text-lg font-semibold mb-4">{title}</h3>
//             <ResponsiveContainer width="100%" height={200}>
//                 {type === "line" ? (
//                     <LineChart data={data}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                         <XAxis dataKey={data[0]?.day ? "day" : "week"} stroke="#6b7280" />
//                         <YAxis stroke="#6b7280" />
//                         <Tooltip />
//                         <Line
//                             type="monotone"
//                             dataKey="workouts"
//                             stroke="#3b82f6"
//                             strokeWidth={2}
//                             dot={{ fill: "#3b82f6", r: 4 }}
//                         />
//                     </LineChart>
//                 ) : (
//                     <BarChart data={data}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
//                         <XAxis dataKey={data[0]?.day ? "day" : "week"} stroke="#6b7280" />
//                         <YAxis stroke="#6b7280" />
//                         <Tooltip />
//                         <Bar dataKey="workouts" fill="#3b82f6" />
//                     </BarChart>
//                 )}
//             </ResponsiveContainer>
//         </div>
//     );
// }

// function WorkoutCard({ exercise, sets, reps, date }) {
//     return (
//         <div className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow">
//             <div className="flex items-start justify-between mb-3">
//                 <h3 className="text-gray-900 text-lg font-semibold">{exercise}</h3>
//                 <span className="text-sm text-gray-500">{date}</span>
//             </div>
//             <div className="flex gap-4 text-sm text-gray-600">
//                 <span>{sets} sets</span>
//                 <span>{reps} reps</span>
//             </div>
//         </div>
//     );
// }

// function ActionCard({ href, title, description, icon }) {
//     return (
//         <Link href={href}>
//             <div className="bg-white rounded-lg shadow p-5 hover:shadow-md transition-shadow">
//                 <div className="flex items-start gap-3">
//                     <div className="bg-blue-100 p-2 rounded-lg">
//                         <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
//                         </svg>
//                     </div>
//                     <div className="flex-1">
//                         <h3 className="text-gray-900 font-semibold mb-1">{title}</h3>
//                         <p className="text-sm text-gray-600">{description}</p>
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     );
// }

// export default function Dashboard() {
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

//                 {/* Header */}
//                 <div className="mb-8">
//                     <h1 className="text-gray-900 text-3xl font-bold mb-2">Welcome Back, John!</h1>
//                     <p className="text-gray-600">Ready to crush your fitness goals today?</p>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//                     <div className="bg-white rounded-lg shadow p-5">
//                         <p className="text-gray-600 text-sm mb-1">Total Workouts</p>
//                         <p className="text-gray-900 text-2xl font-bold">45</p>
//                     </div>
//                     <div className="bg-white rounded-lg shadow p-5">
//                         <p className="text-gray-600 text-sm mb-1">Hours Trained</p>
//                         <p className="text-gray-900 text-2xl font-bold">32</p>
//                     </div>
//                     <div className="bg-white rounded-lg shadow p-5">
//                         <p className="text-gray-600 text-sm mb-1">Current Streak</p>
//                         <p className="text-gray-900 text-2xl font-bold">7 Days</p>
//                     </div>
//                     <div className="bg-white rounded-lg shadow p-5">
//                         <p className="text-gray-600 text-sm mb-1">Global Rank</p>
//                         <p className="text-gray-900 text-2xl font-bold">#12</p>
//                     </div>
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="mb-8">
//                     <h2 className="text-gray-900 text-xl font-bold mb-4">Quick Actions</h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <ActionCard
//                             href="/plans/create"
//                             title="Create Plan"
//                             description="Design your custom workout plan"
//                             icon="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                         />
//                         <ActionCard
//                             href="/plans/browse"
//                             title="Browse Plans"
//                             description="Explore expert workout programs"
//                             icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
//                         />
//                         <ActionCard
//                             href="/progress"
//                             title="Track Progress"
//                             description="View your fitness improvements"
//                             icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                         />
//                     </div>
//                 </div>

//                 {/* Charts */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                     <Chart title="Weekly Activity" data={weeklyData} type="line" />
//                     <Chart title="Monthly Overview" data={monthlyData} type="bar" />
//                 </div>

//                 {/* Recent Workouts */}
//                 <div>
//                     <div className="flex items-center justify-between mb-4">
//                         <h2 className="text-gray-900 text-xl font-bold">Recent Workouts</h2>
//                         <Link href="/workout/history" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
//                             View All →
//                         </Link>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <WorkoutCard exercise="Push Ups" sets={3} reps={15} date="Oct 7" />
//                         <WorkoutCard exercise="Squats" sets={4} reps={12} date="Oct 6" />
//                         <WorkoutCard exercise="Pull Ups" sets={3} reps={10} date="Oct 5" />
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }





"use client";

import Link from "next/link";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyData = [
    { day: "Mon", workouts: 2 },
    { day: "Tue", workouts: 1 },
    { day: "Wed", workouts: 3 },
    { day: "Thu", workouts: 2 },
    { day: "Fri", workouts: 4 },
    { day: "Sat", workouts: 1 },
    { day: "Sun", workouts: 2 }
];

const monthlyData = [
    { week: "W1", workouts: 8 },
    { week: "W2", workouts: 12 },
    { week: "W3", workouts: 10 },
    { week: "W4", workouts: 15 }
];

function Chart({ title, data, type = "line" }) {
    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-[#0c4160] text-xl font-bold mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={200}>
                {type === "line" ? (
                    <LineChart data={data}>
                        <defs>
                            <linearGradient id="colorWorkouts" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0d659d" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0d659d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#c3ceda" opacity={0.3} />
                        <XAxis dataKey={data[0]?.day ? "day" : "week"} stroke="#738fa7" />
                        <YAxis stroke="#738fa7" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0c4160",
                                border: "none",
                                borderRadius: "12px",
                                color: "#fff",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="workouts"
                            stroke="#0d659d"
                            strokeWidth={3}
                            fill="url(#colorWorkouts)"
                            dot={{ fill: "#0d659d", r: 6, strokeWidth: 2, stroke: "#fff" }}
                            activeDot={{ r: 8, stroke: "#fff", strokeWidth: 3 }}
                        />
                    </LineChart>
                ) : (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#c3ceda" opacity={0.3} />
                        <XAxis dataKey={data[0]?.day ? "day" : "week"} stroke="#738fa7" />
                        <YAxis stroke="#738fa7" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#0c4160",
                                border: "none",
                                borderRadius: "12px",
                                color: "#fff"
                            }}
                        />
                        <Bar dataKey="workouts" fill="#0d659d" radius={[8, 8, 0, 0]} />
                    </BarChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}

function WorkoutCard({ exercise, sets, reps, date }) {
    return (
        <div className="bg-gradient-to-br from-[#0c4160] via-[#0d659d] to-[#0c4160] rounded-2xl shadow-lg p-5 border border-[#738fa7]/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="text-white text-xl font-bold mb-3">{exercise}</h3>
                    <div className="flex items-center gap-4 text-[#c3ceda]">
                        <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                            <span className="font-semibold text-sm">{sets} sets</span>
                        </span>
                        <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                            <span className="font-semibold text-sm">{reps} reps</span>
                        </span>
                    </div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2">
                    <p className="text-white text-xs font-semibold">{date}</p>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-[#0c4160] text-4xl sm:text-5xl font-bold mb-2 leading-tight">
                                Welcome Back, <span className="bg-gradient-to-r from-[#0d659d] to-[#0c4160] bg-clip-text text-transparent">John</span>
                            </h1>
                            <p className="text-[#0c4160]/80 text-lg sm:text-xl">Ready to crush your fitness goals today?</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/workout/log" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white px-6 py-3.5 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                                Log Workout
                            </Link>
                            <Link href="/workout/history" className="inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm text-[#0c4160] px-6 py-3.5 rounded-2xl font-bold border-2 border-white/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                                History
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Total Workouts</p>
                        <p className="text-[#0c4160] text-3xl font-bold">45</p>
                        <p className="text-green-600 text-xs font-semibold mt-2">12% this month</p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Hours Trained</p>
                        <p className="text-[#0c4160] text-3xl font-bold">32</p>
                        <p className="text-green-600 text-xs font-semibold mt-2">8% this month</p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Current Streak</p>
                        <p className="text-[#0c4160] text-3xl font-bold">7 Days</p>
                        <p className="text-orange-600 text-xs font-semibold mt-2">Keep it up</p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <p className="text-[#738fa7] text-xs font-semibold uppercase tracking-wide mb-1">Global Rank</p>
                        <p className="text-[#0c4160] text-3xl font-bold">#12</p>
                        <p className="text-purple-600 text-xs font-semibold mt-2">Top 5%</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
                    <Chart title="Weekly Activity" data={weeklyData} type="line" />
                    <Chart title="Monthly Overview" data={monthlyData} type="bar" />
                </div>

                {/* Recent Workouts */}
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[#0c4160] text-2xl sm:text-3xl font-bold">Recent Workouts</h2>
                        <Link href="/workout/history" className="text-[#0d659d] hover:text-[#0c4160] font-bold text-sm flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all">
                            View All
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <WorkoutCard exercise="Push Ups" sets={3} reps={15} date="Oct 7" />
                        <WorkoutCard exercise="Squats" sets={4} reps={12} date="Oct 6" />
                        <WorkoutCard exercise="Pull Ups" sets={3} reps={10} date="Oct 5" />
                    </div>
                </div>

            </div>
        </div>
    );
}