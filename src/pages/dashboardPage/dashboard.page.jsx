import React, { useEffect } from 'react'
import { DoctorSelector, FilledButton } from '../../components'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetDoctorsMutation, useGetPatientsMutation } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { savedoctors, savepatients } from '../../store/reducers/doctors.reducer';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { doctor } = useSelector( state => state.saveDoctors)
  const { idUser } = useSelector( state => state.authenticatedUser)
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

  const [getDoctors, { isLoading, isError }] = useGetDoctorsMutation();
  const [getPatients] = useGetPatientsMutation();

  useEffect(() => {
    Promise.all([getDoctors({ id_user: idUser }),  getPatients()])//TODO -> RECORDAR CAMBIAR ESTO PARA QUE ME TRAIGA LOS DOCTORES DE UN USUARIO EN CONCRETO
      .then(([doctorsResponse, patientsResponse]) => {
        if(!doctorsResponse.error) {
          dispatch(savedoctors(doctorsResponse.data));
        }else{
          dispatch(savedoctors([]));
        }
        dispatch(savepatients(patientsResponse.data));
      })
  }, [])

  return (
    <section className="flex flex-col justify-center items-center m-10">
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
            ? <DoctorSelector/>
            : <SkeletonComponent />
          }
        </div>
      </div>
    </section>
  )
}


const SkeletonComponent = () => {
  return (
    <div className='grid xs:grid-cols-1 smm:grid-cols-2 gap-4 m-10'>
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
  )
}