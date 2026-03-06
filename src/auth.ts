/* authConfig */
import { authConfig } from "./auth.config";
/* Enum imports */
import { HttpMethodsEnum } from "./enums/api/http-methods.enum";
/* Other libraries imports */
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
/* auth */
export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const res = await fetch(`${process.env.SERVER_BASE_URL}/auth/sign-in`, {
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          method: HttpMethodsEnum.POST,
        });

        const successResponse = (await res.json()) as {
          count: number;
          data: {
            accessToken: string;
            email: string;
            id: string;
            name: string;
          }[];
          success: boolean;
        };

        const user = successResponse.data[0];

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
});
