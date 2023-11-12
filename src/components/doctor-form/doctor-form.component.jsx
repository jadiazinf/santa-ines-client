import React, { useState } from 'react';
import axios from 'axios';
import { InputComponent } from '../inputs/input.component';
import { FilledButton } from '../buttons/filledbutton.component';
import { UnfilledButton } from '../buttons/unfilledbutton.component';
import { creationDoctorSchema } from '../../validations/doctor-form.validations';

export const DoctorForm = () => {

  const validationSchema = creationDoctorSchema;

  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    cedula: '',
    telefono: '',
    genero: '',
    correo: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    try {
      await validationSchema.validateAt(name, { [name]: value });
      setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } catch (error) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(userData, { abortEarly: false });
      await axios.post('https://santainesapi.onrender.com/doctor/create', userData);
      console.log('Doctor creado');
    } catch (error) {
      if (error.inner) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors);
      } else {
        console.error('Error creando al doctor:', error);
      }
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
      <form onSubmit={handleSubmit} className='m-5 rounded-lg bg-gray-50 shadow-md p-5 grid grid-cols-2 gap-5 w-fit'>
        <InputComponent
          id='nombre'
          name='nombre'
          placeholder='Nombre'
          type='text'
          onChange={handleInputChange}
          value={userData.nombre}
          error={validationErrors.nombre}
        />
        <InputComponent
          id="apellido"
          name="apellido"
          placeholder="Apellido"
          type="text"
          onChange={handleInputChange}
          value={userData.apellido}
          error={validationErrors.apellido}
        />
        <InputComponent
          id="especialidad"
          name="especialidad"
          placeholder="Especialidad"
          type="text"
          onChange={handleInputChange}
          value={userData.especialidad}
          error={validationErrors.especialidad}
        />
        <InputComponent
          id="cedula"
          name="cedula"
          placeholder="Cédula"
          type="text"
          onChange={handleInputChange}
          value={userData.cedula}
          error={validationErrors.cedula}
        />
        <InputComponent
          id="telefono"
          name="telefono"
          placeholder="Teléfono"
          type="tel"
          onChange={handleInputChange}
          value={userData.telefono}
          error={validationErrors.telefono}
        />
        <InputComponent
          id="genero"
          name="genero"
          placeholder="Género"
          type="text"
          onChange={handleInputChange}
          value={userData.genero}
          error={validationErrors.genero}
        />
        <InputComponent
          id="correo"
          name="correo"
          placeholder="Correo"
          type="email"
          onChange={handleInputChange}
          value={userData.correo}
          error={validationErrors.correo}
        />
      </form>
      <FilledButton text='Crear Doctor' buttonHeight={40} buttonWidth={120} textSize={15} onClick={handleSubmit}/>
      <UnfilledButton text='Cancelar' buttonHeight={40} buttonWidth={90} textSize={15} onClick='' />
    </article>
  );
};