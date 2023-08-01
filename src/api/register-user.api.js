import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const registerUserApi = createApi({
  reducerPath: 'registerUser',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REGISTER_USER_API_BASE_URL
  }),
  endpoints: builder => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_REGISTER_USER_API_REGISTER}/${page}`,
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useRegisterUserMutation } = registerUserApi;
