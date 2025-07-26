/* eslint-disable @typescript-eslint/no-explicit-any */
// I didn't want to spend too much time binding better-auth
// types to responses
import { baseApi } from "@/store/api";
import { signIn, signOut, signUp } from "../auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<void, { username: string; password: string }>({
      queryFn: async ({ username, password }) => {
        const res = await signIn.email({
          email: username,
          password,
        });

        return res as any;
      },
    }),
    signUp: builder.mutation<
      void,
      { name: string; username: string; password: string }
    >({
      queryFn: async ({ name, username, password }) => {
        const res = await signUp.email({
          name,
          email: username,
          password,
        });
        return res as any;
      },
    }),
    signOut: builder.mutation<void, void>({
      queryFn: async () => {
        const res = signOut();
        return res as any;
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useSignOutMutation } =
  authApi;

export default authApi;
