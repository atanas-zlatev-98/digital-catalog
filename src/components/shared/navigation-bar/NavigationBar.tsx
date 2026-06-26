'use client';
import { User } from "@/types/user.types";
import {signOutUser} from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function NavigationBar({user}: {user?: User}) {

    async function handleSignOut() {
        const result = await signOutUser();
        if (result?.success) {
            redirect('/sign-in');
        } 
    }

    return (
        <nav className="bg-gray-800 w-full h-16">
            <div className="flex max-w-7xl mx-auto w-full items-center justify-between h-full px-4 bg-red-500">
                <div><p>Logo</p></div>
                <div>
                    {user ? `Hello, ${user.username}` : 'User'}
                    <Button onClick={handleSignOut} className="ml-4">Sign Out</Button>
                </div>
            </div>
        </nav>
    )
}