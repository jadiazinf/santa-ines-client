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
      query: ({ id }) => {
        return {
          url: `${import.meta.env.VITE_API_APPOINTMENT_GET_BY_ID_DOCTOR}${id}`,
        };
      }
    }),
    deleteAppointment: builder.mutation({
      query: ({id}) => ({
        url: `${import.meta.env.VITE_API_APPOINTMENT}${id}`,
        method: 'DELETE',
      })
    }),
    updateAppointment: builder.mutation({
      query: ({ id, appointment }) => {
        return {
          url: `${import.meta.env.VITE_API_APPOINTMENT}${id}`,
          method: 'PATCH',
          body: appointment
        };
      }
    }),
    getUserAppointments: builder.mutation({
      query: (cedula) => {
        return {
          url: `${import.meta.env.VITE_API_APPOINTMENT_GET_BY_ID_PATIENT}${cedula}`,
        };
      }
    })
  }),
});

export const { useCreateAppointmentMutation, useGetDoctorAppointmentsMutation, useDeleteAppointmentMutation, useUpdateAppointmentMutation, useGetUserAppointmentsMutation  } = appointmentsApi;
