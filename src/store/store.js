import { configureStore } from "@reduxjs/toolkit";
import { appointmentsApi, doctorsApi, loginUserApi, registerUserApi } from "../api";
import { userApi } from "../api/user.api";
import userReducer from "./reducers/user.reducer";
import appointmentReducer from "./reducers/crearCita.reducer";

export const store = configureStore({
  reducer: {
    [loginUserApi.reducerPath]: loginUserApi.reducer,
    [registerUserApi.reducerPath]: registerUserApi.reducer,
    [doctorsApi.reducerPath]: doctorsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
    authenticatedUser: userReducer,
    createAppointment: appointmentReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
                                        .concat(doctorsApi.middleware,
                                                registerUserApi.middleware,
                                                loginUserApi.middleware,
                                                userApi.middleware,
                                                appointmentsApi.middleware
                                                )
});
