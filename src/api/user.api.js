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
      query: (data) => ({
        url: `${import.meta.env.VITE_API_USER_GET_INFO}`,     //Verificar como enviar el nombre del usuario, para concatenar en la url
        method: 'GET',
        body: data
      })
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_USER_CREATE}`,
        method: 'POST',
        body: data
      })
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_USER_UPDATE}`,       //Verificar como enviar el nombre del usuario, para concatenar en la url
        method: 'PUT',
        body: data
      })
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_USER_UPDATE}`,       //Verificar como enviar el nombre del usuario, para concatenar en la url
        method: 'DELETE',
        body: data
      })
    }),
  })
});

export const { useLoginUserMutation, useGetUsersMutation, useGetInfoUserMutation, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation} = userApi;
