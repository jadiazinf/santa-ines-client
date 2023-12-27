import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from "@nextui-org/react";
import { useGetAllDoctorsMutation, useGetDoctorAppointmentsMutation, useGetPatientsMutation, useGetUsersMutation } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, renderAppointmentsCells, renderDoctorsCells, renderPatientsCells, renderUsersCells } from "./info";
import { useNavigate } from "react-router-dom";
import { editarCitaDate, editarCitaDescripcion, editarId, editarPaciente, editarStatus } from "../../store/reducers/editarCita.reducer";
import { ModalInfoComponent } from "../modal_info/modal_info.component";
import { saveDoctors, savePatients, saveUsers } from "../../store/reducers/userAdmin.reducer";
import { saveAppointments } from "../../store/reducers/crearCita.reducer";
import { detalleCita, detalleDoctor2, detallePaciente, detalleUsuario } from "../../store/reducers/detalleCita.reducer";
import { SearchBarComponent } from "../searchBar/searchBar.component";

const fetchFunctions = {
  'appointments': useGetDoctorAppointmentsMutation,
  'users': useGetUsersMutation,
  'doctors': useGetAllDoctorsMutation,
  'patients': useGetPatientsMutation
};

export const TableComponent = ({columns, id_doctor, action, data, path, setReset}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  }, []);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const onClickOpen = (object, dispatch, dataType) => {
    switch (dataType) {
      case 'appointments':
        onOpen();
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
  const totalItems = data.length;

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

          return itemTextPacienteId.includes(searchText) || itemTextStatus.includes(searchText) || itemTextDescripcion.includes(searchText);
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
  return (
    <>
      <ModalInfoComponent isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} setReset={setReset}/>
      <SearchBarComponent searchValue={searchValue} setSearchValue={setSearchValue}/>
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

const CustomPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderizarComponente = () => {
    const componentes = [];
    for (let i = 1; i <= totalPages; i++) {
      componentes.push(<SpamComponent key={i} numberPage={i} currentPage={currentPage} />);
    }
    return componentes;
  };

  return (
    <section aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-black-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`} onClick={() => handlePageChange(currentPage - 1)} >
            <span className="sr-only">Previous</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
          </button>
        </li>
        {renderizarComponente()}
        <li>
          <button className={`flex items-center justify-center px-3 h-8 leading-tight text-black-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 `} onClick={() => handlePageChange(currentPage + 1)} >
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>
        </li>
      </ul>
    </section>
  );
};

const SpamComponent = ({ numberPage, currentPage }) => {
  return (
    <li>
      <span className={`flex items-center justify-center px-3 h-8 leading-tight text-black-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === numberPage ? 'bg-primary text-white ' : 'bg-white '}`}>{numberPage}</span>
    </li>
  )
}


