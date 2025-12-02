import "../app/globals.css";

import Navbar from "../components/Navbar";

export const metadata = {
    title: "VYBE",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-bluegray text-white min-h-screen font-sans">
                <Navbar />
                <main className="flex flex-col p-4">{children}</main>
                <footer className="text-center py-4 text-cornflower">
                    &copy; {new Date().getFullYear()} VYBE Workout Tracker
                </footer>
            </body>
        </html>
    );
}