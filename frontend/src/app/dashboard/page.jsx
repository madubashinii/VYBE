import Sidebar from "../../components/Sidebar";
import Chart from "../../components/Chart";
import WorkoutCard from "../../components/WorkoutCard";

export default function Dashboard() {
    return (
        <div className="flex w-full">
            <Sidebar />
            <div className="flex-1 p-6">
                <h1 className="text-grotto text-4xl font-bold mb-6">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Chart title="Weekly Progress" />
                    <Chart title="Monthly Progress" />
                </div>

                <h2 className="text-grotto text-2xl font-bold mt-8 mb-4">Recent Workouts</h2>
                <WorkoutCard exercise="Push Ups" sets={3} reps={15} date="2025-10-07" />
                <WorkoutCard exercise="Squats" sets={4} reps={12} date="2025-10-06" />
            </div>
        </div>
    );
}
