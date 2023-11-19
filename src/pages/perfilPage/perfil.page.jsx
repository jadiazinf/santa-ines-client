import React from 'react'
import { PerfilComponent } from '../../components'
import { Image } from '@nextui-org/react'
import { backgroundPerfil } from '../../assets'

export const PerfilPage = () => {
  return (
    <section className="flex flex-col justify-center items-center m-10">
      <div className=''>
        <Image src={ backgroundPerfil } alt="background" className='z-10 scale-90'/>
        <Image src='https://avatars.githubusercontent.com/u/30373425?v=4' alt="user" width={200} className='absolute rounded-full -bottom-20 left-10 z-20'/>
      </div>
      <PerfilComponent />
    </section>
  )
}
