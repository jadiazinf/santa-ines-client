import React, { useState, useEffect } from 'react';
import { InputComponent } from '../inputs/input.component';
import { FilledButton } from '../buttons/filledbutton.component';
import { UnfilledButton } from '../buttons/unfilledbutton.component';
import { SelectComponent } from '../select-tag/select-tag';
import { useCreateDoctorMutation, useUpdateDoctorMutation } from '../../api';
import { creationDoctorSchema } from '../../validations/doctor-form.validations';
import { useFormik } from 'formik';
import { capitalizeFirstLetter } from '../../helpers/capitalize.helper';
import { especialidadesOptions } from '../constanst';
import toast from 'react-hot-toast';

export const DoctorForm = ({ acction, onClose, handleClick, setReset, object }) => {
  //-------------------------------------------------
  const [mutationFunction, mutationOptions] = acction === 'Crear'
    ? useCreateDoctorMutation()
    : useUpdateDoctorMutation();

    const { isLoading, isError } = mutationOptions;

    const formik = useFormik({
    initialValues: {
      nombre:  object && object.Nombre ? capitalizeFirstLetter(object.Nombre) : '',
      apellido: object && object.Apellido ? capitalizeFirstLetter(object.Apellido) : '',
      especialidad: object && object.Especialidad ? object.Especialidad : 'Adolescentología',
      cedula: object && object.Cédula ? object.Cédula : '',
      telefono: object && object.Teléfono ? object.Teléfono : '',
      genero: object && object.Género ? object.Género : 'F',
      correo: object && object.Correo ? object.Correo : '',
    },
    validationSchema: creationDoctorSchema,
    onSubmit: (values) => {
      toast.promise(
        new Promise((resolve, reject) => {
          // let dataToSent = {};
          // if (acction === 'Crear'){
          //   dataToSent = {
          //     name: capitalizeFirstLetter(values.name),
          //     lastname: capitalizeFirstLetter(values.lastname),
          //     address: capitalizeFirstLetter(values.address),
          //     birthday: values.birthday,
          //     id_number: values.id_number,
          //     phone_number: values.phone_number,
          //     gender: values.gender,
          //     email: values.email
          //   };
          // }else{
          //   dataToSent = {
          //     data: {
          //       name: capitalizeFirstLetter(values.name),
          //       lastname: capitalizeFirstLetter(values.lastname),
          //       address: capitalizeFirstLetter(values.address),
          //       birthday: values.birthday,
          //       id_number: values.id_number,
          //       phone_number: values.phone_number,
          //       gender: values.gender,
          //       email: values.email
          //     },
          //     id: object.Id,
          //   };
          // }
          mutationFunction(values)
            .then((response) => {
              if (response.error) {
                reject(new Error(`Error: ${response.error.data}`));
              } else {
                resolve(`Doctor ${acction === 'Crear' ? 'creado' : 'editado'} correctamente!`);
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
    <article className="m-5">
      <form onSubmit={formik.handleSubmit}>
        <div className="rounded-lg bg-gray-50 shadow-md p-5 grid grid-cols-2 gap-5">
          <InputComponent
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            error={formik.errors.nombre}
            className1={'w-full'}
          />
          <InputComponent
            id="apellido"
            name="apellido"
            placeholder="Apellido"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.apellido}
            error={formik.errors.apellido}
            className1={'w-full'}
          />
          <InputComponent
            id='cedula'
            name='cedula'
            placeholder='Número de cédula'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.cedula}
            error={formik.errors.cedula}
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
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            type="tel"
            onChange={formik.handleChange}
            value={formik.values.telefono}
            error={formik.errors.telefono}
            className1={'w-full'}
          />
          <InputComponent
            id="correo"
            name="correo"
            placeholder="Correo"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.correo}
            error={formik.errors.correo}
            className1={'w-full'}
          />
        </div>
        <div className='flex flex-row justify-end items-center'>
          <FilledButton text={!isLoading ? acction : 'Cargando...' } buttonHeight={40} buttonWidth={120} textSize={15} block={isLoading} type='submit'/>
          <UnfilledButton text='Cancelar' buttonHeight={40} buttonWidth={120} textSize={15} block={isLoading} type='button' onClick={() =>{handleClick(); onClose()}} />
        </div>
      </form>
    </article>
  );
};
