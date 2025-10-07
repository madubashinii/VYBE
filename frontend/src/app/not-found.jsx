export default function NotFound() {
    return (
        <div className="text-center py-20">
            <h1 className="text-grotto text-5xl font-bold mb-4">404</h1>
            <p className="text-cornflower mb-8">Page not found or you are not authorized.</p>
            <a href="/" className="bg-grotto px-6 py-3 rounded text-white hover:bg-navy">Go Home</a>
        </div>
    );
}
