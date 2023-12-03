import React, { useState } from 'react';
import axios from 'axios';
import { InputComponent } from '../inputs/input.component';
import { FilledButton } from '../buttons/filledbutton.component';
import { UnfilledButton } from '../buttons/unfilledbutton.component';
import { SelectDateComponent } from '../select-date/select-date';
import DatePicker from 'react-datepicker';

export const PatientForm = () => {
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

  const [selectedDate, setSelectedDate] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://santainesapi.onrender.com/patient/', userData);
      console.log('Patient created successfully!');
    } catch (error) {
      console.error('Error creating patient:', error);
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
      <form onSubmit={handleSubmit} className='rounded-lg bg-gray-50 shadow-md p-5 grid grid-cols-2 gap-5 w-fit'>
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
        <SelectDateComponent
          id='birthday'
          name='birthday'
          placeholder='Fecha de nacimiento'
          value={selectedDate}
          onChange={setSelectedDate}
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
      <FilledButton text='Crear' buttonHeight={40} buttonWidth={120} textSize={15} onClick={handleSubmit}/>
      <UnfilledButton text='Cancelar' buttonHeight={40} buttonWidth={115} textSize={15} onClick='' />
    </article>
  );
};