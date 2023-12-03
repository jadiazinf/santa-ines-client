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
    newUsername: (state, action) => {
      state.username = action.payload.username;
    },
    newTypeUser: (state, action) => {
      state.typeUser = action.payload.user_type;
    },
  }
})

export const { authenticateUser, editUser, newUsername, newTypeUser } = userSlice.actions;
export default userSlice.reducer;

