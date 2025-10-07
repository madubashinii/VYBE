export default function Register() {
    return (
        <div className="max-w-md mx-auto py-20">
            <h2 className="text-grotto text-3xl font-bold mb-6 text-center">Register</h2>
            <form className="flex flex-col gap-4">
                <input type="text" placeholder="Full Name" className="p-3 rounded bg-bluegray text-white" />
                <input type="email" placeholder="Email" className="p-3 rounded bg-bluegray text-white" />
                <input type="password" placeholder="Password" className="p-3 rounded bg-bluegray text-white" />
                <select className="p-3 rounded bg-bluegray text-white">
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="bg-grotto py-3 rounded text-white hover:bg-navy">
                    Register
                </button>
            </form>
        </div>
    );
}
