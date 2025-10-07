"use client";

import { useState } from "react";
import Modal from "../../../components/Modal";

export default function LogWorkout() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="max-w-lg mx-auto py-10">
            <h2 className="text-grotto text-3xl font-bold mb-6">Log Workout</h2>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Exercise Name" className="p-3 rounded bg-bluegray text-white" />
                <input type="number" placeholder="Sets" className="p-3 rounded bg-bluegray text-white" />
                <input type="number" placeholder="Reps" className="p-3 rounded bg-bluegray text-white" />
                <button
                    type="button"
                    className="bg-grotto py-3 rounded text-white hover:bg-navy"
                    onClick={() => setModalOpen(true)}
                >
                    Add Workout
                </button>
            </form>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h3 className="text-grotto text-xl font-bold mb-2">Workout Added!</h3>
                <p className="text-cornflower">Your workout has been successfully logged.</p>
            </Modal>
        </div>
    );
}
