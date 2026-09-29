"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export type MemberLoginState = { error?: string };

export async function memberLoginAction(
  _previous: MemberLoginState,
  formData: FormData
): Promise<MemberLoginState> {
  try {
    const callbackUrl = (formData.get("callbackUrl") as string) || "/membro";
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: callbackUrl
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "E-mail ou senha inválidos." };
    }
    throw error;
  }
}
