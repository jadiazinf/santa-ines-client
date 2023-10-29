import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: {},
  date: '',
  descripcion: '',
  descripcionError: true,
}

const appointmentReducer = createSlice({
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
    }
  }
})

export const {  crearCitaDoctor, crearCitaDate, crearCitaDescripcion, descripcionError } = appointmentReducer.actions;
export default appointmentReducer.reducer;

