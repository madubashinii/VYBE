export default function WorkoutCard({ exercise, sets, reps, date }) {
    return (
        <div className="bg-navy p-4 rounded shadow mb-4">
            <h3 className="text-grotto text-xl font-bold">{exercise}</h3>
            <p className="text-cornflower">Sets: {sets} | Reps: {reps}</p>
            <p className="text-grayblue text-sm">Logged: {date}</p>
        </div>
    );
}
