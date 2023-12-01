import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: {},
  date: '',
  descripcion: '',
  descripcionError: true,
  appointments: [],
}

const appointmentSlice = createSlice({
  name: 'crearCita',
  initialState,
  reducers: {
    crearCitaDoctor: (state, action) => {
      state.doctor = action.payload;
    },
    crearCitaDate: (state, action) => {
      state.date = action.payload;
    },
    crearCitaDescripcion: (state, action) => {
      state.descripcion = action.payload;
    },
    descripcionError: (state, action) => {
      state.descripcionError = action.payload;
    },
    saveAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  }
})

export const { crearCitaDoctor, crearCitaDate, crearCitaDescripcion, descripcionError, saveAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;

