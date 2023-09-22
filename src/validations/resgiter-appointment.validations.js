import * as Yup from 'yup';

export const registerAppointmentSchema = Yup.object({
  descripcion: Yup.string('Solo letras').min(10, 'La descripcion debe ser mayor a 10 caracteres (completa)').required('Campo obligatorio'),
  fechaCita: Yup.date().min(new Date(), 'La fecha de la cita debe ser posterior a la de hoy').required('Campo obligatorio'),
});




// this.descripcion=descripcion; //Esto se coloca
// this.fechaCreacion=fechaCreacion;// Esto lo deberia manejar el back
// this.fechaCita=fechaCita;    //seleccionar fecha
// this.id_doctor= id_doctor;  //Seleccionar el doctor
// this.id_cita=id_cita;          //Se supone que el back lo maneja
// this.id_paciente=id_paciente; //Esto esta en el store



// "doctores": [
//   {
//     "nombre": {
//       "primerNombre": "Juan",
//       "segundoNombre": "Carlos"
//     },
//     "apellido": {
//       "primerApellido": "Gómez",
//       "segundoApellido": "Pérez"
//     },
//     "fechaNacimiento": {
//       "dia": 10,
//       "mes": 5,
//       "anio": 1980
//     },
//     "especialidad": "Cardiología",
//     "cedula": "123456789",
//     "direccion": "Calle 123, Ciudad",
//     "telefono": "555-123-4567",
//     "genero": "Masculino",
//     "correo": "juan.gomez@example.com",
//     "id": "D12345"
//   },
//   {
//     "nombre": {
//       "primerNombre": "María",
//       "segundoNombre": "Elena"
//     },
//     "apellido": {
//       "primerApellido": "Rodríguez",
//       "segundoApellido": "López"
//     },
//     "fechaNacimiento": {
//       "dia": 15,
//       "mes": 8,
//       "anio": 1975
//     },
//     "especialidad": "Dermatología",
//     "cedula": "987654321",
//     "direccion": "Avenida XYZ, Ciudad",
//     "telefono": "555-987-6543",
//     "genero": "Femenino",
//     "correo": "maria.rodriguez@example.com",
//     "id": "D54321"
//   }
// ]