import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const doctorsApi = createApi({
  reducerPath: 'doctors',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DOCTORS_API_BASE_URL
  }),
  endpoints: builder => ({
    getDoctors: builder.query({
      query: (page) => `${import.meta.env.VITE_DOCTORS_API_GETALL}/${page}`
    })
  })
});

export const { useGetDoctorsQuery } = doctorsApi;
