import { FilledButton, InputComponent, SelectComponent } from '../../components';
import { useFormik } from 'formik';
import { editDoctorSchema, } from '../../validations';
import { useUpdateDoctorMutation } from '../../api';
import toast from 'react-hot-toast';
import { capitalizeFirstLetter } from '../../helpers/capitalize.helper';
import { especialidadesOptions } from '../constanst';


export const DoctorInfo = ({ info }) => {
  const formik = useFormik({
    initialValues: {
      nombre: capitalizeFirstLetter(info.nombre.cuerpo),
      apellido: capitalizeFirstLetter(info.apellido.cuerpo),
      especialidad: info.especialidad || 'Adolescentología',
      cedula: info.cedula,
      telefono: info.telefono,
      genero: info.genero,
      correo: info.correo.correo,
    },
    validationSchema: editDoctorSchema,
    onSubmit: (values) => {
      toast.promise(
        new Promise((resolve, reject) => {
          const updatedDoctor = {
            data: {
              nombre: capitalizeFirstLetter(values.nombre),
              apellido:capitalizeFirstLetter(values.apellido),
              especialidad: capitalizeFirstLetter(values.especialidad),
              cedula: values.cedula,
              telefono: values.telefono,
              genero: values.genero,
              correo: values.correo,
            },
            id: info.cedula,
          }
          updateDoctor(updatedDoctor)
            .then((response) => {
              if(response.error){
                reject(new Error(response.error.data))
              } else{
                resolve('¡Doctor editado correctamente!');
              }
            })
            .catch((error) => {
              reject(new Error(response.data.message));
            })
        }),
        {
          loading: 'Cargando...',
          success: (message) => message,
          error: (error) => error.message,
        }
      );
    },
  });
  const [updateDoctor, { isLoading, isError }] = useUpdateDoctorMutation();

  return(
    <section className='rounded-lg bg-gray-50 shadow-md p-5'>
      <form onSubmit={formik.handleSubmit}  className='grid grid-cols-2 gap-5 w-full'>
        <InputComponent
          placeholder='Nombre'
          label='Nombre'
          name='nombre'
          value={formik.values.nombre}
          onChange={formik.handleChange}
          error={formik.errors.nombre}
          className1={'w-full'}
        />
        <InputComponent
          placeholder='Apellido'
          label='Apellido'
          name='apellido'
          value={formik.values.apellido}
          onChange={formik.handleChange}
          error={formik.errors.apellido}
          className1={'w-full'}
        />
          <SelectComponent
            id='especialidad'
            name='especialidad'
            placeholder='Especialidad'
            onChange={formik.handleChange}
            value={formik.values.especialidad}
            options={especialidadesOptions}
            className1={'w-full'}
          />
        <InputComponent
          placeholder='Cédula'
          label='Cédula'
          name='cedula'
          value={formik.values.cedula}
          onChange={formik.handleChange}
          error={formik.errors.cedula}
          className1={'w-full'}
        />
        <InputComponent
          placeholder='Teléfono'
          label='Telefono'
          name='telefono'
          value={formik.values.telefono}
          onChange={formik.handleChange}
          error={formik.errors.telefono}
          className1={'w-full'}
        />
        <SelectComponent
          id='genero'
          name='genero'
          placeholder='Género'
          onChange={formik.handleChange}
          value={formik.values.genero}
          options={[
            { value: 'F', label: 'Femenino' },
            { value: 'M', label: 'Masculino' },
            { value: 'N/A', label: 'No aplica' }
          ]}
          className1={'w-full'}
        />
        <InputComponent
          placeholder='Correo'
          label='Correo'
          name='correo'
          value={formik.values.correo}
          onChange={formik.handleChange}
          error={formik.errors.correo}
          className1={'w-full'}
        />
        <FilledButton text={!isLoading ? 'Actualizar' : 'Cargando...' } block={isLoading} type='submit'/>
      </form>
    </section>
  )
}