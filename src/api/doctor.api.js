import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const doctorsApi = createApi({
  reducerPath: 'doctors',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_SERVER_BASE_URL
  }),
  endpoints: builder => ({
    getDoctors: builder.query({
      query: (page) => `${import.meta.env.VITE_API_DOCTOR_GET_ALL}`
    }),
    getDoctors1: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_DOCTOR_GET_ALL}`,
        method: 'GET',
      })
    }),
    updateDoctor: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_DOCTOR_UPDATE}`,
        method: 'PUT',
        body: data
      })
    }),
  })
});

export const { useGetDoctorsMutation, useGetDoctors1Mutation, useUpdateDoctorMutation } = doctorsApi;
