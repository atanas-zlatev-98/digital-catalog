import Link from "next/link";

export default async function ManageUsersPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Manage Users</h1>

            <Link href="/admin/users/create-user" className="hover:bg-blue-700 bg-blue-500 text-white px-4 py-2 rounded">
                Create New User
            </Link>
        </div>
    )
}
