import WorkoutCard from "../../../components/WorkoutCard";

export default function BrowsePlans() {
    const plans = [
        { exercise: "HIIT - 20min", sets: 5, reps: 30, date: "N/A" },
        { exercise: "Yoga Flow", sets: 3, reps: 10, date: "N/A" },
        { exercise: "Strength Training", sets: 4, reps: 12, date: "N/A" },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-grotto text-4xl font-bold mb-6">Browse Plans</h1>
            {plans.map((plan, idx) => (
                <WorkoutCard
                    key={idx}
                    exercise={plan.exercise}
                    sets={plan.sets}
                    reps={plan.reps}
                    date={plan.date}
                />
            ))}
        </div>
    );
}
