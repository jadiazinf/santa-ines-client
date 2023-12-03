import React, { useState } from 'react';
import axios from 'axios';
import { InputComponent } from '../inputs/input.component';
import { FilledButton } from '../buttons/filledbutton.component';
import { UnfilledButton } from '../buttons/unfilledbutton.component';

export const DoctorForm = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    cedula: '',
    telefono: '',
    genero: '',
    correo: '',
  });

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
      await axios.post('https://santainesapi.onrender.com/doctor/create', userData);
      console.log('Doctor created successfully!');
    } catch (error) {
      console.error('Error creating doctor:', error);
    }

    setUserData({
      nombre: '',
      apellido: '',
      especialidad: '',
      cedula: '',
      telefono: '',
      genero: '',
      correo: '',
    });
  };

  return (
    <article className='m-5'>
      <form onSubmit={handleSubmit} className='rounded-lg bg-gray-50 shadow-md p-5 grid grid-cols-2 gap-5 w-fit'>
        <InputComponent
          id='nombre'
          name='nombre'
          placeholder='Nombre'
          type='text'
          onChange={handleInputChange}
          value={userData.nombre}
        />
        <InputComponent
          id="apellido"
          name="apellido"
          placeholder="Apellido"
          type="text"
          onChange={handleInputChange}
          value={userData.apellido}
        />
        <InputComponent
          id="especialidad"
          name="especialidad"
          placeholder="Especialidad"
          type="text"
          onChange={handleInputChange}
          value={userData.especialidad}
        />
        <InputComponent
          id="cedula"
          name="cedula"
          placeholder="Cédula"
          type="text"
          onChange={handleInputChange}
          value={userData.cedula}
        />
        <InputComponent
          id="telefono"
          name="telefono"
          placeholder="Teléfono"
          type="tel"
          onChange={handleInputChange}
          value={userData.telefono}
        />
        <InputComponent
          id="genero"
          name="genero"
          placeholder="Género"
          type="text"
          onChange={handleInputChange}
          value={userData.genero}
        />
        <InputComponent
          id="correo"
          name="correo"
          placeholder="Correo"
          type="email"
          onChange={handleInputChange}
          value={userData.correo}
        />
      </form>
      <FilledButton text='Aceptar' buttonHeight={40} buttonWidth={120} textSize={15} onClick={handleSubmit}/>
      <UnfilledButton text='Cancelar' buttonHeight={40} buttonWidth={115} textSize={15} onClick='' />
    </article>
  );
};