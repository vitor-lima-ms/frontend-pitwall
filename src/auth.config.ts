/* Enum imports */
import { RoutePathEnum } from "./enums/ui/route-paths.enum";
/* Other libraries imports */
import { type NextAuthConfig } from "next-auth";
/* authConfig */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;

      const protectedRoutes = Object.values(RoutePathEnum);

      let isOnProtectedRoute = false;

      for (let i = 0; i < protectedRoutes.length; i++) {
        const value = protectedRoutes[i];

        if (nextUrl.pathname.startsWith(value)) {
          isOnProtectedRoute = true;
        }
      }

      if (isOnProtectedRoute) {
        if (isLoggedIn) {
          return true;
        }

        return false;
      }

      if (isLoggedIn && nextUrl.pathname === "login") {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.accessToken = token.accessToken as string;

      session.user.id = token.sub as string;

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
