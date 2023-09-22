import React, { useState } from 'react'

import { DoctorSelector, Calendar, AppointmentForm } from "../../components";
import { Popover, Steps } from 'antd';
import { useSelector } from 'react-redux';

export const AppointmentFormPrueba = () => {
  const [componentToShow, setComponentToShow] = useState(0)
  const doctorStored = useSelector(state => state.createAppointment.doctor)
  const dateStored = useSelector(state => state.createAppointment.date)
  const descriptionStored = useSelector(state => state.createAppointment.description)
  const descriptionErrorStored = useSelector(state => state.createAppointment.descripcionError)
  console.log("🚀 ~ file: form.component.jsx:13 ~ AppointmentFormPrueba ~ descriptionErrorStored:", descriptionErrorStored)

  const nextComponent = () => {
    if ((componentToShow === 0 && Object.keys(doctorStored).length !== 0) || (componentToShow === 1 && dateStored) || (componentToShow === 2 && descriptionErrorStored === false)) {
      if (componentToShow < 2) {
        setComponentToShow(componentToShow + 1);
      } else {
        setComponentToShow(0);
      }
    }
  };
  return (
    <div className='flex flex-col  h-full justify-center items-center'>
      <div className='flex flex-col justify-center items-center'>
        {componentToShow === 0 && <DoctorSelector />}
        {componentToShow === 1 && <Calendar />}
        {componentToShow === 2 && <AppointmentForm />}
      </div>
      <div className='w-[70%] m-5'>
        <Steps
          className='text-red-500'
          current={componentToShow}
          items={[
            {
              title: 'Doctor',
              description: 'Seleccione un doctor.',
            },
            {
              title: 'Horario',
              description: 'Seleccione la fecha y hora.',
            },
            {
              title: 'Descripción',
              description: 'Datos importantes.',
            },
          ]}
        />
      </div>
      {componentToShow <= 2 && (
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded absolute top-14 right-14" onClick={nextComponent}>
          {componentToShow === 2 ? 'Finalizar' : 'Siguiente'}
        </button>
      )}


    </div>
  )
}
