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
            <body className={`${bodyFont.variable} ${displayFont.variable} min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] text-[#0c4160] font-sans`}>
                <Navbar />
                <main className="flex flex-col p-4">{children}</main>
                <footer className="text-center py-4 text-[#0c4160]/70">
                    &copy; {new Date().getFullYear()} VYBE Workout Tracker
                </footer>
            </body>
        </html>
    );
}