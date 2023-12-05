import React, { useState } from 'react'

import { Calendar, AppointmentForm, FilledButton, UnfilledButton, PatientSelector, ModalInfoComponent } from "../../components";
import { Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmationComponent from '../confirmation-appointment/confirmationApointment.component';
import { useCreateAppointmentMutation, useUpdateAppointmentMutation } from '../../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { crearCitaDate, crearCitaDescripcion, crearPatient, descripcionError } from '../../store/reducers/crearCita.reducer';
import { useDisclosure } from '@nextui-org/react';

export const AppointmentCreateForm = ({ action }) => {
  const [reset, setReset] = useState(false);
  const [componentToShow, setComponentToShow] = useState(0)
  const doctorStored = useSelector(state => state.createAppointment.doctor)
  const dateStored = useSelector(state => state.createAppointment.date)
  const descriptionStored = useSelector(state => state.createAppointment.descripcion)
  const patientStored = useSelector(state => state.createAppointment.patient)
  const descriptionErrorStored = useSelector(state => state.createAppointment.descripcionError)
  const userName = useSelector(state => state.authenticatedUser.username)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let idEditable;
  let dateEditable;
  let patientEditable;
  let descripcionEditable;
  let statusEditable;

  if(action === 'Edición'){
    idEditable = useSelector(state => state.editAppointment.id)
    dateEditable = useSelector(state => state.editAppointment.date)
    patientEditable = useSelector(state => state.editAppointment.paciente)
    descripcionEditable = useSelector(state => state.editAppointment.descripcion)
    statusEditable = useSelector(state => state.editAppointment.status)
  }

  const [createAppointment] = useCreateAppointmentMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();

  const nextComponent = () => {
    if ((componentToShow === 0 && dateStored) || (componentToShow === 1 &&  patientStored.ID) || (componentToShow === 2 && descriptionErrorStored === false) || componentToShow === 3) {
      if (componentToShow < 3) {
        setComponentToShow(componentToShow + 1);
      } else {
        toast.promise(
          new Promise((resolve, reject) => {
            const info = {
              patientId: patientStored.id_number,
              doctorId: doctorStored.id.UUID,
              appointmentDate: dateStored,
              status: action !== 'Edición' ? 'Activa' : statusEditable,
              description: descriptionStored,
            }
            {action !== 'Edición'
              ? createAppointment(info)
                  .then((response) => {
                    if (response.data) {
                      dispatch(descripcionError(false))
                      dispatch(crearCitaDate(''))
                      dispatch(crearCitaDescripcion(''));
                      resolve('¡Cita creada!');
                      navigate(`../info-doctor/${userName}`);
                    } else {
                      reject(new Error(response.data.message));
                    }
                  })
                  .catch((error) => {
                    reject(new Error(error));
                  })
              : updateAppointment({ id: idEditable, appointment: info })
                  .then((response) => {
                    if (response.data) {
                      dispatch(descripcionError(false))
                      dispatch(crearCitaDate(''))
                      dispatch(crearPatient({}));
                      dispatch(crearCitaDescripcion(''));
                      resolve('¡Cita actualizada!');
                      navigate(`../info-doctor/${userName}`);
                    } else {
                      reject(new Error(response.data.message));
                    }
                  })
                  .catch((error) => {
                    reject(new Error(error));
                  })
            }
          }),
          {
            loading: 'Cargando...',
            success: (message) => message,
            error: (error) => error.message,
          }
        );
      }
    }else {
      toast.error('Por favor, complete los campos requeridos.');
    };
  };

  const backComponent = () => {
    switch (componentToShow) {
      case 0:
        dispatch(crearCitaDate(''))
        dispatch(descripcionError(false))
        dispatch(crearCitaDescripcion(''));
        dispatch(crearPatient({}));
        navigate(`../info-doctor/${userName}`);
        break;
      case 1:
        dispatch(crearCitaDate(''))
        dispatch(crearPatient({}));
        break;
      case 2:
        dispatch(descripcionError(false))
        dispatch(crearPatient({}));
        break;
      case 3:
        dispatch(descripcionError(true))
        dispatch(crearCitaDescripcion(''));
        break;
      default:
        break;
    }
    if (componentToShow > 0) {
      setComponentToShow(componentToShow - 1);
    }
  }
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className='flex flex-col  h-full justify-center items-center'>
      <ModalInfoComponent isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} setReset={setReset}/>
      {componentToShow <= 3 && (
        <div className='absolute top-24 right-44 flex flex-row gap-10'>
          <UnfilledButton onClick={backComponent} class={`font-bold py-2 px-4 rounded w-[100px] border-primary border-2 text-primary hover:border-green-600 hover:text-green-600`} text={componentToShow === 0 ? 'Cancelar' : 'Volver'} type='submit'/>
          <FilledButton onClick={nextComponent} class={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-[100px]`} text={componentToShow === 2 ? action !== 'Edición' ? 'Crear' : 'Actualizar' : 'Siguiente'} type='submit'/>
        </div>
      )}
      <div className='flex flex-col justify-center items-center'>
        {componentToShow === 0 && <Calendar touch={action !== 'Edición'? false : true} dateEditable={ new Date(dateEditable) } dateEditable1={ dateEditable } />}
        {componentToShow === 1 && <PatientSelector patientEditable={patientEditable} onOpen={onOpen}/>}
        {componentToShow === 2 && <AppointmentForm edited={action !== 'Edición'? false : true} descripcionEditable={descripcionEditable}/>}
        {componentToShow === 3 && <ConfirmationComponent edited={action !== 'Edición'? false : true} doctorStored={doctorStored} patientStored={patientStored} dateStored={dateStored} descriptionStored={descriptionStored}/>}
      </div>
      <div className='m-5 w-full'>
        <Steps
          className='text-red-500'
          current={componentToShow}
          items={[
            {
              title: 'Horario',
              description: 'Seleccione la fecha y hora.',
            },
            {
              title: 'Paciente',
              description: 'Seleccione el paciente.',
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
    </div>
  )
}
