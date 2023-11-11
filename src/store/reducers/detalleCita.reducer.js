import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: '',
  date: '',
  creationDate: '',
  descripcion: '',
  status: '',
  doctorId: '',
  patientId: '',
}

const appointmentDetalleSlice = createSlice({
  name: 'detalleCita',
  initialState,
  reducers: {
    detalleCita: (state, action) => {
      state.id = action.payload.id;
      state.date = action.payload.appointmentDate;
      state.creationDate = action.payload.creationDate;
      state.descripcion = action.payload.description;
      state.status = action.payload.status;
      state.doctorId = action.payload.doctorId;
      state.patientId = action.payload.patientId;
    },
  }
})

export const { detalleCita } = appointmentDetalleSlice.actions;
export default appointmentDetalleSlice.reducer;

