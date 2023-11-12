import * as Yup from 'yup';

export const firstNameValidation = Yup.string('Solo letras').min(3, 'El nombre debe ser un nombre real').required('Campo obligatorio');

export const lastNameValidation = Yup.string('Solo letras').min(3, 'El apellido debe ser un apellido real').required('Campo obligatorio');

export const idValidation = Yup.number('Solo números').typeError('Formato de cédula no válido, solo se permiten números').integer('Formato de cédula no valido').min(100000, 'Formato de cédula no válido').max(9999999999, 'Formato de cédula no válido').required('Campo obligatorio');

export const addressValidation = Yup.string().min(3, 'Debe ser una dirección válida').required('Campo obligatorio');

export const emailValidation = Yup.string().email('Debe ser un correo válido').required('Campo obligatorio');

export const passworValidation = Yup.string().min(8, 'La contraseña debe tener al menos 8 caracteres').required('Campo obligatorio');

export const confirmPasswordValidation = (identifier) => Yup.string().oneOf([Yup.ref(identifier), null], 'Las contraseñas no coinciden').required('Campo requerido');

export const birthdateValidation = Yup.date().max(new Date(), 'La fecha de nacimiento no puede ser posterior a la fecha actual').min(new Date('1900-01-01'), 'La fecha de nacimiento no puede ser anterior al año 1900').required('Campo obligatorio');

export const telefonoValidation = Yup.number('Solo números').typeError('Formato de número de teléfono no válido, solo se permiten números').integer('Formato de número de teléfono no valido').min(100000, 'Formato de número de teléfono no válido').max(9999999999, 'Formato de número de teléfono no válido').required('Campo obligatorio');

export const especialidadValidation = Yup.string().min(3, 'Debe ser una especialidad válida').required('Campo obligatorio');

export const generoValidation = Yup.string().required('Campo obligatorio');