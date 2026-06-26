'use client';
import { User } from "@/types/user.types";
export default function NavigationBar({user}: {user?: User}) {
    return (
        <nav className="bg-gray-800 w-full h-16">
            <div className="flex max-w-7xl mx-auto w-full items-center justify-between h-full px-4 bg-red-500">
                <div><p>Logo</p></div>
                <div>
                    {user ? `Hello, ${user.username}` : 'User'}
                </div>
            </div>
        </nav>
    )
}