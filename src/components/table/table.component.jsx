import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from "@nextui-org/react";
import { useGetDoctorAppointmentsMutation, useGetDoctorsMutation, useGetPatientsMutation, useGetUsersMutation } from "../../api";
import { useDispatch } from "react-redux";
import { fetchDoctorAppointments, fetchDoctors, fetchUsers, renderAppointmentsCells, renderDoctorsCells, renderUsersCells } from "./info";
import { useNavigate } from "react-router-dom";
import { editarCitaDate, editarCitaDescripcion, editarId, editarStatus } from "../../store/reducers/editarCita.reducer";
import { ModalInfoComponent } from "../modal_info_appointment/modal_info_appointment.component";

const fetchFunctions = {
  'appointments': useGetDoctorAppointmentsMutation,
  'users': useGetUsersMutation,
  'doctors': useGetDoctorsMutation,
  'patients': useGetPatientsMutation
};

export const TableComponent = ({columns, id_doctor, action, data, path}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let getDoctorAppointments;
  let getAllUsers;
  let getDoctors;
  let getPatients;
  const selectedFetchFunction = fetchFunctions[action];
  switch (action) {
    case 'appointments':
      [getDoctorAppointments] = selectedFetchFunction();
      break;
    case 'users':
      [getAllUsers] = selectedFetchFunction();
      break;
    case 'doctors':
      [getDoctors] = selectedFetchFunction();
      break;
    case 'patients':
      [getPatients] = selectedFetchFunction();
      break;
    default:
      break;
  }

  const onClick = (id, date, description, status) => {
    dispatch(editarId(id));
    dispatch(editarCitaDate(date));
    dispatch(editarCitaDescripcion(description));
    dispatch(editarStatus(status));
    navigate(path);
  }

  useEffect(() => {
    switch (action) {
      case 'appointments':
      fetchDoctorAppointments(id_doctor.UUID, dispatch, getDoctorAppointments)
        break;
      case 'users':
        fetchUsers(dispatch, getAllUsers)
        break;
      case 'doctors':
        fetchDoctors(dispatch, getDoctors)
        break;
      case 'patients':
        break;
      default:
        break;
    }
  }, []);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <ModalInfoComponent isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
      <Table aria-label="tabla" className="">
        <TableHeader columns={columns} className="mb-5">
          {(column) => (
            <TableColumn className="bg-gray-100 " key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No posee citas registradas."} items={data} >
          {(item, index) => (
            <TableRow key={index || item.ID} className={`hover:bg-table_hover h-16`}>
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
      return content = renderUsersCells(item, columnKey);
    case 'doctors':
      return content = renderDoctorsCells(item, columnKey);
    default:
      return content = <div>Contenido por defecto</div>;
  }
}