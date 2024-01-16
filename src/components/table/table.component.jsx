import React, { useEffect } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from "@nextui-org/react";
import { useGetAllDoctorsMutation, useGetDoctorAppointmentsMutation, useGetPatientsMutation, useGetUsersMutation } from "../../api";
import { useDispatch } from "react-redux";
import { fetchData, renderAppointmentsCells, renderDoctorsCells, renderPatientsCells, renderUsersCells } from "./info";
import { useNavigate } from "react-router-dom";
import { editarCitaDate, editarCitaDescripcion, editarId, editarPaciente, editarStatus } from "../../store/reducers/editarCita.reducer";
import { saveDoctors, savePatients, saveUsers } from "../../store/reducers/userAdmin.reducer";
import { saveAppointments } from "../../store/reducers/crearCita.reducer";
import { detalleCita, detalleDoctor2, detallePaciente, detalleUsuario } from "../../store/reducers/detalleCita.reducer";
import { CustomPagination, ModalInfoComponent, SearchBarComponent} from '../../components'
import { InfoIcon } from "../../assets";
import { savedoctorId } from "../../store/reducers/doctors.reducer";

const fetchFunctions = {
  'appointments': useGetDoctorAppointmentsMutation,
  'users': useGetUsersMutation,
  'doctors': useGetAllDoctorsMutation,
  'patients': useGetPatientsMutation
};

export const TableComponent = ({columns, id_doctor, action, data, path, setReset}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let totalItems = data.length;
  
  const selectedFetchFunction = fetchFunctions[action];
  const [fetchFunction] = selectedFetchFunction();

  const onClick = (id, date, description, pacienteId, status) => {
    dispatch(editarId(id));
    dispatch(editarCitaDate(date));
    dispatch(editarPaciente(pacienteId));
    dispatch(editarCitaDescripcion(description));
    dispatch(editarStatus(status));
    navigate(path);
  }

  useEffect(() => {
    switch (action) {
      case 'appointments':
        fetchData(dispatch, fetchFunction, saveAppointments, 'appointments', {id: id_doctor.UUID})
        break;
      case 'users':
        fetchData(dispatch, fetchFunction, saveUsers, 'users')
        break;
      case 'doctors':
        fetchData(dispatch, fetchFunction, saveDoctors, 'doctors')
        break;
      case 'patients':
        fetchData(dispatch, fetchFunction, savePatients, 'patients')
        break;
      default:
        break;
    }
    totalItems = data.length;
  }, [totalItems]);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const onClickOpen = (object, dispatch, dataType) => {
    switch (dataType) {
      case 'appointments':
        onOpen();
        dispatch(savedoctorId(object.doctorId));
        dispatch(detalleCita(object));
        break;
      case 'users':
        if(object.username === 'admin'){
          dispatch(detalleUsuario({object, dataType: 'usuario'}));
          break;
        }else{
          dispatch(detalleUsuario({object, dataType: 'editarusuario'}));
          break;
        }
      case 'doctors':
        dispatch(detalleDoctor2({object, dataType: 'editardoctor'}));
        break;
      case 'patients':
        dispatch(detallePaciente({object, dataType: 'editarpaciente'}));
        break;
      default:
        break;
    }
  }

  //------------------> Pagination Config <------------------
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  //------------------> Pagination Config <------------------
  const [searchValue, setSearchValue] = React.useState('');
  let searchedDatas = [];

  if (searchValue.length === 0){
    searchedDatas = data;
  }else{
    const searchText = searchValue.toLowerCase();
    switch  (action){
      case 'appointments':
        searchedDatas = data.filter(item => {
          const itemTextPacienteId = item.patientId.toLowerCase();
          const itemTextStatus= item.status.toLowerCase();
          const itemTextDescripcion = item.description.toLowerCase();
          const itemTextAppointmentDate = item.appointmentDate.toLowerCase();
          const itemTextCreationDate = item.creationDate.toLowerCase();

          return itemTextPacienteId.includes(searchText) || itemTextStatus.includes(searchText) || itemTextDescripcion.includes(searchText) || itemTextAppointmentDate.includes(searchText) || itemTextCreationDate.includes(searchText);
        });
      break;
      case 'users':
        searchedDatas = data.filter(item => {
          const itemTextUsername = item.username.toLowerCase();
          const itemTextUserType = item.user_type.toLowerCase();
          return itemTextUsername.includes(searchText) || itemTextUserType.includes(searchText);
        });
      break;
      case 'doctors':
        searchedDatas = data.filter(item => {
          const itemTextName = item.nombre.cuerpo.toLowerCase();
          const itemTextApellido = item.apellido.cuerpo.toLowerCase();
          const itemTextCorreo = item.correo.correo.toLowerCase();
          const itemTextCedula = item.cedula.toLowerCase();
          const itemTextespecialidad = item.especialidad.toLowerCase();
          return itemTextName.includes(searchText) || itemTextApellido.includes(searchText) || itemTextCorreo.includes(searchText) || itemTextCedula.includes(searchText) || itemTextespecialidad.includes(searchText);
        });
      break;
      case 'patients':
        searchedDatas = data.filter(item => {
          const itemTextNombre= item.name.toLowerCase();
          const itemTextLastname= item.lastname.toLowerCase();
          const itemTextAddress = item.address.toLowerCase();
          const itemTextCedula = item.id_number.toLowerCase();
          const itemTextCorreo = item.email.toLowerCase();
          const itemTextGenero = item.gender.toLowerCase();
          const itemTextTelefono = item.phone_number.toLowerCase()
          return itemTextNombre.includes(searchText) || itemTextLastname.includes(searchText) || itemTextAddress.includes(searchText) || itemTextCedula.includes(searchText) || itemTextCorreo.includes(searchText) || itemTextGenero.includes(searchText) || itemTextTelefono.includes(searchText);
        });


    }
  }
  data = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return data.slice(start, end);
  }, [page, data]);

  const componentToRender = decideComponentToRender(action);

  return (
    <>
      <ModalInfoComponent isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} setReset={setReset}/>
      <div className="flex flex-row justify-end gap-2 mr-5">
        <SearchBarComponent searchValue={searchValue} setSearchValue={setSearchValue}/>
        <div className="group">
          <div className="absolute ml-7 bg-gray-200 p-4 rounded-md hidden group-hover:flex group-hover:flex-col  z-50 ">
            <h1 className="flex flex-col gap-1 font-bold text-sm text-primary underline">Valores de busqueda:</h1>
            {componentToRender}
          </div>

          <InfoIcon infoToSearch={action}/>
        </div>
      </div>
      <Table
        aria-label="tabla"
        bottomContent={
          <div className="flex w-full justify-center mt-4">
            <CustomPagination
              totalItems={totalItems}
              itemsPerPage={rowsPerPage}
              currentPage={page}
              onPageChange={(newPage) => setPage(newPage)}
            />
        </div>
        }
      >
        <TableHeader columns={columns} className="mb-5">
          {(column) => (
            <TableColumn className="bg-gray-200 " key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Contenido no encontrado."} items={searchValue.length !== 0 ? searchedDatas : data} >
          {(item, index) => (
            <TableRow key={item.username || item.ID || item.id.UUID} className={`hover:bg-gray-100 h-16`} onClick={() => {onClickOpen(item, dispatch, action); onOpen();}}>
              {(columnKey) =>
                <TableCell>
                  {contentSelection(action, item, columnKey, id_doctor, onClick, onOpen, dispatch)}
                </TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

const contentSelection = (action, item, columnKey, id_doctor, onClick, onOpen, dispatch) => {
  let content;
  switch (action) {
    case 'appointments':
      return content = renderAppointmentsCells(item, columnKey, id_doctor, onClick, onOpen,dispatch);
    case 'users':
      return content = renderUsersCells(item, columnKey, onOpen, dispatch);
    case 'doctors':
      return content = renderDoctorsCells(item, columnKey, onOpen, dispatch);
    case 'patients':
      return content = renderPatientsCells(item, columnKey, onOpen, dispatch);
    default:
      return content = <div>Contenido por defecto</div>;
  }
}

const decideComponentToRender = (text) => {
  switch (text) {
    case 'appointments':
      return <AppointmentComponentInfo />;
    case 'users':
      return <UserComponentInfo />;
    case 'doctors':
      return <DoctorComponentInfo />;
    case 'patients':
      return <PatientComponentInfo />;
    default:
      return <div>No matching component found</div>;
  }
};

const AppointmentComponentInfo = () => {
  return (
    <div className='mt-2'>
      <h1 className='font-semibold text-sm ml-1'>▶ Id paciente</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Estatus</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Descripción</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Fecha</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Fecha creación</h1>
    </div>
  )
}

const UserComponentInfo = () => {
  return (
    <div className='mt-2'>
      <h1 className='font-semibold text-sm ml-1'>▶ Nombre</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Tipo usuario</h1>
    </div>
  )
}

const DoctorComponentInfo = () => {
  return (
    <div className='mt-2'>
      <h1 className='font-semibold text-sm ml-1'>▶ Nombre</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Apellido</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Cedúla</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Correo</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Especialidad</h1>
    </div>
  )
}
const PatientComponentInfo = () => {
  return (
    <div className='mt-2'>
      <h1 className='font-semibold text-sm ml-1'>▶ Nombre</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Apellido</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Cedúla</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Correo</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Dirección</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Género</h1>
      <h1 className='font-semibold text-sm ml-1'>▶ Telefono</h1>
    </div>
  )
}
