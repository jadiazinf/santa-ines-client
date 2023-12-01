import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const patientApi = createApi({
  reducerPath: 'patients',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_SERVER_BASE_URL
  }),
  endpoints: builder => ({
    getPatients: builder.mutation({
      query: () => {
        return {
          url: `${import.meta.env.VITE_API_PATIENT}`,
          method: 'GET',
        }
      }
    }),
    getPatient: builder.query({
      query: (id) => `${import.meta.env.VITE_API_PATIENT}${id}`
    }),
    createPatient: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_PATIENT}`,
        method: 'POST',
        body: data
      })
    }),
    updatePatient: builder.mutation({
      query: ({ id, data }) => ({
        url: `${import.meta.env.VITE_API_PATIENT}${id}`,       //Verificar como enviar el nombre del usuario, para concatenar en la url
        method: 'PATCH',
        body: data
      })
    }),
    deletePatient: builder.mutation({
      query: ({id}) => {
        return {
          url: `${import.meta.env.VITE_API_PATIENT}${id}`,
          method: 'DELETE',
        };
      }
    }),
  }),
});

export const { useGetPatientsMutation, useGetPatientQuery, useCreatePatientMutation, useUpdatePatientMutation, useDeletePatientMutation } = patientApi;
