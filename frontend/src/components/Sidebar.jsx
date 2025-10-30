// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Sidebar() {
//     const [isMobileOpen, setIsMobileOpen] = useState(false);

//     const links = [
//         { href: "/dashboard", label: "Overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
//         { href: "/workout/log", label: "Log Workout", icon: "M12 4v16m8-8H4" },
//         { href: "/workout/history", label: "Workout History", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
//         { href: "/plans/browse", label: "Browse Plans", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
//         { href: "/plans/create", label: "Create Plan", icon: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
//         { href: "/progress", label: "Progress", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
//         { href: "/reminders", label: "Reminders", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }
//     ];

//     return (
//         <>
//             {/* Mobile Toggle Button */}
//             <button
//                 onClick={() => setIsMobileOpen(!isMobileOpen)}
//                 className="lg:hidden fixed top-20 left-4 z-50 bg-gradient-to-br from-[#0d659d] to-[#0c4160] text-white p-2 rounded-lg shadow-lg"
//             >
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//             </button>

//             {/* Overlay for mobile */}
//             {isMobileOpen && (
//                 <div
//                     className="lg:hidden fixed inset-0 bg-black/50 z-30"
//                     onClick={() => setIsMobileOpen(false)}
//                 />
//             )}

//             {/* Sidebar */}
//             <aside className={`
//                 fixed lg:sticky top-0 left-0 h-screen
//                 bg-gradient-to-b from-[#0c4160] to-[#0d659d] text-white
//                 w-64 p-6 shadow-2xl z-40
//                 transform transition-transform duration-300 ease-in-out
//                 ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//             `}>
//                 <div className="flex items-center justify-between mb-8">
//                     <h2 className="text-[#c3ceda] text-xl font-bold">Quick Links</h2>
//                     <button
//                         onClick={() => setIsMobileOpen(false)}
//                         className="lg:hidden text-white"
//                     >
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         </svg>
//                     </button>
//                 </div>

//                 <ul className="flex flex-col gap-2">
//                     {links.map((link) => (
//                         <li key={link.href}>
//                             <Link
//                                 href={link.href}
//                                 onClick={() => setIsMobileOpen(false)}
//                                 className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#c3ceda] hover:bg-white/10 hover:text-white transition-all duration-200 group"
//                             >
//                                 <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
//                                 </svg>
//                                 <span className="font-medium">{link.label}</span>
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>

//                 {/* Stats Card */}
//                 <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4">
//                     <h3 className="text-[#c3ceda] text-sm font-semibold mb-3">This Week</h3>
//                     <div className="space-y-2">
//                         <div className="flex justify-between items-center">
//                             <span className="text-xs text-[#c3ceda]">Workouts</span>
//                             <span className="text-lg font-bold text-white">12</span>
//                         </div>
//                         <div className="flex justify-between items-center">
//                             <span className="text-xs text-[#c3ceda]">Streak</span>
//                             <span className="text-lg font-bold text-white">7 days</span>
//                         </div>
//                     </div>
//                 </div>
//             </aside>
//         </>
//     );
// }
