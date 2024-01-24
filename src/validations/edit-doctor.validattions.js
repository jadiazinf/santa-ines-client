import * as Yup from 'yup';
import { firstNameValidation, lastNameValidation, especialidadValidation, cedulaValidation, phoneValidation, emailValidation, generoValidation,  } from './comun.validations';

export const editDoctorSchema = Yup.object({
  nombre : firstNameValidation,
  apellido : lastNameValidation,
  cedula: cedulaValidation,
  telefono: phoneValidation,
  genero: generoValidation,
  correo: emailValidation
});
