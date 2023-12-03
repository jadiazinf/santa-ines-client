import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputComponent } from '../inputs/input.component';
import { FilledButton } from '../buttons/filledbutton.component';
import { UnfilledButton } from '../buttons/unfilledbutton.component';
import { SelectComponent } from '../select-tag/select-tag';

export const DoctorForm = ({ mode, doctorId }) => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    cedula: '',
    telefono: '',
    genero: '',
    correo: '',
  });

  useEffect(() => {
    if (mode === 'edit') {
      fetchDoctorData();
    }
  }, [mode, doctorId]);

  const fetchDoctorData = async () => {
    try {
      const response = await axios.get(`https://santainesapi.onrender.com/doctor/${doctorId}`);
      const doctorData = response.data;
      setUserData(doctorData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      if (mode === 'create') {
        await axios.post('https://santainesapi.onrender.com/doctor/create', userData);
        console.log('Doctor created successfully');
      } else if (mode === 'edit') {
        await axios.put(`https://santainesapi.onrender.com/doctor/modificate/${doctorId}`, userData);
        console.log('Doctor updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
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

  const handleCancel = () => {
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
    <article className="m-5">
      <form onSubmit={handleSubmit} className="rounded-lg bg-gray-50 shadow-md p-5 grid grid-cols-2 gap-5 w-fit">
        <InputComponent
          id="nombre"
          name="nombre"
          placeholder="Nombre"
          type="text"
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
        <SelectComponent
          id='genero'
          name='genero'
          placeholder='Género'
          onChange={handleInputChange}
          value={userData.genero}
          options={[
            { value: 'femenino', label: 'Femenino' },
            { value: 'masculino', label: 'Maculino' },
            { value: 'otro', label: 'Otro' }
          ]}
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
      <FilledButton text={mode === 'create' ? 'Crear' : 'Actualizar'} buttonHeight={40} buttonWidth={120} textSize={15} onClick={handleSubmit}/>
      <UnfilledButton text="Cancelar" buttonHeight={40} buttonWidth={115} textSize={15} onClick={handleCancel} />
    </article>
  );
};