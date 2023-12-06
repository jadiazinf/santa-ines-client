import React from 'react';
import { SelectComponent, UnfilledButton, FilledButton, InputComponent } from '../../components'
import { useFormik } from 'formik';
import { registerUserSchema } from '../../validations';
import { useCreateUserMutation, useUpdateUserMutation } from '../../api';
import toast from 'react-hot-toast';

export const UserForm = ({ acction, onClose, handleClick, setReset, object }) => {

  const [mutationFunction, mutationOptions] = acction === 'Crear'
    ? useCreateUserMutation()
    : useUpdateUserMutation();

  const { isLoading, isError } = mutationOptions;

  const formik = useFormik({
    initialValues: {
      username:  object && object.Usuario ? object.Usuario : '',
      contrasena: object && object.Contraseña ? object.Contraseña : '',
      userType: object && object.Tipo_usuario ? object.Tipo_usuario : 'asistente',
    },
    validationSchema: registerUserSchema,
    onSubmit: (values) => {
      toast.promise(
        new Promise((resolve, reject) => {
          let dataToSent = {};
          if (acction === 'Crear') {
            dataToSent = {
              username: values.username,
              password: values.contrasena,
              user_type: values.userType,
            };
          }else{
            const selectedFields = {
              username: values.username,
              password: values.contrasena,
              user_type: values.userType,
            };
            dataToSent = {
              userName: object.Usuario,
              selectedFields,
            }
          }
          mutationFunction(dataToSent)
            .then((response) => {
              if (response.error) {
                reject(new Error(`Error: ${response.error.data}`));
              } else {
                resolve(`Usuario ${acction === 'Crear' ? 'creado' : 'editado'} correctamente!`);
                setReset((prev) => !prev);
                onClose();
              }
            })
            .catch((error) => {
              reject(new Error(error.message));
            });
        }),
        {
          loading: 'Cargando...',
          success: (message) => message,
          error: (error) => error.message,
        }
      );
    },
  });

  return (
    <article className=''>
      <form onSubmit={formik.handleSubmit} className=''>
        <div className='rounded-lg bg-gray-50 shadow-md p-5 grid grid-cols-1 gap-5 w-fit'>
          <InputComponent
            id='username'
            name='username'
            placeholder='Nombre de usuario'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.username}
            error={formik.errors.username}
          />
          <InputComponent
            id="contrasena"
            name="contrasena"
            placeholder="Contraseña"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.contrasena}
            error={formik.errors.contrasena}
          />
          <SelectComponent
            id='userType'
            name='userType'
            placeholder='Tipo de usuario'
            onChange={formik.handleChange}
            value={formik.values.userType}
            options={[
              { value: 'asistente', label: 'Asistente' },
              { value: 'superUsuario', label: 'Super Usuario' }
            ]}
          />
        </div>
        <div className='flex flex-row justify-end items-center'>
          <FilledButton text={!isLoading ? acction : 'Cargando...' } buttonHeight={40} buttonWidth={120} textSize={15} block={isLoading} type='submit' />
          <UnfilledButton text='Cancelar' buttonHeight={40} buttonWidth={120} textSize={15} block={isLoading} type='button' onClick={() =>{handleClick(); onClose()}} />
        </div>
      </form>
    </article>
  );
};