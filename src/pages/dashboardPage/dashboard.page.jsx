import React from 'react'
import { DoctorSelector, FilledButton, NavbarComponent } from '../../components'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = React.useState({});

  const onClick = e => {
    if (Object.keys(doctor).length === 0) {
      toast.error('Debe seleccionar un doctor');
    } else {
      e.preventDefault();
      navigate('/info-doctor');
    }
  }

  return (
    <div className="flex flex-col justify-center items-center m-10">
      <NavbarComponent />
      <div className='flex flex-col justify-center items-start mt-5'>
        <div className='w-full flex justify-between'>
          <div>
            <h1 className='text-primary text-3xl w-[400px]'>Dashboard</h1>
            <p className=''>Seleccione el doctor a consultar.</p>
          </div>
          <FilledButton text='Consultar' onClick={onClick} />
        </div>
        <div className=''>
          <DoctorSelector setDoctor={setDoctor}/>
        </div>
      </div>
    </div>
  )
}
