import React from 'react'
import { userIcon } from '../../assets'
import { Image } from '@nextui-org/react'
import { UserInfo } from '../../components'
import { useSelector } from 'react-redux'

export const PerfilComponent = () => {
  const { username, typeUser } = useSelector( state => state.authenticatedUser)
  return (
    <section className='w-full flex flex-row justify-between items-center mt-10'>
      <div className='flex justify-center items-center flex-1'>
        <Image src={ userIcon } alt="background" className='z-10 w-2/4 m-auto'/>
      </div>
      <div className='flex justify-start items-center flex-1'>
        <UserInfo info={{ username: username, password: '', user_type: typeUser }}/>
      </div>
    </section>
  )
}
