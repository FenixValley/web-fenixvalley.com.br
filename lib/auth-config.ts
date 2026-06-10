import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user && "role" in user) token.role = user.role as string;
      return token;
    },
    session({ session, token }) {
      if (token.role && session.user) session.user.role = token.role;
      return session;
    }
  }
} satisfies NextAuthConfig;
