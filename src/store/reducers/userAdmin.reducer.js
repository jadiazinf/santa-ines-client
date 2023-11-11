import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
}

const userAdminSlice = createSlice({
  name: 'userAdmin',
  initialState,
  reducers: {
    saveUsers: (state, action) => {
      state.users = action.payload;
    }
  }
})

export const { saveUsers } = userAdminSlice.actions;
export default userAdminSlice.reducer;

