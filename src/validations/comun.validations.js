import * as Yup from 'yup';

export const firstNameValidation = Yup.string().matches(/^[a-zA-Z\s]+$/, 'Solo se permiten letras').min(8, 'El nombre debe ser de almenos 8 caracteres').required('Campo obligatorio');

export const lastNameValidation = Yup.string().matches(/^[a-zA-Z\s]+$/, 'Solo se permiten letras').min(8, 'El apellido debe ser de almenos 8 caracteres').required('Campo obligatorio');

export const usernameValidation = Yup.string().min(5, 'Nombre de usuario debe ser al menos de 5 caracteres').required('Campo obligatorio');

export const especialidadValidation = Yup.string()
  .matches(/^[a-zA-Z\s]+$/, 'Solo se permiten letras')
  .min(8, 'La especialidad debe ser de al menos 8 caracteres')
  .test(
    'terminologia',
    'La especialidad debe contener una terminología válida (logia, gia)',
    value => {
      // Aquí realizamos la validación personalizada
      const terminologiasValidas = ['logia', 'gia'];

      // Verificamos si el valor incluye alguna de las terminologías válidas
      return terminologiasValidas.some(terminologia => value.includes(terminologia));
    }
  )
  .required('Campo obligatorio');

export const idValidation = Yup.number('Solo números').typeError('Formato de cédula no válido, solo se permiten números').integer('Formato de cédula no valido').min(100000, 'Formato de cédula no válido').max(9999999999, 'Formato de cédula no válido').required('Campo obligatorio');

export const addressValidation = Yup.string().min(3, 'Debe ser una dirección válida').required('Campo obligatorio');

export const emailValidation = Yup.string().email('Debe ser un correo válido').required('Campo obligatorio');

export const passworValidation = Yup.string().min(5, 'La contraseña debe tener al menos 5 caracteres').required('Campo obligatorio');

export const confirmPasswordValidation = (identifier) => Yup.string().oneOf([Yup.ref(identifier), null], 'Las contraseñas no coinciden').required('Campo requerido');

export const birthdateValidation = Yup.date().max(new Date(), 'La fecha de nacimiento no puede ser posterior a la fecha actual').min(new Date('1900-01-01'), 'La fecha de nacimiento no puede ser anterior al año 1900').required('Campo obligatorio');

export const phoneValidation = Yup.string()
  .matches(/^[0-9]+$/, 'Solo se permiten números')
  .matches(/^(0424|0414|0416|0412)\d{7}$/, 'Válidos (0424 | 0414 | 0416 | 0412)')
  .max(11, 'El número de teléfono debe tener 11 dígitos')
  .required('Campo obligatorio');

export const cedulaValidation = Yup.number('Solo números')
  .typeError('Solo se permiten números')
  .test('len', 'La cédula debe tener 8 caracteres', (value) => {
    const stringValue = String(value);
    return stringValue.length === 8;
  })
  .required('Campo obligatorio');

export const generoValidation = Yup.string().oneOf(['M', 'F', 'N/A'], 'Género no válido. Debe ser "M" para masculino o "F" para femenino').required('Campo obligatorio');

export const tipoUsuarioValidation = Yup.string().matches(/^[a-zA-Z\s]+$/, 'Solo se permiten letras').min(5, 'El tipo de usuario debe ser de almenos 5 caracteres').required('Campo obligatorio');

export const usernameValidationNotRequired = Yup.string().min(5, 'Nombre de usuario debe ser al menos de 5 caracteres');
export const passworValidationNotRequired = Yup.string().min(5, 'La contraseña debe tener al menos 5 caracteres');
export const tipoUsuarioValidationNotRequired = Yup.string().matches(/^[a-zA-Z\s]+$/, 'Solo se permiten letras').min(5, 'El tipo de usuario debe ser de almenos 5 caracteres')
