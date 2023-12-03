import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctors: [],
  doctor: {},
  patients: [],
}

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
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

export const { savedoctors, savedoctor, savepatients} = doctorsSlice.actions;
export default doctorsSlice.reducer;

