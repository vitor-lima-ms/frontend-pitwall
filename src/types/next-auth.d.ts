/* Other libraries imports */
import { JWT } from "next-auth/jwt";
import NextAuth, { DefaultSession } from "next-auth";
/* next-auth */
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: DefaultSession["user"];
  }

  interface User {
    accessToken?: string;
  }
}
/* next-auth/jwt */
declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    sub: string;
  }
}
