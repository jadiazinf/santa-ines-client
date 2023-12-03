import * as Yup from 'yup';
import {
  addressValidation,
  birthdateValidation,
  cedulaValidation,
  emailValidation,
  firstNameValidation,
  generoValidation,
  lastNameValidation,
  phoneValidation,
} from './comun.validations';

export const registerPatientSchema = Yup.object({
  name: firstNameValidation,
  lastname: lastNameValidation,
  address: addressValidation,
  birthday: birthdateValidation,
  id_number: cedulaValidation,
  phone_number: phoneValidation,
  gender: generoValidation,
  email: emailValidation,
});