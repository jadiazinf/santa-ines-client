import React from 'react'
import { FilledButton, ModalInfoComponent, NavbarAllUsersComponent, SearchBarComponent, TableComponent } from '../../components'
import { SearchIcon } from '../../assets'
import { columnsAppointments1 } from '../../components/constanst'
import { useGetUserAppointmentsMutation } from '../../api'
import toast from 'react-hot-toast'
import { useDisclosure } from '@nextui-org/react'
import { useSelector } from 'react-redux'

export const AppointmentConsultPage = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const [appointments, setAppointments] = React.useState([])
  const { doctorId } = useSelector( state => state.saveDoctors)

  const [getUserAppointments] = useGetUserAppointmentsMutation();


  const onClick = e => {
    if(isNaN(searchValue)){
      toast.error('La cédula debe ser un número.')
      return
    }
    if(searchValue.length != 8){
      toast.error('La cédula debe tener 8 dígitos.')
      return
    }

    toast.promise(
      getUserAppointments(searchValue),
      {
        loading: 'Consultando...',
        success: (response) => {
          if(response.data.length == 0){
            toast.error('No se encontraron citas.')
          }
          setAppointments(response.data)
          return <b>Citas encontradas para el paciente de cédula {searchValue}</b>
        },
        error: <b>Could not save.</b>,
      }
    );
    setSearchValue('')
  }
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div className="flex flex-col justify-center items-center ">
      <ModalInfoComponent isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
      <NavbarAllUsersComponent consult={true} />
      <section className="flex flex-col justify-center items-center m-10 ">
        <div className='flex flex-col justify-center items-start mt-5'>
          <div className='w-full flex justify-between'>
            <div>
              <h1 className='text-primary text-3xl w-[400px]'>Consulta de citas</h1>
              <p className=''>Por favor indique su cédula.</p>
            </div>
            <SearchBarComponent searchValue={searchValue} setSearchValue={setSearchValue} visible={true}/>
            <FilledButton text="Buscar" onClick={onClick} class={'ml-5 w-20 h-8 bg-primary text-white font-poppins hover:bg-green-600 rounded text-sm'}/>
          </div>
        </div>
      </section>
      <div className='mt-10 w-[70%]'>
        <TableComponent columns={columnsAppointments1} id_doctor={doctorId} data={appointments} action={'appointments'} path={'../appointmentForm/update'}/>
      </div>
    </div>
  )
}
