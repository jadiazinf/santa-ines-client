import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'user',
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
    }),
    getUsers: builder.mutation({
      query: () => `${import.meta.env.VITE_API_USER_GET_ALL}`
    }),
    getInfoUser: builder.mutation({
      query: (data) => {
        return {
          url: `${import.meta.env.VITE_API_USER_GET_INFO}${data}`,
          method: 'GET',
        };
      }
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_USER_CREATE}`,
        method: 'POST',
        body: data
      })
    }),
    updateUser: builder.mutation({
      query: (data) => {
        return {
          url: `${import.meta.env.VITE_API_USER_UPDATE}${data.userName}`,
          method: 'PUT',
          body: data.selectedFields
        };
      }
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `${import.meta.env.VITE_API_USER_DELETE}${id}`,
        method: 'DELETE',
      })
    }),
  })
});

export const { useLoginUserMutation, useGetUsersMutation, useGetInfoUserMutation, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation} = userApi;
