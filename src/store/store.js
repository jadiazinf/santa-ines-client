import { configureStore } from "@reduxjs/toolkit";
import { doctorsApi, loginUserApi, registerUserApi } from "../api";
import userReducer from "./reducers/user.reducer";

export const store = configureStore({
  reducer: {
    [doctorsApi.reducerPath]: doctorsApi.reducer,
    authenticatedUser: userReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
                                        .concat(doctorsApi.middleware,
                                                registerUserApi.middleware,
                                                loginUserApi.middleware)
});
