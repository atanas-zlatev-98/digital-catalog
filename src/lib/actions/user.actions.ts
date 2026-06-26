"use server";

import { SignInFormData } from "@/types/auth.types";
import { signIn } from "@/lib/auth";

export async function signInUser(formData: SignInFormData) {
  const { email, password } = formData;
  try {
   await signIn("credentials", { email, password, redirectTo: '/' });
   return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
