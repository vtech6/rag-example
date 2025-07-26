import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Action, PayloadAction } from "@reduxjs/toolkit/react";
import { HYDRATE } from "next-redux-wrapper";

// The next line is disabled because proper typing in Next would cause
// a circular import
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHydrateAction(action: Action): action is PayloadAction<any> {
  return action.type === HYDRATE;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3001/api/" }),
  endpoints: () => ({}),
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
});
