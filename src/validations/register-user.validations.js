import * as Yup from 'yup';
import {
  passworValidationNotRequired,
  tipoUsuarioValidationNotRequired,
  usernameValidationNotRequired
} from './comun.validations';

export const registerUserSchema = Yup.object({
  username: usernameValidationNotRequired,
  contrasena: passworValidationNotRequired,
  userType: tipoUsuarioValidationNotRequired,
});