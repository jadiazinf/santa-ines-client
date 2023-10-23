import React, { useEffect } from 'react'
import { DoctorSelector, FilledButton, NavbarComponent } from '../../components'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetDoctors1Mutation } from '../../api';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const  { userName } = useParams();
  const [doctor, setDoctor] = React.useState({});
  const [doctores, setDoctores] = React.useState({});

  const onClick = e => {
    if (Object.keys(doctor).length === 0) {
      toast.error('Debe seleccionar un doctor');
    } else {
      e.preventDefault();
      if(doctor) {
        navigate(`info-doctor/${doctor.cedula}`);
      }
    }
  }

  const [getDoctors1, { isLoading, isError }] = useGetDoctors1Mutation();

  useEffect(() => {
    getDoctors1(userName)
      .then((response) => {
        setDoctores(response.data);
      })
      .catch((error) => {
        reject(new Error(response.data.message));
      })
  }, [])


  return (
    <div className="flex flex-col justify-center items-center m-10">
      <div className='flex flex-col justify-center items-start mt-5'>
        <div className='w-full flex justify-between'>
          <div>
            <h1 className='text-primary text-3xl w-[400px]'>Dashboard</h1>
            <p className=''>Seleccione el doctor a consultar.</p>
          </div>
          <FilledButton text='Consultar' onClick={onClick} />
        </div>
        <div className=''>
          {!isLoading
            ? <DoctorSelector setDoctor={setDoctor} doctores1={doctores}/>
            : <div className='grid xs:grid-cols-1 smm:grid-cols-2 gap-4 m-10'>
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="w-[415px] h-[90px] flex items-center gap-3 animate-pulse bg-gray-100 rounded-xl p-3">
                  <div className='flex flex-row justify-center items-center space-x-3'>
                    <div className="flex w-5 h-5 bg-gray-200"/>
                    <div className="flex rounded-full w-12 h-12 bg-gray-200"/>
                  </div>
                  <div className="w-full flex flex-col rounded gap-3">
                    <div className='flex flex-row justify-between'>
                      <div className="h-5 w-20 rounded bg-gray-200"/>
                      <div className="h-5 w-24 rounded bg-gray-200"/>
                    </div>
                    <div className='flex flex-row justify-between'>
                      <div className="h-5 w-28 rounded bg-gray-200"/>
                      <div className="h-5 w-16 rounded-xl bg-gray-200"/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}
