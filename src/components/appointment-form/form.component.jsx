import React, { useState } from 'react'

import { DoctorSelector, Calendar, AppointmentForm } from "../../components";
import { Popover, Steps } from 'antd';
import { useSelector } from 'react-redux';
import ConfirmationComponent from '../confirmation-appointment/confirmationApointment.component';

export const AppointmentFormPrueba = () => {
  const [componentToShow, setComponentToShow] = useState(0)
  const doctorStored = useSelector(state => state.createAppointment.doctor)
  const dateStored = useSelector(state => state.createAppointment.date)
  const descriptionStored = useSelector(state => state.createAppointment.descripcion)
  const descriptionErrorStored = useSelector(state => state.createAppointment.descripcionError)

  const nextComponent = () => {
    if ((componentToShow === 0 && Object.keys(doctorStored).length !== 0) || (componentToShow === 1 && dateStored) || (componentToShow === 2 && descriptionErrorStored === false || componentToShow === 3)) {
      if (componentToShow < 3) {
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
        {componentToShow === 3 && <ConfirmationComponent doctorStored={doctorStored} dateStored={dateStored} descriptionStored={descriptionStored}/>}
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
            {
              title: 'Confirmación',
              description: 'Verifique los datos de su cita.',
            },
          ]}
        />
      </div>
      {componentToShow <= 3 && (
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded absolute top-14 right-14" onClick={nextComponent}>
          {componentToShow === 3 ? 'Finalizar' : 'Siguiente'}
        </button>
      )}


    </div>
  )
}
