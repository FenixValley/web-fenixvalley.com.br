import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { users } from "@/db/schema";
import { authConfig } from "@/lib/auth-config";
import { getDb } from "@/lib/db";
import { verifyPassword } from "@/lib/password";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const db = getDb();
        const user = await db.query.users.findFirst({
          where: eq(users.email, parsed.data.email)
        });
        if (!user) return null;
        const valid = await verifyPassword(parsed.data.password, user.passwordHash);
        if (!valid) return null;
        return { id: String(user.id), name: user.name, email: user.email, role: user.role };
      }
    })
  ]
});
