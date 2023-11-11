import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctors: [],
  doctor: {},
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
    }
  }
})

export const { savedoctors, savedoctor } = doctorsSlice.actions;
export default doctorsSlice.reducer;

