import * as Yup from 'yup';
import { firstNameValidation, lastNameValidation, especialidadValidation, idValidation, telefonoValidation, generoValidation, emailValidation } from './comun.validations';

export const creationDoctorSchema = Yup.object({
  nombre: firstNameValidation,
  apellido: lastNameValidation,
  especialidad: especialidadValidation,
  cedula: idValidation,
  telefono: telefonoValidation,
  genero: generoValidation,
  correo: emailValidation,
});