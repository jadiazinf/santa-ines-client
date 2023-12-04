import * as Yup from 'yup';
import { firstNameValidation, lastNameValidation, especialidadValidation, generoValidation, emailValidation, phoneValidation, cedulaValidation } from './comun.validations';

export const creationDoctorSchema = Yup.object({
  nombre: firstNameValidation,
  apellido: lastNameValidation,
  especialidad: especialidadValidation,
  cedula: cedulaValidation,
  telefono: phoneValidation,
  genero: generoValidation,
  correo: emailValidation,
});