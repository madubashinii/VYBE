export default function AdminPanel() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="max-w-xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-[#c3ceda]/30 p-8 text-center">
                <h1 className="text-[#0c4160] text-3xl font-bold mb-4">Admin tools not connected</h1>
                <p className="text-[#738fa7] leading-relaxed">
                    This area is currently a placeholder. The backend in this workspace does not expose admin management endpoints yet, so the page stays neutral instead of showing fake controls.
                </p>
            </div>
        </div>
    );
}
