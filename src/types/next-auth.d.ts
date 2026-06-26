import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "USER";
      username: string;
      profileImage: string | null;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "ADMIN" | "USER";
    username: string;
    email: string;
    profileImage: string | null;
  }
}