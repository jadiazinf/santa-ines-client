import * as Yup from 'yup';
import { addressValidation,
         birthdateValidation,
         confirmPasswordValidation,
         emailValidation,
         firstNameValidation,
         idValidation,
         lastNameValidation,
         passworValidation } from './comun.validations';

export const registerUserSchema = Yup.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  id: idValidation,
  address: addressValidation,
  email: emailValidation,
  password: passworValidation,
  confirmPassword: confirmPasswordValidation('password'),
  birthdate: birthdateValidation
});
