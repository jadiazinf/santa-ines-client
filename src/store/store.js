import { configureStore } from "@reduxjs/toolkit";
import { appointmentsApi, doctorsApi, registerUserApi } from "../api";
import { userApi } from "../api/user.api";
import userSlice from "./reducers/user.reducer";
import appointmentSlice from "./reducers/crearCita.reducer";
import doctorsSlice from "./reducers/doctors.reducer";
import userAdminSlice from "./reducers/userAdmin.reducer";
import appointmentEditSlice from "./reducers/editarCita.reducer";
import appointmentDetalleSlice from "./reducers/detalleCita.reducer";

export const store = configureStore({
  reducer: {
    [registerUserApi.reducerPath]: registerUserApi.reducer,
    [doctorsApi.reducerPath]: doctorsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
    authenticatedUser: userSlice,
    createAppointment: appointmentSlice,
    saveDoctors: doctorsSlice,
    userAdmin: userAdminSlice,
    editAppointment: appointmentEditSlice,
    detalleAppointment: appointmentDetalleSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
                                        .concat(doctorsApi.middleware,
                                                registerUserApi.middleware,
                                                userApi.middleware,
                                                appointmentsApi.middleware
                                                )
});
