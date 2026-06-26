import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
    const session = await auth();

    if(!session || session?.user.role !== 'ADMIN') {
        redirect('/');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Admin Dashboard</h1>
        </div>
    )
}