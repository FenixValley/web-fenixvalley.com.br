import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth-config";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  if (!request.auth && !isLoginPage) {
    return Response.redirect(new URL("/admin/login", request.nextUrl));
  }
  if (request.auth && isLoginPage) {
    return Response.redirect(new URL("/admin", request.nextUrl));
  }
});

export const config = { matcher: ["/admin/:path*"] };
