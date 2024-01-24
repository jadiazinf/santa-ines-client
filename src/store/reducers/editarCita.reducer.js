import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: '',
  date: '',
  descripcion: '',
  status: '',
  paciente: '',
}

const appointmentEditSlice = createSlice({
  name: 'editarCita',
  initialState,
  reducers: {
    editarId: (state, action) => {
      state.id = action.payload;
    },
    editarCitaDate: (state, action) => {
      state.date = action.payload;
    },
    editarCitaDescripcion: (state, action) => {
      state.descripcion = action.payload;
    },
    editarStatus: (state, action) => {
      state.status = action.payload;
    },
    editarPaciente: (state, action) => {
      state.paciente = action.payload;
    },
  }
})

export const { editarId, editarCitaDate, editarCitaDescripcion, editarStatus, editarPaciente } = appointmentEditSlice.actions;
export default appointmentEditSlice.reducer;

