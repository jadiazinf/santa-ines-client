import React from 'react'
import { AppointmentCreateForm, ButtonBack } from '../../components'
import { useSelector } from 'react-redux'

export const AppointmentFormPage = ({title}) => {
  const userName = useSelector(state => state.authenticatedUser.username)

  const onClick = () => {
    dispatch(crearCitaDate(''))
    dispatch(descripcionError(false))
    dispatch(crearCitaDescripcion(''));
    navigate(`../info-doctor/${userName}`);
  }
  return (
    <section className='flex flex-col justify-center items-center mx-24 my-20'>
      <div className='w-full flex justify-between'>
        <div className='flex flex-row justify-center items-center gap-5'>
          <ButtonBack onClick={onClick} />
          <div className=''>
            <h1 className='text-primary text-3xl w-[400px]'>{title} de Cita</h1>
            <p className=''>Complete los campos solicitados.</p>
          </div>
        </div>
      </div>
        <AppointmentCreateForm action={title}/>
    </section>
  )
}
