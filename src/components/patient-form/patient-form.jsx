import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { SelectDateComponent, InputComponent, FilledButton, UnfilledButton, SelectComponent } from "../../components";
import { useCreatePatientMutation, useGetPatientsMutation, useUpdatePatientMutation } from '../../api';
import { useFormik } from 'formik';
import { registerPatientSchema, registerUserSchema } from '../../validations';
import toast from 'react-hot-toast';
import { utcToZonedTime } from 'date-fns-tz';
import { parseISO } from 'date-fns';
import { capitalizeFirstLetter } from '../../helpers/capitalize.helper';
import { useDispatch, useSelector } from 'react-redux';
import { savepatients } from '../../store/reducers/doctors.reducer';

export const PatientForm = ({ acction, onClose, handleClick, setReset, object }) => {
  const { accion } = useSelector( state => state.detalles)
  const dispatch = useDispatch()
  const [getPatients] = useGetPatientsMutation();
  const [selectedDate, setSelectedDate] = useState(
    object && object.Fecha_Nac ? utcToZonedTime(parseISO(object.Fecha_Nac), 'UTC') : null
  );
  //-------------------------------------------------
    const [mutationFunction, mutationOptions] = acction === 'Crear'
    ? useCreatePatientMutation()
    : useUpdatePatientMutation();

  const { isLoading, isError } = mutationOptions;
  const formik = useFormik({
    initialValues: {
      name:  object && object.Nombre ? capitalizeFirstLetter(object.Nombre) : '',
      lastname: object && object.Apellido ? capitalizeFirstLetter(object.Apellido) : '',
      address: object && object.Dirección ? capitalizeFirstLetter(object.Dirección) : '',
      birthday: object && object.Fecha_Nac ? object.Fecha_Nac : '',
      id_number: object && object.Cédula ? object.Cédula : '',
      phone_number: object && object.Teléfono ? object.Teléfono : '',
      gender: object && object.Género ? object.Género : 'F',
      email: object && object.Correo ? object.Correo : '',
    },
    validationSchema: registerPatientSchema,
    onSubmit: (values) => {
      toast.promise(
        new Promise((resolve, reject) => {
          let dataToSent = {};
          if (acction === 'Crear'){
            dataToSent = {
              name: capitalizeFirstLetter(values.name),
              lastname: capitalizeFirstLetter(values.lastname),
              address: capitalizeFirstLetter(values.address),
              birthday: values.birthday,
              id_number: values.id_number,
              phone_number: values.phone_number,
              gender: values.gender,
              email: values.email
            };
          }else{
            dataToSent = {
              data: {
                name: capitalizeFirstLetter(values.name),
                lastname: capitalizeFirstLetter(values.lastname),
                address: capitalizeFirstLetter(values.address),
                birthday: values.birthday,
                id_number: values.id_number,
                phone_number: values.phone_number,
                gender: values.gender,
                email: values.email
              },
              id: object.Id,
            };
          }
          mutationFunction(dataToSent)
            .then((response) => {
              if (response.error) {
                reject(new Error(`Error: ${response.error.data}`));
              } else {
                resolve(`Paciente ${acction === 'Crear' ? 'creado' : 'editado'} correctamente!`);
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
      if(accion === 'crearPacienteCita'){
        loadNewPatients();
      }
    },
  });

  const loadNewPatients = () => {
    setTimeout(() => {
      getPatients()
        .then(response => {
          dispatch(savepatients(response.data));
        })
        .catch(error => {
          reject(error);
        });
    }, "1000");
  }

  return (
    <article className=''>
      <form onSubmit={formik.handleSubmit} className=''>
        <div className='rounded-lg bg-gray-50 shadow-md p-5 grid grid-cols-2 gap-5'>
          <InputComponent
              id='name'
              name='name'
              placeholder='Nombre'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name}
              className1={'w-full'}
            />
            <InputComponent
              id='lastname'
              name='lastname'
              placeholder='Apellido'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.lastname}
              error={formik.errors.lastname}
              className1={'w-full'}
            />
            <InputComponent
              id='address'
              name='address'
              placeholder='Dirección'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.address}
              error={formik.errors.address}
              className1={'w-full'}
            />
            <SelectDateComponent
              id='birthday'
              name='birthday'
              placeholder='Fecha de nacimiento'
              value={selectedDate}
              onChange={(date) => {
                const año = date.getFullYear();
                const mes = (date.getMonth() + 1).toString().padStart(2, '0');  // Se suma 1 porque los meses comienzan desde 0
                const día = date.getDate().toString().padStart(2, '0');
                formik.setFieldValue('birthday', `${año}-${mes}-${día}`);
                setSelectedDate(date);
              }}
              className1={'w-full'}
            />
            <InputComponent
              id='id_number'
              name='id_number'
              placeholder='Número de cédula'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.id_number}
              error={formik.errors.id_number}
              className1={'w-full'}
            />
              <SelectComponent
                id='gender'
                name='gender'
                placeholder='Género'
                onChange={formik.handleChange}
                value={formik.values.gender}
                className1={'w-full'}
                options={[
                  { value: 'F', label: 'Femenino' },
                  { value: 'M', label: 'Masculino' },
                  { value: 'N/A', label: 'No aplica' }
                ]}
              />
            <InputComponent
              id='phone_number'
              name='phone_number'
              placeholder='Número de teléfono'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.phone_number}
              error={formik.errors.phone_number}
              className1={'w-full'}
            />
            <InputComponent
              id='email'
              name='email'
              placeholder='Correo'
              type='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.errors.email}
              className1={'w-full'}
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