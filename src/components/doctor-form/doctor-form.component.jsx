import React, { useState } from 'react';
import { InputComponent } from '../inputs/input.component';
import { FilledButton } from '../buttons/filledbutton.component';
import { UnfilledButton } from '../buttons/unfilledbutton.component';

export const DoctorForm = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    correo: '',
    telefono: '',
    especialidad: '',
    genero: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setUserData({
      nombre: '',
      apellido: '',
      cedula: '',
      correo: '',
      telefono: '',
      especialidad: '',
      genero: '',
    });
  };

  return (
    <article className='m-5'>
      <form onSubmit={handleSubmit} className='m-5 grid grid-cols-2 gap-5 w-full'>
        <InputComponent
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          type="text"
          onChange={handleInputChange}
          value={userData.name} />
        <InputComponent
          id="apellido"
          name="apellido"
          placeholder="Apellido"
          type="text"
          onChange={handleInputChange}
          value={userData.name} />
        <InputComponent
          id="cedula"
          name="cedula"
          placeholder="Cédula"
          type="text"
          onChange={handleInputChange}
          value={userData.email} />
        <InputComponent
          id="correo"
          name="correo"
          placeholder="Correo"
          type="email"
          onChange={handleInputChange}
          value={userData.email} />
        <InputComponent
          id="telefono"
          name="telefono"
          placeholder="Teléfono"
          type="tel"
          onChange={handleInputChange}
          value={userData.password} />
        <InputComponent
          id="especialidad"
          name="especialidad"
          placeholder="Especialidad"
          type="text"
          onChange={handleInputChange}
          value={userData.password} />
        <InputComponent
          id="genero"
          name="genero"
          placeholder="Género"
          type="text"
          onChange={handleInputChange}
          value={userData.password} />
      </form>
      <FilledButton text="Crear Doctor" buttonHeight={40} buttonWidth={120} textSize={15} onClick='' />
      <UnfilledButton text="Cancelar" buttonHeight={40} buttonWidth={90} textSize={15} onClick='' />
    </article>
  );
};