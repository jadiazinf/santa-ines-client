import React, { useState } from 'react'
import { CheckboxGroup } from '@nextui-org/react'
import { CustomCheckbox } from './customCheckbox';
import { crearCitaDoctor } from '../../store/reducers/crearCita.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { savedoctor } from '../../store/reducers/doctors.reducer';
import { SearchBarComponent } from '../searchBar/searchBar.component';


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

  const [searchValue, setSearchValue] = React.useState('');
  let searchedDatas = [];

  if (searchValue.length === 0){
    searchedDatas = doctors;
  }else{
    searchedDatas = doctors.filter(item => {
      const itemTextName = item.nombre.cuerpo.toLowerCase();
      const itemTextApellido = item.apellido.cuerpo.toLowerCase();
      const itemTextCorreo = item.correo.correo.toLowerCase();
      const itemTextCedula = item.cedula.toLowerCase();
      const itemTextespecialidad = item.especialidad.toLowerCase();
      return itemTextName.includes(searchValue) || itemTextApellido.includes(searchValue) || itemTextCorreo.includes(searchValue) || itemTextCedula.includes(searchValue) || itemTextespecialidad.includes(searchValue);
    });
  }

  return (
    <div className='flex flex-col justify-center items-end mt-10'>
      <SearchBarComponent searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className={`grid xs:grid-cols-1 ${searchedDatas.length !== 0 ? 'smm:grid-cols-2' : 'smm:grid-cols-1'} gap-5  m-10`}>
        {searchedDatas.length === 0
          ? <div className='flex flex-col justify-center items-center '>
              <h1 className='font-bold text-lg text-primary'>No se ha encontrado ningún doctor con las características especificadas.</h1>
            </div>
          :<>
            {Object.values(searchedDatas).map((doctor, index) => (
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
          </>
        }
      </div>
    </div>
  );
};