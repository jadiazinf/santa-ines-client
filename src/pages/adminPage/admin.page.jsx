import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FilledButton, ModalInfoComponent, TabsComponent, TableComponent } from '../../components'
import { useGetPatientsMutation, useGetUsersMutation, useGetAllDoctorsMutation } from '../../api'
import { saveDoctors, savePatients, saveUsers } from '../../store/reducers/userAdmin.reducer'
import { capitalizeFirstLetter } from '../../helpers/capitalize.helper'
import { useDisclosure } from '@nextui-org/react'
import { detalleCreacionEdicion } from '../../store/reducers/detalleCita.reducer'
import { columnsDoctors, columnsPatients, columnsUsers } from '../../components/constanst'

export const AdminPage = () => {
  const dispatch = useDispatch();
  const { username } = useSelector( state => state.authenticatedUser)
  const [getAllDoctors] = useGetAllDoctorsMutation();
  const [getAllUsers] = useGetUsersMutation();
  const [getPatients] = useGetPatientsMutation();
  const [activeTab, setActiveTab] = useState('users');
  const [reset, setReset] = useState(false);

  useEffect(() => {
    Promise.all([getAllUsers(), getAllDoctors(), getPatients()])
      .then(([usersResponse, doctorsResponse, patientsResponse]) => {
        dispatch(saveUsers(usersResponse.data));
        dispatch(saveDoctors(doctorsResponse.data));
        dispatch(savePatients(patientsResponse.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [reset]);

  const { doctors, users, patients } = useSelector( state => state.userAdmin)

  const tabs = [
    { id: "users", label: "Usuarios", component: <TableComponent key={1} columns={columnsUsers} data={users} action={'users'} path={'../appointmentForm/update/user'}  setReset={setReset}/> },
    { id: "doctors", label: "Doctores", component: <TableComponent key={2} columns={columnsDoctors} data={doctors} action={'doctors'} path={'../appointmentForm/update/doctors'}  setReset={setReset}/> },
    { id: "patients", label: "Pacientes", component: <TableComponent columns={columnsPatients}  data={patients} action={'patients'} path={'../appointmentForm/update/patients'}  setReset={setReset}/> },
  ];

  const onClick = () => {
    switch (activeTab) {
      case 'users':
        dispatch(detalleCreacionEdicion('crearUsuario'));
        break;
      case 'doctors':
        dispatch(detalleCreacionEdicion('crearDoctor'));
        break;
      case 'patients':
        dispatch(detalleCreacionEdicion('crearPaciente'));
        break;
      default:
        break;
    }
  }

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <section className="flex flex-col items-center">
      <ModalInfoComponent isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} setReset={setReset}/>
      <div className='flex justify-between w-[80%]'>
        <div className=''>
          <h1 className='text-primary text-3xl '>{capitalizeFirstLetter(username)}</h1>
          <p className=''>Por favor, seleccione la pestaña que desee consultar</p>
        </div>
        <FilledButton text={`Agregar ${selectedString(activeTab)}`} onClick={() =>{ onClick(); onOpen()}} />
      </div>
      <TabsComponent tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    </section>
  );
}

function selectedString(tab) {
  switch (tab) {
    case 'users':
      return 'Usuario';
    case 'doctors':
      return 'Doctor';
    case 'patients':
      return 'Paciente';
    default:
      break;
  }
}