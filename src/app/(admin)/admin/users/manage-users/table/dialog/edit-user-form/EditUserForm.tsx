import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RegularUser } from "@/types/user.types"
import { useState } from "react";

export default function EditUserForm({ user }:{ user: RegularUser }) {
    const initialFormData = {
        username: user.username,
        email: user.email,
        role:user.role,
    }
    const [formData,setFormData] = useState(initialFormData);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    return (
       <form className="w-full max-w-sm">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                required
                value={formData.username}
                onChange={changeHandler}
                name="username"/>
            
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={changeHandler}
                name="email"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                type="text"
                required
                value={formData.role}
                onChange={changeHandler}
                name="role"
              />
            </div>
          </div>
    </form>
    )
}