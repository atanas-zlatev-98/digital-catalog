"use server";

import { SignInFormData, SignUpFormData } from "@/types/auth.types";
import { auth, signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";

async function requireAdmin(){
  const session = await auth();
  
  if(!session || session.user?.role !== "ADMIN"){
    throw new Error("Unauthorized");
  }
  return session;
}

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

   try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
      select: { email: true, username: true },
    });


    if (existingUser) {
      if (existingUser.email === email) {
        return { success: false, error: "Email or username already exists" };
      }
      return { success: false, error: "Email or username already exists" };
    }

    await prisma.user.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    return { success: false, error: "Something went wrong. Please try again." };
  }

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

export async function getAllRegularUsers() {
  await requireAdmin();

  try{
    const users = await prisma.user.findMany({
      where: {
        role: "USER",
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true
  }});
    return { success: true, users };
  }catch(err){
    return { success: false, error: "Error fetching users" };
  }
}


export async function removeUserById(userId: string) {
  await requireAdmin();

  try{
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if(!user){
        return { success: false, error: "User not found" };
      }

      await prisma.user.delete({where: { id: userId }});

      return { success: true, message: "User deleted successfully" };
  }catch(err){
    return { success: false, error: "Error removing user" };
  }
}