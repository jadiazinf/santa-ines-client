import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accion: '',
  cita: {},
  usuario: {},
  doctor: {},
  paciente: {},
}

const detalleSlice = createSlice({
  name: 'detalleCita',
  initialState,
  reducers: {
    setAccion: (state) => {
      state.accion = '';
    },
    detalleCita: (state, action) => {
      state.accion = 'cita'
      state.usuario = {};
      state.doctor = {};
      state.paciente = {};
      state.cita.id = action.payload.id;
      state.cita.date = action.payload.appointmentDate;
      state.cita.creationDate = action.payload.creationDate;
      state.cita.descripcion = action.payload.description;
      state.cita.status = action.payload.status;
      state.cita.doctorId = action.payload.doctorId;
      state.cita.patientId = action.payload.patientId;
    },
    detalleUsuario: (state, action) => {
      state.accion = 'usuario'
      state.cita = {};
      state.doctor = {};
      state.paciente = {};
      state.usuario.Id = action.payload.ID;
      state.usuario.Usuario = action.payload.username;
      state.usuario.Contraseña = action.payload.password;
      state.usuario.Tipo_usuario = action.payload.user_type;
    },
    detalleDoctor: (state, action) => {
      state.accion = 'doctor'
      state.cita = {};
      state.usuario = {};
      state.paciente = {};
      state.doctor.Id = action.payload.id.UUID;
      state.doctor.Nombre = action.payload.nombre.cuerpo;
      state.doctor.Apellido = action.payload.apellido.cuerpo;
      state.doctor.Cédula = action.payload.cedula;
      state.doctor.Especialidad = action.payload.especialidad;
      state.doctor.Teléfono = action.payload.telefono;
      state.doctor.Correo = action.payload.correo.correo;
      state.doctor.Género = action.payload.genero;
    },
    detallePaciente: (state, action) => {
      state.accion = 'paciente'
      state.cita = {};
      state.usuario = {};
      state.doctor = {};
      state.paciente.Id = action.payload.ID;
      state.paciente.Nombre = action.payload.name;
      state.paciente.Apellido = action.payload.lastname;
      state.paciente.Cédula = action.payload.id_number;
      state.paciente.Dirección = action.payload.address;
      state.paciente.Fecha_Nac = action.payload.birthday;
      state.paciente.Teléfono = action.payload.phone_number;
      state.paciente.Correo = action.payload.email;
      state.paciente.Género = action.payload.gender;
    },
  }
})

export const { setAccion, detalleCita, detalleUsuario, detalleDoctor, detallePaciente } = detalleSlice.actions;
export default detalleSlice.reducer;

