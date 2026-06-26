'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInUser } from "@/lib/actions/user.actions";
import { SignInFormData } from "@/types/auth.types";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {

    const [formData, setFormData] = useState<SignInFormData>({
        email: "",
        password: "",
    });

    const [error, setError] = useState<string>('');

    const router = useRouter();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       const response = await signInUser(formData);

       if (response?.success) {
        router.push("/");
       } else {
          setError(response?.error || 'An error occurred. Please try again.');
       }
    }

  return (
    <form className="w-full max-w-sm" onSubmit={submitHandler}>
      <Card className="w-full max-w-sm">

        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                
                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>

              </div>
              <Input id="password" type="password" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
