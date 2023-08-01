import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const loginUserApi = createApi({
  reducerPath: 'loginUser',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_SERVER_BASE_URL
  }),
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_USER_LOGIN}`,
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useLoginUserMutation } = loginUserApi;
