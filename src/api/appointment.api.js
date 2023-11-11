import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appointmentsApi = createApi({
  reducerPath: 'appointments',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_SERVER_BASE_URL
  }),
  endpoints: builder => ({
    createAppointment: builder.mutation({
      query: ( appointment ) => ({
        url: `${import.meta.env.VITE_API_APPOINTMENT}`,
        method: 'POST',
        body: appointment
      })
    }),
    getDoctorAppointments: builder.mutation({
      query: ({ id }) => `${import.meta.env.VITE_API_APPOINTMENT_GET_BY_ID_DOCTOR}${id}`,
    }),
    deleteAppointment: builder.mutation({
      query: ({id}) => ({
        url: `${import.meta.env.VITE_API_APPOINTMENT}${id}`,
        method: 'DELETE',
      })
    }),
    updateAppointment: builder.mutation({
      query: ({ id, appointment }) => ({
        url: `${import.meta.env.VITE_API_APPOINTMENT}${id}`,
        method: 'PATCH',
        body: appointment
      })
    })
  }),
});

export const { useCreateAppointmentMutation, useGetDoctorAppointmentsMutation, useDeleteAppointmentMutation, useUpdateAppointmentMutation  } = appointmentsApi;
