import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session || session?.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex items-center justify-center mb-4 gap-5">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="flex gap-5 max-w-2xl flex-wrap">
        <Link href="/admin/users"
          className="hover:bg-blue-700 bg-blue-500 text-white px-4 py-2 rounded">
          Manage Users
        </Link>

        <Link href="/admin/products"
          className="hover:bg-blue-700 bg-blue-500 text-white px-4 py-2 rounded">
          Manage Products
        </Link>

        <Link href="/admin/manufacturers"
          className="hover:bg-blue-700 bg-blue-500 text-white px-4 py-2 rounded">
          Manage Manufacturers
        </Link>

        <Link href="/admin/categories"
          className="hover:bg-blue-700 bg-blue-500 text-white px-4 py-2 rounded">
          Manage Categories
        </Link>
      </div>
    </div>
  );
}
