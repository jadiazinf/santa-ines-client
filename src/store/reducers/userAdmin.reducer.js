import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  patients: [],
  doctors: [],
}

const userAdminSlice = createSlice({
  name: 'userAdmin',
  initialState,
  reducers: {
    saveUsers: (state, action) => {
      state.users = action.payload;
    },
    savePatients: (state, action) => {
      state.patients = action.payload;
    },
    saveDoctors: (state, action) => {
      state.doctors = action.payload;
    },
  }
})

export const { saveUsers, savePatients, saveDoctors } = userAdminSlice.actions;
export default userAdminSlice.reducer;

