import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputComponent } from '../inputs/input.component';
import { FilledButton } from '../buttons/filledbutton.component';
import { UnfilledButton } from '../buttons/unfilledbutton.component';

export const PatientForm = ({ mode, patientData, onSubmitSuccess }) => {
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    address: '',
    birthday: '',
    id_number: '',
    phone_number: '',
    gender: '',
    email: '',
  });

  useEffect(() => {
    if (mode === 'edit') {
      setUserData(patientData);
    }
  }, [mode, patientData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //if (mode === 'create') {
        await axios.post('https://santainesapi.onrender.com/patient/', userData);
        console.log('Patient created successfully');
      /* } else if (mode === 'edit') {
        await axios.put(`https://santainesapi.onrender.com/patient/${patientData.id}`, userData);
        console.log('Patient updated successfully');
      }
      if (onSubmitSuccess) {
        onSubmitSuccess();
      } */
    } catch (error) {
      console.error('Error:', error);
    }

    setUserData({
      name: '',
      lastname: '',
      address: '',
      birthday: '',
      id_number: '',
      phone_number: '',
      gender: '',
      email: '',
    });
  };

  return (
    <article className='m-5'>
      <form
        onSubmit={handleSubmit}
        className='rounded-lg bg-gray-50 shadow-md p-5 grid grid-cols-2 gap-5 w-fit'
      >
        <InputComponent
          id='name'
          name='name'
          placeholder='Nombre'
          type='text'
          onChange={handleInputChange}
          value={userData.name}
        />
        <InputComponent
          id='lastname'
          name='lastname'
          placeholder='Apellido'
          type='text'
          onChange={handleInputChange}
          value={userData.lastname}
        />
        <InputComponent
          id='address'
          name='address'
          placeholder='Dirección'
          type='text'
          onChange={handleInputChange}
          value={userData.address}
        />
        <InputComponent
          id='birthday'
          name='birthday'
          placeholder='Fecha de nacimiento'
          type='text'
          onChange={handleInputChange}
          value={userData.birthday}
        />
        <InputComponent
          id='id_number'
          name='id_number'
          placeholder='Número de cédula'
          type='text'
          onChange={handleInputChange}
          value={userData.id_number}
        />
        <InputComponent
          id='phone_number'
          name='phone_number'
          placeholder='Número de teléfono'
          type='text'
          onChange={handleInputChange}
          value={userData.phone_number}
        />
        <InputComponent
          id='gender'
          name='gender'
          placeholder='Género'
          type='text'
          onChange={handleInputChange}
          value={userData.gender}
        />
        <InputComponent
          id='email'
          name='email'
          placeholder='Correo'
          type='email'
          onChange={handleInputChange}
          value={userData.email}
        />
      </form>
      <FilledButton
        text={'Crear'}
        buttonHeight={40} buttonWidth={120} textSize={15} onClick={handleSubmit}
      />
      <UnfilledButton text='Cancelar' buttonHeight={40} buttonWidth={120} textSize={15} onClick='' />
    </article>
  );
};