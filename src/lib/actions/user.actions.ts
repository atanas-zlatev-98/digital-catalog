"use server";

import { SignInFormData } from "@/types/auth.types";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

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