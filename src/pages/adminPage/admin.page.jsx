import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { TabsComponent } from '../../components'
import { TableComponent } from '../../components/table/table.component'
import { useGetDoctorsMutation, useGetPatientsMutation, useGetUsersMutation } from '../../api'
import { saveDoctors, savePatients, saveUsers } from '../../store/reducers/userAdmin.reducer'
import { capitalizeFirstLetter } from '../../helpers/capitalize.helper'

export const AdminPage = () => {
  const dispatch = useDispatch();
  const  { userName } = useParams();
  const [getDoctors] = useGetDoctorsMutation();
  const [getAllUsers] = useGetUsersMutation();
  const [getPatients] = useGetPatientsMutation();

  useEffect(() => {
    Promise.all([getAllUsers(), getDoctors(), getPatients()])
      .then(([usersResponse, doctorsResponse, patientsResponse]) => {
        dispatch(saveUsers(usersResponse.data));
        dispatch(saveDoctors(doctorsResponse.data));
        dispatch(savePatients(patientsResponse.data));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [])

  const columnsUsers = [
    {name: "Id", uid: "ID"},
    {name: "Nombre", uid: "username"},
    {name: "Contraseña", uid: "password"},
    {name: "Tipo usuario", uid: "user_type"},
    {name: "Acciones", uid: "actions"},
  ];

  const columnsDoctors = [
    {name: "Cedúla", uid: "cedula"},
    {name: "Nombre", uid: "nombre"},
    {name: "Apellido", uid: "apellido"},
    {name: "Especialidad", uid: "especialidad"},
    {name: "Teléfono", uid: "telefono"},
    {name: "Correo", uid: "correo"},
    {name: "Acciones", uid: "actions"},
  ]

  const columnsPatients = [
    {name: "Cedúla", uid: "id_number"},
    {name: "Nombre", uid: "name"},
    {name: "Apellido", uid: "lastname"},
    {name: "Fecha de nacimiento", uid: "birthday"},
    {name: "Teléfono", uid: "phone_number"},
    {name: "Correo", uid: "email"},
    {name: "Acciones", uid: "actions"},
  ]

  const { doctors, users, patients } = useSelector( state => state.userAdmin)

  const tabs = [
    { id: "users", label: "Usuarios", component: <TableComponent key={1} columns={columnsUsers} data={users} action={'users'} path={'../appointmentForm/update/user'}/> },
    { id: "doctors", label: "Doctores", component: <TableComponent key={2} columns={columnsDoctors} data={doctors} action={'doctors'} path={'../appointmentForm/update/doctors'}/> },
    { id: "patients", label: "Pacientes", component: <TableComponent columns={columnsPatients}  data={patients} action={'patients'} path={'../appointmentForm/update/patients'}/> },
  ];


  return (
    <section className="flex flex-col items-center">
      <div className='flex justify-between w-[80%]'>
        <div className=''>
          <h1 className='text-primary text-3xl '>{capitalizeFirstLetter(userName)}</h1>
          <p className=''>Por favor, seleccione la pestaña que desee consultar</p>
        </div>
        {/* <FilledButton text='Agendar Cita' onClick={() => onClick()} /> */}
      </div>
      <TabsComponent tabs={tabs} firstTab={'users'}/>
    </section>
  );
}


