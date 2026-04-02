export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 border border-[#2a3d6a]/30">
                <button
                    className="text-red-500 mb-4 font-semibold"
                    onClick={onClose}
                >
                    Close
                </button>
                {children}
            </div>
        </div>
    );
}
