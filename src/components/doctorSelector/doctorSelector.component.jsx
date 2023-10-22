import React, { useState } from 'react'
import { CheckboxGroup } from '@nextui-org/react'
import { CustomCheckbox } from './customCheckbox';
import { crearCitaDescripcion, crearCitaDoctor } from '../../store/reducers/crearCita.reducer';
import { useDispatch } from 'react-redux';


export const DoctorSelector = ({ setDoctor }) => {
  const [doctorSelected, setDoctorSelected] = useState([]);
  const [doctoresSeleccionados, setDoctoresSeleccionados] = useState([]); // Usamos un array para mantener los doctores seleccionados
  const dispatch = useDispatch()

  const handleCheckboxChange = (doctor) => {
    if (doctorSelected && doctorSelected.id === doctor.id) { //VOlvio a precionar el mismo doctor
      setDoctorSelected([]);
      setDoctoresSeleccionados([]);
      dispatch(crearCitaDoctor({}));
      setDoctor({})
    } else {
      setDoctor(doctor)
      dispatch(crearCitaDoctor(doctor));
      setDoctorSelected(doctor);
      setDoctoresSeleccionados([{id:doctor.id, nombre:doctor.nombre.primerNombre, especialidad:doctor.especialidad}]);
    }
  };
  // Este es el array de doctores que sera tomado de la API
  const doctores = [
    {
      "nombre": {
        "primerNombre": "Juan",
        "segundoNombre": "Carlos"
      },
      "apellido": {
        "primerApellido": "Gómez",
        "segundoApellido": "Pérez"
      },
      "fechaNacimiento": {
        "dia": 10,
        "mes": 5,
        "anio": 1980
      },
      "especialidad": "Cardiología",
      "cedula": "123456789",
      "direccion": "Calle 123, Ciudad",
      "telefono": "555-123-4567",
      "genero": "Masculino",
      "correo": "juan.gomez@example.com",
      "id": "D12345"
    },
    {
      "nombre": {
        "primerNombre": "María",
        "segundoNombre": "Elena"
      },
      "apellido": {
        "primerApellido": "Rodríguez",
        "segundoApellido": "López"
      },
      "fechaNacimiento": {
        "dia": 15,
        "mes": 8,
        "anio": 1975
      },
      "especialidad": "Dermatología",
      "cedula": "987654321",
      "direccion": "Avenida XYZ, Ciudad",
      "telefono": "555-987-6543",
      "genero": "Femenino",
      "correo": "maria.rodriguez@example.com",
      "id": "D54321"
    },
    {
      "nombre": {
        "primerNombre": "Juan",
        "segundoNombre": "Carlos"
      },
      "apellido": {
        "primerApellido": "Gómez",
        "segundoApellido": "Pérez"
      },
      "fechaNacimiento": {
        "dia": 10,
        "mes": 5,
        "anio": 1980
      },
      "especialidad": "Cardiología",
      "cedula": "123456789",
      "direccion": "Calle 123, Ciudad",
      "telefono": "555-123-4567",
      "genero": "Masculino",
      "correo": "juan.gomez@example.com",
      "id": "D123445"
    },
    {
      "nombre": {
        "primerNombre": "María",
        "segundoNombre": "Elena"
      },
      "apellido": {
        "primerApellido": "Rodríguez",
        "segundoApellido": "López"
      },
      "fechaNacimiento": {
        "dia": 15,
        "mes": 8,
        "anio": 1975
      },
      "especialidad": "Dermatología",
      "cedula": "987654321",
      "direccion": "Avenida XYZ, Ciudad",
      "telefono": "555-987-6543",
      "genero": "Femenino",
      "correo": "maria.rodriguez@example.com",
      "id": "D5423321"
    },
    {
      "nombre": {
        "primerNombre": "Juan",
        "segundoNombre": "Carlos"
      },
      "apellido": {
        "primerApellido": "Gómez",
        "segundoApellido": "Pérez"
      },
      "fechaNacimiento": {
        "dia": 10,
        "mes": 5,
        "anio": 1980
      },
      "especialidad": "Cardiología",
      "cedula": "123456789",
      "direccion": "Calle 123, Ciudad",
      "telefono": "555-123-4567",
      "genero": "Masculino",
      "correo": "juan.gomez@example.com",
      "id": "D145"
    },
    {
      "nombre": {
        "primerNombre": "María",
        "segundoNombre": "Elena"
      },
      "apellido": {
        "primerApellido": "Rodríguez",
        "segundoApellido": "López"
      },
      "fechaNacimiento": {
        "dia": 15,
        "mes": 8,
        "anio": 1975
      },
      "especialidad": "Dermatología",
      "cedula": "987654321",
      "direccion": "Avenida XYZ, Ciudad",
      "telefono": "555-987-6543",
      "genero": "Femenino",
      "correo": "maria.rodriguez@example.com",
      "id": "D534321"
    }
  ]

  return (
    <div className="grid xs:grid-cols-1 smm:grid-cols-2 gap-4 m-10">
      {doctores.map((doctor, index) => (
        <div key={index} className="flex flex-col gap-1" >
          <CheckboxGroup
            value={doctoresSeleccionados.map((doctor) => doctor.id)}
            classNames={{
              base: "w-full",
            }}
          >
            <CustomCheckbox
              value={doctor.id}
              user={{
                name: `${doctor.nombre.primerNombre} ${doctor.apellido.primerApellido}`,
                avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
                username: `${doctor.correo}`,
                role: doctor.especialidad,
                status: "Active",
              }}
              statusColor="primary"
              checked={doctorSelected && doctorSelected.id === doctor.id}
              onChange={() => handleCheckboxChange(doctor)}
            />
          </CheckboxGroup>
          {/* Puedes agregar cualquier otro contenido que desees mostrar en cada columna */}
        </div>
      ))}
    </div>

  );
};