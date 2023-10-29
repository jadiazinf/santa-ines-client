import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: '',
  email: '',
  role: 'not-authenticated'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role
    }
  }
})

export const { authenticateUser } = userSlice.actions;
export default userSlice.reducer;

