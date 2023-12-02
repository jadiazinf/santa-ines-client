import React, { useState } from 'react';
import axios from 'axios';
import { SelectComponent, UnfilledButton, FilledButton, InputComponent } from '../../components'
import { useFormik } from 'formik';
import { registerUserSchema } from '../../validations';
import { useCreateUserMutation } from '../../api';
import toast from 'react-hot-toast';

export const UserForm = ({ info, acction, onClose, handleClick, setReset }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      contrasena: '',
      userType: 'paciente',
    },
    validationSchema: registerUserSchema,
    onSubmit: (values) => {
      if (acction === 'crear'){
        toast.promise(
          new Promise((resolve, reject) => {
            const dataToSent = {
              username: values.username,
              password: values.contrasena,
              user_type: values.userType,
            }

            createUser(dataToSent)
              .then((response) => {
                if(response.error){
                  reject(new Error('Error al crear el usuario'));
                }else{
                  resolve('Usuario creado!');         //TODO-> cuando este caso puede dar un error?
                  setReset(prev => !prev);
                  onClose();
                }
              })
              .catch((error) => {
                reject(new Error(response.data.message));
              })
              setReset(prev => !prev);
              onClose();
          }),
          {
            loading: 'Cargando...',
            success: (message) => message,
            error: (error) => error.message,
          }
        );
      }
    },
  });

  const [createUser, { isLoading, isError }] = useCreateUserMutation();

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
            value={formik.username}
            error={formik.errors.username}
          />
          <InputComponent
            id="contrasena"
            name="contrasena"
            placeholder="Contraseña"
            type="password"
            onChange={formik.handleChange}
            value={formik.contrasena}
            error={formik.errors.contrasena}
          />
          <SelectComponent
            id='userType'
            name='userType'
            placeholder='Tipo de usuario'
            onChange={formik.handleChange}
            // value={'doctor'} aca se va a enviar el valor cuando se actualize el tipo de usuario 
            options={[
              { value: 'asistente', label: 'Asistente' },
              { value: 'superUsuario', label: 'Super Usuario' }
            ]}
          />
        </div>
        <div className='flex flex-row justify-start items-center'>
          <FilledButton text={!isLoading ? 'Crear' : 'Cargando...' } buttonHeight={40} buttonWidth={120} textSize={15} block={isLoading} type='submit' />
          <UnfilledButton text='Cancelar' buttonHeight={40} buttonWidth={120} textSize={15} block={isLoading} type='button' onClick={() =>{handleClick(); onClose()}} />
        </div>
      </form>
    </article>
  );
};