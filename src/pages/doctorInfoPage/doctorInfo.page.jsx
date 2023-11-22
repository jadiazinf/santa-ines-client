import React from 'react'
import { ButtonBack, DoctorInfo, FilledButton, TabsComponent } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TableComponent } from '../../components/table/table.component';
import { capitalizeFirstLetter } from '../../helpers/capitalize.helper';

export const DoctorInfoPage = () => {
  const { appointments } = useSelector( state => state.createAppointment)
  const { users } = useSelector( state => state.userAdmin)
  const { doctor } = useSelector( state => state.saveDoctors)

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`../appointmentForm/create`);
  }

  const columns = [
    {name: "Id Cita", uid: "idCita"},
    {name: "Fecha Cita", uid: "fechaCita"},
    {name: "Hora Cita", uid: "horaCita"},
    {name: "Id Paciente", uid: "idPaciente"},
    {name: "Estado", uid: "status"},
    {name: "Acciones", uid: "actions"},
  ];

  const tabs = [
    { id: "citas", label: "Citas", component: <TableComponent columns={columns} id_doctor={doctor.id} data={appointments} action={'appointments'} path={'../appointmentForm/update'}/> },
    { id: "información", label: "Información", component: <DoctorInfo info={doctor} /> },
  ];

  return (
    <section className="flex flex-col items-center mt-5 gap-5">
      <div className='flex justify-between w-[80%]'>
        <div className='flex flex-row justify-center items-center gap-5'>
          <ButtonBack  style={''}/>
          <div>
            <h1 className='text-primary text-3xl w-[400px]'>{capitalizeFirstLetter(doctor.nombre.cuerpo)}</h1>
            <p className=''>Por favor, seleccione la pestaña que desee consultar.</p>
          </div>
        </div>
        <FilledButton text='Agendar Cita' onClick={() => onClick()} />
      </div>
      <TabsComponent columns={columns} tabs={tabs} firstTab={'citas'}/>
    </section>
  );
}
