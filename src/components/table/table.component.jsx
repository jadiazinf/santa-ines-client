import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from "@nextui-org/react";
import { useGetDoctorAppointmentsMutation, useGetDoctorsMutation, useGetPatientsMutation, useGetUsersMutation } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, renderAppointmentsCells, renderDoctorsCells, renderPatientsCells, renderUsersCells } from "./info";
import { useNavigate } from "react-router-dom";
import { editarCitaDate, editarCitaDescripcion, editarId, editarPaciente, editarStatus } from "../../store/reducers/editarCita.reducer";
import { ModalInfoComponent } from "../modal_info/modal_info.component";
import { saveDoctors, savePatients, saveUsers } from "../../store/reducers/userAdmin.reducer";
import { saveAppointments } from "../../store/reducers/crearCita.reducer";
import { detalleCita, detalleDoctor2, detallePaciente, detalleUsuario } from "../../store/reducers/detalleCita.reducer";
import toast from "react-hot-toast";

const fetchFunctions = {
  'appointments': useGetDoctorAppointmentsMutation,
  'users': useGetUsersMutation,
  'doctors': useGetDoctorsMutation,
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

  return (
    <>
      <ModalInfoComponent isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} setReset={setReset}/>
      <Table aria-label="tabla" className="">
        <TableHeader columns={columns} className="mb-5">
          {(column) => (
            <TableColumn className="bg-gray-200 " key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No posee datos registrados aún."} items={data} >
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