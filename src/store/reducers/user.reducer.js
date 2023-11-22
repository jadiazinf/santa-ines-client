import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: '',
  typeUser: '',
  role: 'not-authenticated'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.username = action.payload.username;
      state.role = action.payload.role
    },
    editUser: (state, action) => {
      state.username = action.payload.username;
      state.typeUser = action.payload.user_type;
    },
  }
})

export const { authenticateUser, editUser } = userSlice.actions;
export default userSlice.reducer;

