import React, { useEffect, useState } from 'react'
import { ButtonBack, PerfilComponent } from '../../components'
import { useGetInfoUserMutation } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../store/reducers/user.reducer';

export const PerfilPage = ({ action}) => {
  const dispatch = useDispatch();
  const [getInfoUser, { isLoading, isError }] = useGetInfoUserMutation();
  const { username } = useSelector( state => state.authenticatedUser)
  useEffect(() => {
    getInfoUser(username)
    .then((response) => {
      dispatch(editUser(response.data));
    })
    .catch((error) => {
      reject(new Error(response.data.message));
    })
  }, [])

  return (
    <section className="flex flex-col justify-start items-start m-10">
      <div className='flex flex-row justify-center items-center ml-20 gap-5'>
        <ButtonBack  style={''}/>
        <div>
          <h1 className='text-primary text-3xl w-[400px]'>Edicion de {action}</h1>
          <p className=''>Seleccione el doctor a consultar.</p>
        </div>
      </div>
      <PerfilComponent/>
    </section>
  )
}
