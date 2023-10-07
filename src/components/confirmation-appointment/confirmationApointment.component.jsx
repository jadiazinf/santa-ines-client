import React from 'react';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { capitalizeFirstLetter } from '../../helpers/capitalize.helper';

function ConfirmationComponent({ doctorStored, dateStored, descriptionStored }) {
  var dateObject = new Date(dateStored);
  return (
    <div className="bg-white py-4 px-3 sm:px-6 lg:px-12 shadow-md rounded-tls">
      <h2 className="text-lg font-bold mb-4">Datos de cita</h2>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-sm">Doctor:</p>
          <p className="text-base font-medium">{doctorStored.nombre.primerNombre} {doctorStored.apellido.primerApellido}</p>
          <p className="text-base font-medium">CI: {doctorStored.cedula}</p>
          <p className="text-base font-medium">Esp: {doctorStored.especialidad}</p>
        </div>
        <div className="flex-1 ml-5">
          <p className="text-sm">Fecha de la cita:</p>
          <p className="text-base font-medium">
            {capitalizeFirstLetter(
              format(dateObject, "EEEE dd 'de' MMMM 'de' yyyy'.'", {
                locale: es,
              }).toString()
            )}
          </p>
        </div>
        <div className="flex-1 ml-5 w-[150px] overflow-clip">
          <p className="text-sm">Descripción:</p>
          <p className="text-base font-medium">{descriptionStored}</p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationComponent;