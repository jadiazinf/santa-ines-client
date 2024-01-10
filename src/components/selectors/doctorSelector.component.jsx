import React, { useState } from 'react'
import { CheckboxGroup } from '@nextui-org/react'
import { CustomCheckbox } from './customCheckbox';
import { crearCitaDoctor } from '../../store/reducers/crearCita.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { savedoctor } from '../../store/reducers/doctors.reducer';
import { CustomPagination, SearchBarComponent } from '../../components'


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
  //------------------> Pagination Config <------------------
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;
  const totalItems = doctors.length;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentDoctors = doctors.slice(startIndex, endIndex);

  //------------------> Pagination Config <------------------

  return (
    <div className='flex flex-col justify-center items-end mt-10'>
      <SearchBarComponent searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className=''>
        {searchedDatas.length === 0
          ? <div className='flex flex-col justify-center items-center mt-10'>
              <h1 className='font-bold text-lg text-primary'>No se ha encontrado ningún doctor con las características especificadas.</h1>
            </div>
          :<>
            <div className={`grid xs:grid-cols-1 ${searchedDatas.length !== 0 ? 'smm:grid-cols-2' : 'smm:grid-cols-1'} gap-5  m-10`}>
              {/* {Object.values(searchedDatas).map((doctor, index) => ( */}
              {Object.values(usePrueba(searchValue, searchedDatas, currentDoctors)).map((doctor, index) => (
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
              <div className="flex flex-col justify-center items-center mt-4">
                <CustomPagination
                  totalItems={totalItems}
                  itemsPerPage={rowsPerPage}
                  currentPage={page}
                  onPageChange={(newPage) => setPage(newPage)}
                />
              </div>
          </>
        }
      </div>
    </div>
  );
};

function usePrueba(searchValue ,searchedDatas, currentDoctors){
  if(searchValue.length !== 0){
    return searchedDatas
  }else{
    return currentDoctors
  }
}