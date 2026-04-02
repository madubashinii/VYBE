import "../app/globals.css";

import Navbar from "../components/Navbar";
import { Manrope, Space_Grotesk } from "next/font/google";

const bodyFont = Manrope({
    subsets: ["latin"],
    variable: "--font-body",
});

const displayFont = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-display",
});

export const metadata = {
    title: "VYBE",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${bodyFont.variable} ${displayFont.variable} min-h-screen bg-gradient-to-br from-[#070b1a] via-[#0b132b] to-[#111b38] text-[#e7eefc] font-sans`}>
                <Navbar />
                <main className="flex flex-col p-4">{children}</main>
                <footer className="mx-4 mb-4 rounded-2xl border border-[#24345d] bg-[#0f1833]/70 py-4 text-center text-sm text-[#b7c6e6] shadow-[0_14px_36px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:mx-6 lg:mx-8">
                    &copy; {new Date().getFullYear()} VYBE Workout Tracker
                </footer>
            </body>
        </html>
    );
}