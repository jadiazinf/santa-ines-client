import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorId: '',
  doctors: [],
  doctor: {},
  patients: [],
}

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    savedoctorId: (state, action) => {
      state.doctorId = action.payload;
    },
    savedoctors: (state, action) => {
      state.doctors = action.payload;
    },
    savedoctor: (state, action) => {
      state.doctor = action.payload;
    },
    savepatients: (state, action) => {
      state.patients = action.payload;
    },
  }
})

export const { savedoctorId, savedoctors, savedoctor, savepatients} = doctorsSlice.actions;
export default doctorsSlice.reducer;

