"use server";

import { SignInFormData } from "@/types/auth.types";
import { signIn } from "@/lib/auth";
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
