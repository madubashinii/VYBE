import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                <div className="text-[#0d659d] text-7xl font-black mb-4">404</div>
                <h1 className="text-[#0c4160] text-3xl font-bold mb-3">Page not found</h1>
                <p className="text-[#738fa7] mb-8">
                    The page you are looking for does not exist or you do not have access to it.
                </p>
                <Link href="/" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#0d659d] to-[#0c4160] px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105">
                    Go Home
                </Link>
            </div>
        </div>
    );
}
