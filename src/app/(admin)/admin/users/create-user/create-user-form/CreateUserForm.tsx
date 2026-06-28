'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateUserForm() {
    return (
        <form className="w-full max-w-sm">
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
              <Input id="username" type="text" placeholder="Username" required/>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required/>
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>

             <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
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
    )
}