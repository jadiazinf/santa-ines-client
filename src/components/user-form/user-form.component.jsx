import React, { useState } from 'react';
import axios from 'axios';
import { InputComponent } from '../inputs/input.component';
import { FilledButton } from '../buttons/filledbutton.component';
import { UnfilledButton } from '../buttons/unfilledbutton.component';

export const UserForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    user_type: '',
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
      await axios.post('https://santainesapi.onrender.com/user/create', userData);
      console.log('User creado');
    } catch (error) {
      console.error('Error:', error);
    }

    setUserData({
      username: '',
      password: '',
      user_type: '',
    });
  };

  return (
    <article className='m-5'>
      <form onSubmit={handleSubmit} className='m-5 rounded-lg bg-gray-50 shadow-md p-5 grid grid-cols-1 gap-5 w-fit'>
        <InputComponent
          id='username'
          name='username'
          placeholder='Nombre de usuario'
          type='text'
          onChange={handleInputChange}
          value={userData.username}
        />
        <InputComponent
          id="password"
          name="password"
          placeholder="Contraseña"
          type="text"
          onChange={handleInputChange}
          value={userData.password}
        />
        <InputComponent
          id="user_type"
          name="user_type"
          placeholder="Tipo de usuario"
          type="text"
          onChange={handleInputChange}
          value={userData.user_type}
        />
      </form>
      <FilledButton text='Crear' buttonHeight={40} buttonWidth={120} textSize={15} onClick={handleSubmit}/>
      <UnfilledButton text='Cancelar' buttonHeight={40} buttonWidth={120} textSize={15} onClick='' />
    </article>
  );
};