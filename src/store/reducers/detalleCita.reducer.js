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
    setAccion2: (state, action) => {
      state.accion = action.payload;
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
      state.accion = action.payload.dataType ||'usuario'
      state.cita = {};
      state.doctor = {};
      state.paciente = {};
      state.usuario.Id = action.payload.ID || action.payload.object.ID;
      state.usuario.Usuario = action.payload.username || action.payload.object.username;
      state.usuario.Contraseña = action.payload.password || action.payload.object.password;
      state.usuario.Tipo_usuario = action.payload.user_type || action.payload.object.user_type;
    },
    detalleDoctor: (state, action) => {
      state.accion = 'doctor'
      state.cita = {};
      state.usuario = {};
      state.paciente = {};
      state.doctor.Id = action.payload.id.UUID;
      state.doctor.Nombre = action.payload.nombre.cuerpo
      state.doctor.Apellido = action.payload.apellido.cuerpo;
      state.doctor.Cédula = action.payload.cedula;
      state.doctor.Especialidad = action.payload.especialidad;
      state.doctor.Teléfono = action.payload.telefono;
      state.doctor.Correo = action.payload.correo.correo;
      state.doctor.Género = action.payload.genero;
    },
    detalleDoctor2: (state, action) => {
      state.accion = 'editardoctor'
      state.cita = {};
      state.usuario = {};
      state.paciente = {};
      state.doctor.Id = action.payload.object.id.UUID;
      state.doctor.Nombre = action.payload.object.nombre.cuerpo;
      state.doctor.Apellido =action.payload.object.apellido.cuerpo;
      state.doctor.Cédula = action.payload.object.cedula;
      state.doctor.Especialidad = action.payload.object.especialidad;
      state.doctor.Teléfono = action.payload.object.telefono;
      state.doctor.Correo = action.payload.object.correo.correo;
      state.doctor.Género = action.payload.object.genero;
    },
    detallePaciente: (state, action) => {
      state.accion = action.payload.dataType || 'paciente'
      state.cita = {};
      state.usuario = {};
      state.doctor = {};
      state.paciente.Id = action.payload.ID || action.payload.object.ID;
      state.paciente.Nombre = action.payload.name || action.payload.object.name;
      state.paciente.Apellido = action.payload.lastname || action.payload.object.lastname;
      state.paciente.Cédula = action.payload.id_number || action.payload.object.id_number;
      state.paciente.Dirección = action.payload.address || action.payload.object.address;
      state.paciente.Fecha_Nac = action.payload.birthday || action.payload.object.birthday;
      state.paciente.Teléfono = action.payload.phone_number || action.payload.object.phone_number;
      state.paciente.Correo = action.payload.email || action.payload.object.email;
      state.paciente.Género = action.payload.gender || action.payload.object.gender;
    },
    detalleCreacionEdicion: (state, action) => {
      state.accion = action.payload
    },
    resetAccions: (state) => {
      state.accion = '';
      state.cita= {};
      state.usuario= {};
      state.doctor= {};
      state.paciente= {};
    },
  }
})

export const { setAccion, setAccion2, detalleCita, detalleUsuario, detalleDoctor, detalleDoctor2, detallePaciente, detalleCreacionEdicion, resetAccions } = detalleSlice.actions;
export default detalleSlice.reducer;

