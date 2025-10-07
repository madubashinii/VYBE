import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="bg-bluegray text-white w-64 min-h-screen p-4">
            <h2 className="text-grotto text-xl font-bold mb-6">Quick Links</h2>
            <ul className="flex flex-col gap-3">
                <li><Link href="/dashboard">Overview</Link></li>
                <li><Link href="/workout/log">Log Workout</Link></li>
                <li><Link href="/workout/history">Workout History</Link></li>
                <li><Link href="/plans/browse">Browse Plans</Link></li>
                <li><Link href="/plans/create">Create Plan</Link></li>
                <li><Link href="/progress">Progress</Link></li>
                <li><Link href="/reminders">Reminders</Link></li>
            </ul>
        </aside>
    );
}
