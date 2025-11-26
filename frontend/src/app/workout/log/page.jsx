// "use client";

// import { useState } from "react";
// import Modal from "../../../components/Modal";

// export default function LogWorkout() {
//     const [modalOpen, setModalOpen] = useState(false);

//     return (
//         <div className="max-w-lg mx-auto py-10">
//             <h2 className="text-grotto text-3xl font-bold mb-6">Log Workout</h2>
//             <form className="flex flex-col gap-4">
//                 <input type="text" placeholder="Exercise Name" className="p-3 rounded bg-bluegray text-white" />
//                 <input type="number" placeholder="Sets" className="p-3 rounded bg-bluegray text-white" />
//                 <input type="number" placeholder="Reps" className="p-3 rounded bg-bluegray text-white" />
//                 <button
//                     type="button"
//                     className="bg-grotto py-3 rounded text-white hover:bg-navy"
//                     onClick={() => setModalOpen(true)}
//                 >
//                     Add Workout
//                 </button>
//             </form>

//             <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//                 <h3 className="text-grotto text-xl font-bold mb-2">Workout Added!</h3>
//                 <p className="text-cornflower">Your workout has been successfully logged.</p>
//             </Modal>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import Link from "next/link";

export default function LogWorkout() {
    const [workoutData, setWorkoutData] = useState({
        exercise: "",
        sets: "",
        reps: "",
        weight: "",
        duration: "",
        calories: "",
        type: "",
        notes: ""
    });

    const [exercises, setExercises] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const addExercise = () => {
        if (workoutData.exercise && workoutData.sets && workoutData.reps) {
            setExercises([...exercises, { ...workoutData, id: Date.now() }]);
            setWorkoutData({
                exercise: "",
                sets: "",
                reps: "",
                weight: "",
                duration: "",
                calories: "",
                type: "",
                notes: ""
            });
        }
    };

    const removeExercise = (id) => {
        setExercises(exercises.filter(ex => ex.id !== id));
    };

    const saveWorkout = () => {
        if (exercises.length > 0) {
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
                setExercises([]);
            }, 2000);
        }
    };

    const totalCalories = exercises.reduce((sum, ex) => sum + (parseInt(ex.calories) || 0), 0);
    const totalDuration = exercises.reduce((sum, ex) => sum + (parseInt(ex.duration) || 0), 0);

    const typeColors = {
        "Strength": "from-blue-500 to-cyan-500",
        "Cardio": "from-orange-500 to-red-500",
        "Core": "from-purple-500 to-pink-500",
        "Flexibility": "from-green-500 to-emerald-500"
    };

    const quickExercises = [
        { name: "Push Ups", type: "Strength", icon: "💪" },
        { name: "Squats", type: "Strength", icon: "🦵" },
        { name: "Pull Ups", type: "Strength", icon: "🏋️" },
        { name: "Running", type: "Cardio", icon: "🏃" },
        { name: "Plank", type: "Core", icon: "⚡" },
        { name: "Yoga", type: "Flexibility", icon: "🧘" }
    ];

    const fillQuickExercise = (exercise) => {
        setWorkoutData({
            ...workoutData,
            exercise: exercise.name,
            type: exercise.type
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#c3ceda] via-[#738fa7] to-[#c3ceda] relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#0d659d] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#0c4160] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#0c4160] hover:text-[#0d659d] font-semibold mb-4 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Dashboard
                    </Link>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-[#0c4160] text-4xl sm:text-5xl font-bold mb-2">Log Workout 💪</h1>
                            <p className="text-[#0c4160]/70 text-lg">Track your exercises for today</p>
                        </div>
                        {exercises.length > 0 && (
                            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg">
                                <div className="text-center">
                                    <p className="text-[#738fa7] text-xs font-semibold">Exercises</p>
                                    <p className="text-[#0c4160] text-xl font-bold">{exercises.length}</p>
                                </div>
                                <div className="w-px h-10 bg-[#c3ceda]"></div>
                                <div className="text-center">
                                    <p className="text-[#738fa7] text-xs font-semibold">Calories</p>
                                    <p className="text-[#0c4160] text-xl font-bold">{totalCalories}</p>
                                </div>
                                <div className="w-px h-10 bg-[#c3ceda]"></div>
                                <div className="text-center">
                                    <p className="text-[#738fa7] text-xs font-semibold">Duration</p>
                                    <p className="text-[#0c4160] text-xl font-bold">{totalDuration}m</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Add Exercise Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 mb-6">
                            <h2 className="text-[#0c4160] text-2xl font-bold mb-5 flex items-center gap-2">
                                <div className="bg-gradient-to-br from-[#0d659d] to-[#0c4160] p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                Add Exercise
                            </h2>

                            {/* Quick Add Buttons */}
                            <div className="mb-6">
                                <p className="text-[#738fa7] text-sm font-semibold mb-3">Quick Add:</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {quickExercises.map(ex => (
                                        <button
                                            key={ex.name}
                                            onClick={() => fillQuickExercise(ex)}
                                            className="flex items-center gap-2 bg-gradient-to-br from-[#c3ceda]/20 to-[#738fa7]/10 hover:from-[#c3ceda]/40 hover:to-[#738fa7]/20 px-3 py-2 rounded-lg transition-all text-left"
                                        >
                                            <span className="text-2xl">{ex.icon}</span>
                                            <span className="text-[#0c4160] font-semibold text-sm">{ex.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-[#0c4160] text-sm font-semibold mb-2">Exercise Name *</label>
                                        <input
                                            type="text"
                                            value={workoutData.exercise}
                                            onChange={(e) => setWorkoutData({ ...workoutData, exercise: e.target.value })}
                                            placeholder="e.g., Bench Press"
                                            className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#0c4160] text-sm font-semibold mb-2">Sets *</label>
                                        <input
                                            type="number"
                                            value={workoutData.sets}
                                            onChange={(e) => setWorkoutData({ ...workoutData, sets: e.target.value })}
                                            placeholder="3"
                                            className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#0c4160] text-sm font-semibold mb-2">Reps *</label>
                                        <input
                                            type="number"
                                            value={workoutData.reps}
                                            onChange={(e) => setWorkoutData({ ...workoutData, reps: e.target.value })}
                                            placeholder="12"
                                            className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#0c4160] text-sm font-semibold mb-2">Weight (lbs)</label>
                                        <input
                                            type="number"
                                            value={workoutData.weight}
                                            onChange={(e) => setWorkoutData({ ...workoutData, weight: e.target.value })}
                                            placeholder="135"
                                            className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#0c4160] text-sm font-semibold mb-2">Duration (min)</label>
                                        <input
                                            type="number"
                                            value={workoutData.duration}
                                            onChange={(e) => setWorkoutData({ ...workoutData, duration: e.target.value })}
                                            placeholder="30"
                                            className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#0c4160] text-sm font-semibold mb-2">Type</label>
                                        <select
                                            value={workoutData.type}
                                            onChange={(e) => setWorkoutData({ ...workoutData, type: e.target.value })}
                                            className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all appearance-none"
                                        >
                                            <option value="">Select type</option>
                                            <option value="Strength">Strength</option>
                                            <option value="Cardio">Cardio</option>
                                            <option value="Core">Core</option>
                                            <option value="Flexibility">Flexibility</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[#0c4160] text-sm font-semibold mb-2">Calories</label>
                                        <input
                                            type="number"
                                            value={workoutData.calories}
                                            onChange={(e) => setWorkoutData({ ...workoutData, calories: e.target.value })}
                                            placeholder="200"
                                            className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-[#0c4160] text-sm font-semibold mb-2">Notes</label>
                                        <textarea
                                            value={workoutData.notes}
                                            onChange={(e) => setWorkoutData({ ...workoutData, notes: e.target.value })}
                                            placeholder="How did it feel? Any observations?"
                                            rows="3"
                                            className="w-full px-4 py-3 bg-white border-2 border-[#c3ceda] rounded-xl text-[#0c4160] placeholder-[#738fa7]/50 focus:border-[#0d659d] focus:ring-4 focus:ring-[#0d659d]/10 outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={addExercise}
                                    type="button"
                                    className="w-full bg-gradient-to-r from-[#0d659d] to-[#0c4160] text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add to Workout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Today's Workout Summary */}
                    <div className="space-y-6">
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20">
                            <h2 className="text-[#0c4160] text-xl font-bold mb-4">Today's Workout</h2>

                            {exercises.length > 0 ? (
                                <div className="space-y-3 mb-6">
                                    {exercises.map((ex, index) => (
                                        <div key={ex.id} className="bg-gradient-to-br from-[#c3ceda]/20 to-[#738fa7]/10 rounded-xl p-3 border-2 border-[#c3ceda]/50">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <h4 className="text-[#0c4160] font-bold text-sm mb-1">{ex.exercise}</h4>
                                                    {ex.type && (
                                                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${typeColors[ex.type]} text-white`}>
                                                            {ex.type}
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeExercise(ex.id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="text-[#738fa7]">
                                                    <span className="font-semibold">{ex.sets}</span> sets × <span className="font-semibold">{ex.reps}</span> reps
                                                </div>
                                                {ex.weight && (
                                                    <div className="text-[#738fa7]">
                                                        <span className="font-semibold">{ex.weight}</span> lbs
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">💪</div>
                                    <p className="text-[#738fa7] text-sm">No exercises added yet</p>
                                </div>
                            )}

                            {exercises.length > 0 && (
                                <button
                                    onClick={saveWorkout}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save Workout
                                </button>
                            )}
                        </div>

                        {/* Tips Card */}
                        <div className="bg-gradient-to-br from-[#0d659d]/10 to-[#0c4160]/10 backdrop-blur-sm rounded-2xl p-5 border border-[#0d659d]/30">
                            <div className="flex gap-3">
                                <svg className="w-5 h-5 text-[#0d659d] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <div>
                                    <h3 className="text-[#0c4160] font-bold mb-2 text-sm">💡 Pro Tip</h3>
                                    <p className="text-[#0c4160]/80 text-xs leading-relaxed">
                                        Track your rest time between sets and stay hydrated throughout your workout!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Success Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-[#0c4160] text-2xl font-bold mb-2">Workout Saved! 🎉</h3>
                        <p className="text-[#738fa7] mb-4">Your workout has been successfully logged.</p>
                        <div className="bg-gradient-to-br from-[#c3ceda]/20 to-[#738fa7]/10 rounded-xl p-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-[#738fa7] text-xs mb-1">Exercises</p>
                                    <p className="text-[#0c4160] text-xl font-bold">{exercises.length}</p>
                                </div>
                                <div>
                                    <p className="text-[#738fa7] text-xs mb-1">Calories</p>
                                    <p className="text-[#0c4160] text-xl font-bold">{totalCalories}</p>
                                </div>
                                <div>
                                    <p className="text-[#738fa7] text-xs mb-1">Time</p>
                                    <p className="text-[#0c4160] text-xl font-bold">{totalDuration}m</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}