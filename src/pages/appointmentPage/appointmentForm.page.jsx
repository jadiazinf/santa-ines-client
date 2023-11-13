import React from 'react'
import { AppointmentCreateForm } from '../../components'

export const AppointmentFormPage = ({title}) => {
  return (
    <section className='flex flex-col justify-center items-center mx-24 my-20'>
      <div className='w-full flex justify-between'>
        <div>
          <h1 className='text-primary text-3xl w-[400px]'>{title} de Cita</h1>
          <p className=''>Complete los campos solicitados.</p>
        </div>
      </div>
        <AppointmentCreateForm action={title}/>
    </section>
  )
}
