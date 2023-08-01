import * as Yup from 'yup';
import { idValidation, passworValidation } from './comun.validations';

export const loginUserSchema = Yup.object({
  id: idValidation,
  password: passworValidation,
});
