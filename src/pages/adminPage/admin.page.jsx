import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { DoctorInfo, FilledButton, TabsDoctorsComponents } from '../../components'
import { TableComponent } from '../../components/table/table.component'
import { useGetDoctorsMutation, useGetPatientsMutation, useGetUsersMutation } from '../../api'
import { saveDoctors, savePatients, saveUsers } from '../../store/reducers/userAdmin.reducer'

export const AdminPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  { userName } = useParams();
  // const { doctor } = useSelector( state => state.saveDoctors)


  // const onClicks = e => {
  //   if (Object.keys(doctor).length === 0) {
  //     toast.error('Debe seleccionar un doctor');
  //   } else {
  //     e.preventDefault();
  //     if(doctor) {
  //       navigate(`info-doctor/${doctor.cedula}`);
  //     }
  //   }
  // }

  // const onClick = () => {
  //   navigate(`../appointmentForm/create`);
  // }

  const [getDoctors] = useGetDoctorsMutation();
  const [getAllUsers] = useGetUsersMutation();
  //TODO -> Preguntar por que no funciona el url de pacientes en el servidor
  // const [getPatients] = useGetPatientsMutation(); 
  
  useEffect(() => {
    getAllUsers()//FUNCIONANDO
      .then((response) => {
        dispatch(saveUsers(response.data));
      })
      .catch((error) => {
        reject(new Error(response.data.message));
      })
    getDoctors()//FUNCIONANDO
      .then((response) => {
        dispatch(saveDoctors(response.data));
      })
      .catch((error) => {
        reject(new Error(response));
      })
    // getPatients()
    //   .then((response) => {
    //     console.log("🚀 ~ file: admin.page.jsx:50 ~ .then ~ response:", response)
    //     dispatch(savePatients(response.data));
    //   })
    //   .catch((error) => {
    //     reject(new Error(response.data.message));
    //   })
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
    {name: "Cedúla", uid: "cedula"},
    {name: "Nombre", uid: "nombre"},
    {name: "Apellido", uid: "apellido"},
    {name: "Fecha de nacimiento", uid: "f_nacimiento"},
    {name: "Teléfono", uid: "telefono"},
    {name: "Correo", uid: "correo"},
    {name: "Acciones", uid: "actions"},
  ]

  const { doctors, users, patients } = useSelector( state => state.userAdmin)

  const tabs = [
    { id: "users", label: "Usuarios", component: <TableComponent columns={columnsUsers} data={users} action={'users'} path={'../appointmentForm/update/user'}/> },
    { id: "doctors", label: "Doctores", component: <TableComponent columns={columnsDoctors} data={doctors} action={'doctors'} path={'../appointmentForm/update/doctors'}/> },
    // { id: "citas", label: "Citas", component: <TableComponent columns={columnsAppointments} id_doctor={doctor.id} data={appointments} action={'appointments'} path={'../appointmentForm/update'}/> },
  ];


  return (
    <section className="flex flex-col items-center">
      <div className='flex justify-between w-[80%]'>
        <div className=''>
          <h1 className='text-primary text-3xl '>{toCamelCase(userName)}</h1>
          <p className=''>Por favor, seleccione la pestaña que desee consultar</p>
        </div>
        {/* <FilledButton text='Agendar Cita' onClick={() => onClick()} /> */}
      </div>
      <TabsDoctorsComponents tabs={tabs} firstTab={'users'}/>
    </section>
  );
}


function toCamelCase(str) {
  return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase())
            .replace(/^(.)/, (_, char) => char.toUpperCase());
}