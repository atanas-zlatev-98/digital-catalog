"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpUser } from "@/lib/actions/user.actions";
import { SignUpFormData } from "@/types/auth.types";
import { useState } from "react";

const initialFormData: SignUpFormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
}

export default function CreateUserForm() {

    const [formData,setFormData] = useState<SignUpFormData>(initialFormData);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))

    }

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        await signUpUser(formData);
        setFormData(initialFormData);
    }

  return (
    <form className="w-full max-w-sm" onSubmit={submitHandler}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create a new User.</CardTitle>
          <CardDescription>
            Enter the details below to create a new user
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                required
                name="username"
                value={formData.username}
                onChange={changeHandler}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
                value={formData.email}
                onChange={changeHandler}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                name="password"
                value={formData.password}
                onChange={changeHandler}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={changeHandler}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer">
            Create User
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
