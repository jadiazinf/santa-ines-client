import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: '',
  date: '',
  descripcion: '',
  status: ''
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
  }
})

export const { editarId, editarCitaDate, editarCitaDescripcion, editarStatus } = appointmentEditSlice.actions;
export default appointmentEditSlice.reducer;

