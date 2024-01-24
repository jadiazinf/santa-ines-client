import React from 'react'
import { logo_SantaInes } from '../../assets'
import { LoginForm } from '../../components'

export const LoginPage = () => {
  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col'>
        <img src={ logo_SantaInes } alt="logo" className="w-[170px] mb-14 " />
        <div className='space-y-11'>
          <h1 className='text-primary text-3xl w-[400px]'>Bienvenido a su sistema agendador de citas.</h1>
          <LoginForm />
        </div>
      </div>
    </section>
  )
}
