import React from 'react'
import { delete_icon, edit_icon,close } from '../../assets'

export const ModalConfirmationComponent = ({title, accion, handleClick, closeModal}) => {
  return (
    <section className='flex flex-col justify-center items-center px-5 py-10 bg-white rounded-md absolute min-w-[250px] w-2/6  space-y-6'>
      <div>
        <button onClick={closeModal} className='absolute w-[15px] top-0 right-0 mt-3 mr-3 hover:scale-105'>
          <img src={close} alt="closeIcon" className=''/>
        </button>
        <img src={accion === 'Eliminar' ? delete_icon : edit_icon} alt="accion_icon" className='w-[100px]'/>
      </div>
      <div className='flex flex-col justify-center items-center space-y-6'>
        <h1 className={`text-2xl ${accion === 'Eliminar' ? 'text-red-600' : 'text-primary'}`}>¿Esta seguro?</h1>
        <p className='w-[85%]'>¿De verdad quiere {accion === 'Eliminar' ? 'eliminar' : 'editar'} este campo? Esta accion {accion === 'Eliminar' ? ' no se puede deshacer.' : ' actualizará los campos.'}</p>
      </div>
      <div className='flex flex-row justify-center items-center space-x-2'>
        <button className={`text-white bg-slate-500 p-2 rounded-md w-24 hover:bg-slate-600 `}>Cancelar</button>
        <button className={`text-white ${accion === 'Eliminar' ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-green-600'} p-2 rounded-md w-24 `}>{accion === 'Eliminar' ? 'Eliminar' : 'Editar'}</button>
      </div>
    </section>
  )
}

export default ModalConfirmationComponent