/* eslint-disable @typescript-eslint/no-explicit-any */
// I didn't want to spend too much time binding better-auth
// types to responses
import { baseApi, TAGS } from "@/store/api";
import { CustomDocument } from "../components/FileSection";

const documentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFileNames: builder.query<{ files: CustomDocument[] }, void>({
      query: () => ({
        url: "files",
        method: "GET",
      }),
      providesTags: [TAGS.LIST_FILES],
    }),
    upload: builder.mutation<void, FormData>({
      query: (document) => ({
        url: "upload",
        method: "POST",
        body: document,
      }),
      invalidatesTags: [TAGS.LIST_FILES],
    }),
    documentQuery: builder.mutation<
      { answer: { kwargs: { content: string } } },
      { id: string; question: string }
    >({
      query: (body) => ({
        url: "query",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useUploadMutation,
  useGetFileNamesQuery,
  useDocumentQueryMutation,
} = documentsApi;

export default documentsApi;
