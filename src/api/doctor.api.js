import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const doctorsApi = createApi({
  reducerPath: 'doctors',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_SERVER_BASE_URL
  }),
  endpoints: builder => ({
    getDoctors: builder.mutation({
      query: (data) => {
        return {
          url: `${import.meta.env.VITE_API_DOCTOR_GET_BY_USERID}`,
          method: 'POST',
          body: data
        }
      }
    }),
    getDoctors1: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_DOCTOR_GET_ALL}`,        //Sera eliminado cuando se tenga el endpoint VITE_API_DOCTOR_GET_BY_USERID
        method: 'GET',
      })
    }),
    getAllDoctors: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_DOCTOR_GET_ALL}`,
        method: 'GET',
      })
    }),
    createDoctor: builder.mutation({
      query: (data) => {
        return {
          url: `${import.meta.env.VITE_API_DOCTOR_CREATE}`,
          method: 'POST',
          body: data
        }
      }
    }),
    updateDoctor: builder.mutation({
      query: (data) => {
        return {
          url: `${import.meta.env.VITE_API_DOCTOR_UPDATE}${data.id}`,
          method: 'PUT',
          body: data.data
        }
      }
    }),
    deleteDoctor: builder.mutation({
      query: (data) => {
        const cedula = {cedula: data.id}
        return {
          url: `${import.meta.env.VITE_API_DOCTOR_DELETE}`,
          method: 'DELETE',
          body: cedula
        };
      }
    }),

  })
});

export const { useGetDoctorsMutation, useGetDoctors1Mutation, useGetAllDoctorsMutation, useCreateDoctorMutation, useUpdateDoctorMutation, useDeleteDoctorMutation } = doctorsApi;
