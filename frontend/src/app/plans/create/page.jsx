export default function CreatePlan() {
    return (
        <div className="max-w-lg mx-auto py-10">
            <h2 className="text-grotto text-3xl font-bold mb-6">Create Custom Plan</h2>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Plan Name" className="p-3 rounded bg-bluegray text-white" />
                <textarea placeholder="Description" className="p-3 rounded bg-bluegray text-white" />
                <button className="bg-grotto py-3 rounded text-white hover:bg-navy">Create Plan</button>
            </form>
        </div>
    );
}
