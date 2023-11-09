import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appointmentsApi = createApi({
  reducerPath: 'appointments',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_SERVER_BASE_URL
  }),
  endpoints: builder => ({
    getDoctorAppointments: builder.query({
      query: ({ id }) => `${import.meta.env.VITE_API_APPOINTMENT_GET_BY_ID_DOCTOR}${id}`,
    }),
    getDoctorAppointments2: builder.mutation({
      query: ({ id }) => `${import.meta.env.VITE_API_APPOINTMENT_GET_BY_ID_DOCTOR}${id}`,
    }),
    deleteAppointment: builder.mutation({
      query: ({id}) => ({
        url: `${import.meta.env.VITE_API_APPOINTMENT}${id}`,
        method: 'DELETE',
      })
    })
  }),
});

export const { useGetDoctorAppointmentsQuery, useGetDoctorAppointments2Mutation, useDeleteAppointmentMutation  } = appointmentsApi;
