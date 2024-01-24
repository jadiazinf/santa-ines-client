import { configureStore } from "@reduxjs/toolkit";
import { appointmentsApi, doctorsApi, patientApi, registerUserApi } from "../api";
import { userApi } from "../api/user.api";
import userSlice from "./reducers/user.reducer";
import appointmentSlice from "./reducers/crearCita.reducer";
import doctorsSlice from "./reducers/doctors.reducer";
import userAdminSlice from "./reducers/userAdmin.reducer";
import appointmentEditSlice from "./reducers/editarCita.reducer";
import detalleSlice from "./reducers/detalleCita.reducer";

export const store = configureStore({
  reducer: {
    [registerUserApi.reducerPath]: registerUserApi.reducer,
    [doctorsApi.reducerPath]: doctorsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    authenticatedUser: userSlice,
    createAppointment: appointmentSlice,
    saveDoctors: doctorsSlice,
    userAdmin: userAdminSlice,
    editAppointment: appointmentEditSlice,
    detalles: detalleSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
                                        .concat(doctorsApi.middleware,
                                                registerUserApi.middleware,
                                                userApi.middleware,
                                                appointmentsApi.middleware,
                                                patientApi.middleware
                                                )
});
