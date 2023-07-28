import { configureStore } from "@reduxjs/toolkit";
import { doctorsApi } from "../api";

export const store = configureStore({
  reducer: {
    [doctorsApi.reducerPath]: doctorsApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(doctorsApi.middleware)
});
