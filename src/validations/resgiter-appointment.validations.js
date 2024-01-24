import * as Yup from 'yup';

export const registerAppointmentSchema = Yup.object({
  descripcion: Yup.string('Solo letras').min(20, 'La descripcion debe ser mayor a 20 caracteres').required('Campo obligatorio'),
  appointmentDate: Yup.date().min(new Date(), 'La fecha de la cita debe ser posterior a la de hoy').required('Campo obligatorio'),
});