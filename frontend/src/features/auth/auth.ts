import { createAuthClient } from "better-auth/react";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const authClient = createAuthClient({
  baseURL: baseUrl,
});

export const { signIn, signUp, useSession, signOut } = authClient;
