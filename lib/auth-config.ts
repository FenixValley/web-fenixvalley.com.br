import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        if ("role" in user) token.role = user.role as string;
        if ("id" in user) token.id = user.id as string;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        if (token.role) session.user.role = token.role as string;
        if (token.id) session.user.id = token.id as string;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;
