'use client';
import { useEffect, useState } from "react";
import { getAllRegularUsers } from "@/lib/actions/user.actions";
import { RegularUser } from "@/types/user.types";
import { UsersTable } from "./table/UsersTable";

export default function ManageUsersPage() {

    const [users, setUsers] = useState<RegularUser[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(()=>{
        const fetchUsers = async () => {
            try{
                const response = await getAllRegularUsers();

                if(response.success){
                    setUsers(response.users ?? []);
                }
            }catch(error){
                setError('An error occurred while fetching users.');
            }finally{
                setIsLoading(false);
            }
        } 
        fetchUsers();
    },[])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold">Manage Users</h1>

      <div className="max-w-4xl flex flex-col gap-4 w-full mt-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="border rounded-lg bg-white">
          {isLoading ? (
            <div className="p-4">Loading...</div>
          ):(
            <UsersTable users={users}/>
          )}
        </div>
      </div>
    </div>
  );
}
