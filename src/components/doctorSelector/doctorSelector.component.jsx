import React, { useState } from 'react'
import { CheckboxGroup } from '@nextui-org/react'
import { CustomCheckbox } from './customCheckbox';
import { crearCitaDescripcion, crearCitaDoctor } from '../../store/reducers/crearCita.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { savedoctor } from '../../store/reducers/doctors.reducer';


export const DoctorSelector = () => {
  const [doctorSelected, setDoctorSelected] = useState([]);
  const [doctoresSeleccionados, setDoctoresSeleccionados] = useState([]); // Usamos un array para mantener los doctores seleccionados
  const dispatch = useDispatch()
  const { doctors } = useSelector( state => state.saveDoctors)

  const handleCheckboxChange = (doctor) => {
    if (doctorSelected && doctorSelected.cedula === doctor.cedula) { //VOlvio a precionar el mismo doctor
      setDoctorSelected([]);
      setDoctoresSeleccionados([]);
      dispatch(crearCitaDoctor({}));
      dispatch(savedoctor({}));
    } else {
      dispatch(savedoctor(doctor));
      dispatch(crearCitaDoctor(doctor));
      setDoctorSelected(doctor);
      setDoctoresSeleccionados([{cedula:doctor.cedula, nombre:doctor.nombre.primerNombre, especialidad:doctor.especialidad}]);
    }
  };
  // Este es el array de doctores que sera tomado de la API

  return (
    <div className="grid xs:grid-cols-1 smm:grid-cols-2 gap-4 mt-24 m-10">
      {Object.values(doctors).map((doctor, index) => (
        <div key={index} className="flex flex-col gap-1" >
          <CheckboxGroup
            value={doctoresSeleccionados.map((doctor) => doctor.cedula)}
            classNames={{
              base: "w-full",
            }}
          >
            <CustomCheckbox
              value={doctor.cedula}
              user={{
                name: `${doctor.nombre.cuerpo} ${doctor.apellido.cuerpo}`,
                avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
                username: `${doctor.correo.correo}`,
                role: doctor.especialidad,
                status: "Active",
              }}
              statusColor="primary"
              checked={doctorSelected && doctorSelected.cedula === doctor.cedula}
              onChange={() => handleCheckboxChange(doctor)}
            />
          </CheckboxGroup>
          {/* Puedes agregar cualquier otro contenido que desees mostrar en cada columna */}
        </div>
      ))}
    </div>

  );
};