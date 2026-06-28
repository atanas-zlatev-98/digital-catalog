import Link from "next/link";

export default async function ManageUsersPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Manage Users</h1>

             <div className="flex gap-5 max-w-2xl flex-wrap">
            <Link href="/admin/users/create-user" className="hover:bg-blue-700 bg-blue-500 text-white px-4 py-2 rounded">
                
                Create New User
            </Link>

             <Link href="/admin/users/manage-users" className="hover:bg-blue-700 bg-blue-500 text-white px-4 py-2 rounded">
               Manage Users
            </Link>

            </div>
            
        </div>
    )
}
