import React, { useState } from 'react'
import { ButtonBack, ChartBarComponent, ChartPieComponent, DoctorInfo, FilledButton, TabsComponent } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TableComponent } from '../../components/table/table.component';
import { capitalizeFirstLetter } from '../../helpers/capitalize.helper';
import { columnsAppointments } from '../../components/constanst';
import { contarCitasPorPaciente, dataToPie } from '../../hooks';

export const DoctorInfoPage = () => {
  const [activeTab, setActiveTab] = useState('citas');
  const { appointments } = useSelector( state => state.createAppointment)
  const { users } = useSelector( state => state.userAdmin)
  const { doctor, patients } = useSelector( state => state.saveDoctors)

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`../appointmentForm/create`);
  }

  const tabs = [
    { id: "citas", label: "Citas", component: <TableComponent columns={columnsAppointments} id_doctor={doctor.id} data={appointments} action={'appointments'} path={'../appointmentForm/update'}/> },
    { id: "estadisticas", label: "Estadísticas", component:<ChartsComponent appointments={appointments} patients={patients}/> },
    { id: "información", label: "Información", component: <DoctorInfo info={doctor} /> },
  ];

  return (
    <section className="flex flex-col items-center mt-5 gap-5">
      <div className='flex justify-between w-[80%]'>
        <div className='flex flex-row justify-center items-center gap-5'>
          <ButtonBack backlink={`${window.location.pathname.split('/').slice(0, 3).join('/')}`}  style={''}/>
          <div>
            <h1 className='text-primary text-3xl w-[400px]'>{capitalizeFirstLetter(doctor.nombre.cuerpo)}</h1>
            <p className=''>Por favor, seleccione la pestaña que desee consultar.</p>
          </div>
        </div>
        <FilledButton text='Agendar Cita' onClick={() => onClick()} />
      </div>
      <TabsComponent columns={columnsAppointments} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
    </section>
  );
}


const ChartsComponent = ({appointments, patients}) => {
  return (
    <div className="flex flex-col justify-center items-center mt-10 w-full space-y-4">
      <div className='relative space-y-3'>
        <h1 className='text-primary text-3xl'>Distribución de Estados de Citas</h1>
        <ChartPieComponent data={dataToPie(appointments)}/>
      </div>
      <div className='relative space-y-4'>
        <h1 className='text-primary text-3xl absolute'>Cantidad de Citas por Paciente</h1>
        <ChartBarComponent data={contarCitasPorPaciente(appointments, patients)}/>
      </div>
    </div>
  )
}
