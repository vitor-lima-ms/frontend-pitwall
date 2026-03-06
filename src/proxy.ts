/* authConfig */
import { authConfig } from "./auth.config";
/* Other libraries imports */
import NextAuth from "next-auth";
/* Middleware */
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
