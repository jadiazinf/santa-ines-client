import React from 'react';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { capitalizeFirstLetter } from '../../helpers/capitalize.helper';

function ConfirmationComponent({ edited, doctorStored, patientStored, dateStored, descriptionStored }) {
  var dateObject = new Date(dateStored);
  return (
    <div className="bg-white py-4 px-3 sm:px-6 lg:px-12 shadow-md rounded-tls mt-36">
      <h2 className="text-lg font-bold mb-4">{!edited ? 'Datos de cita' : 'Datos actualizados de cita'}</h2>
      <div className="flex justify-between items-start mb-4 gap-10">
        <div className="flex-2">
          <p className="text-sm">Doctor:</p>
          <p className="text-base font-medium">{doctorStored.nombre.cuerpo} {doctorStored.apellido.cuerpo}</p>
          <p className="text-sm">CI: <span className='text-base font-medium'>{doctorStored.cedula}</span></p>
          <p className="text-sm">Esp: <span className='text-base font-medium'>{doctorStored.especialidad}</span></p>
        </div>
        <div className="flex-2">
          <p className="text-sm">Paciente:</p>
          <p className="text-base font-medium">{patientStored.name} {patientStored.lastname}</p>
          <p className="text-sm">CI: <span className='text-base font-medium'>{patientStored.id_number}</span></p>
          <p className="text-sm">Teléfono: <span className='text-base font-medium'>{patientStored.phone_number}</span></p>
          <p className="text-sm">Correo: <span className='text-base font-medium'>{patientStored.email}</span></p>
        </div>
        <div className="flex-1 ml-5">
          <p className="text-sm">{!edited ? 'Fecha de la cita:' : 'Nueva fecha:'}</p>
          <p className="text-base font-medium">
            {capitalizeFirstLetter(
              format(dateObject, "EEEE dd' de 'MMMM' de 'yyyy' a las 'hh:00", {
              locale: es,
              }).toString()
            )}
          </p>
        </div>
        <div className="flex-1 ml-5 ">
          <p className="text-sm">{!edited ? 'Descripción:' : 'Nueva descripción:'}</p>
          <p className="text-base font-medium text-ellipsis">{descriptionStored}</p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationComponent;