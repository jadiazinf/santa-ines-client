import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: {},
  date: '',
  descripcion: '',
  patient: {},
  descripcionError: true,
  appointments: [],
  creada:false,
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
    crearPatient: (state, action) => {
      state.patient = action.payload;
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
    crearCitaHecha: (state, action) => {
      state.creada = action.payload;
    },
  }
})

export const { crearCitaDoctor, crearCitaDate, crearPatient, crearCitaDescripcion, descripcionError, saveAppointments, crearCitaHecha } = appointmentSlice.actions;
export default appointmentSlice.reducer;

