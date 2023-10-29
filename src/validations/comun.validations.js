import * as Yup from 'yup';

export const firstNameValidation = Yup.string('Solo letras').min(8, 'El nombre debe ser de almenos 8 caracteres').required('Campo obligatorio');

export const lastNameValidation = Yup.string('Solo letras').min(8, 'El apellido debe ser de almenos 8 caracteres').required('Campo obligatorio');

export const usernameValidation = Yup.string().min(8, 'Nombre de usuario debe ser al menos de 8 caracteres').required('Campo obligatorio');

export const especialidadValidation = Yup.string('Solo letras').min(8, 'El apellido debe ser de almenos 8 caracteres').required('Campo obligatorio');

export const idValidation = Yup.number('Solo números').typeError('Formato de cédula no válido, solo se permiten números').integer('Formato de cédula no valido').min(100000, 'Formato de cédula no válido').max(9999999999, 'Formato de cédula no válido').required('Campo obligatorio');

export const addressValidation = Yup.string().min(3, 'Debe ser una dirección válida').required('Campo obligatorio');

export const emailValidation = Yup.string().email('Debe ser un correo válido').required('Campo obligatorio');

export const passworValidation = Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Campo obligatorio');

export const confirmPasswordValidation = (identifier) => Yup.string().oneOf([Yup.ref(identifier), null], 'Las contraseñas no coinciden').required('Campo requerido');

export const birthdateValidation = Yup.date().max(new Date(), 'La fecha de nacimiento no puede ser posterior a la fecha actual').min(new Date('1900-01-01'), 'La fecha de nacimiento no puede ser anterior al año 1900').required('Campo obligatorio');

export const phoneValidation = Yup.string().matches(/^\d{11}$/, 'Número de teléfono no válido').required('Campo obligatorio');

export const cedulaValidation = Yup.string().matches(/^\d{8}$/, 'Cédula no válida. El formato correcto es XXXXXXXX').required('Campo obligatorio');

export const generoValidation = Yup.string().oneOf(['M', 'F'], 'Género no válido. Debe ser "M" para masculino o "F" para femenino').required('Campo obligatorio');