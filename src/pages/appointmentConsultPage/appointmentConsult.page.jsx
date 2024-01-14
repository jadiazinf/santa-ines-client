import React from 'react'
import { FilledButton, NavbarAllUsersComponent, SearchBarComponent } from '../../components'

export const AppointmentConsultPage = () => {

const onClick = e => {
  console.log('Aca es donde se llama al endpoint para traer las citas asigandas a la misma cedula colocada en el searhbar')
}


  return (
    <div className="flex flex-col justify-center items-center">
      <NavbarAllUsersComponent consult={true} />
      <section className="flex flex-col justify-center items-center m-10">
        <div className='flex flex-col justify-center items-start mt-5'>
          <div className='w-full flex justify-between'>
            <div>
              <h1 className='text-primary text-3xl w-[400px]'>Consulta de citas</h1>
              <p className=''>Por favor indique su cédula.</p>
            </div>
            <SearchBarComponent />
          </div>
        </div>
      </section>
    </div>
  )
}
