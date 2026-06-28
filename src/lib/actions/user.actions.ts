"use server";

import { SignInFormData, SignUpFormData } from "@/types/auth.types";
import { auth, signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";

export async function signInUser(formData: SignInFormData) {
  const { email, password } = formData;
  try {
    await signIn("credentials", { email, password, redirect: false });
    return { success: true };
  } catch (err) {
    if (err instanceof AuthError  && err.type === "CredentialsSignin") {
      return { success: false, error: "Invalid email or password" };
    }
  }
}

export async function signUpUser(formData: SignUpFormData) {
  await requireAdmin();
  const {username, email, password} = formData;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    }
  })

  console.log(existingUser)

  if(existingUser){
     return { success: false, error: "Email already exists" };
  }

  await prisma.user.create({
    data:{
      username,
      email,
      password: await bcrypt.hash(password, 10)
    }
  })

  return { success: true, message: "User created successfully" };

}

export async function signOutUser() {
  try{
    await signOut({ redirect: false });
    return { success: true };
  }catch(err){
    if(err instanceof AuthError){
      return { success: false, error: "Error signing out" };
    }
  }
}

async function requireAdmin(){
  const session = await auth();
  
  if(!session || session.user?.role !== "ADMIN"){
    throw new Error("Unauthorized");
  }
  return session;
}