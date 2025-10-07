import WorkoutCard from "../../../components/WorkoutCard";

export default function WorkoutHistory() {
    const workouts = [
        { exercise: "Push Ups", sets: 3, reps: 15, date: "2025-10-07" },
        { exercise: "Squats", sets: 4, reps: 12, date: "2025-10-06" },
        { exercise: "Plank", sets: 2, reps: 60, date: "2025-10-05" },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-grotto text-4xl font-bold mb-6">Workout History</h1>
            {workouts.map((w, idx) => (
                <WorkoutCard
                    key={idx}
                    exercise={w.exercise}
                    sets={w.sets}
                    reps={w.reps}
                    date={w.date}
                />
            ))}
        </div>
    );
}
