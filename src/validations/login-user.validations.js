import * as Yup from 'yup';
import { passworValidation, usernameValidation } from './comun.validations';

export const loginUserSchema = Yup.object({
  username: usernameValidation,
  password: passworValidation,
});
