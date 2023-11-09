import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "../../assets";
import { useDeleteAppointmentMutation, useGetDoctorAppointments2Mutation, useGetDoctorAppointmentsQuery } from "../../api";
import toast from "react-hot-toast";

const statusColorMap = {
  Activa: "primary",
  Deleted: "danger",
  Completada: "warning",
};

export const TableComponent = ({columns, id_doctor, doctorName, doctorEspecialidad}) => {
  const [appointments, setAppointments] = useState([]);
  // const { data: appointments, isLoading, isError } = useGetDoctorAppointmentsQuery({id: id_doctor.UUID});
  // const { data: appointmentsApi, isLoading, isError } = useGetDoctorAppointmentsQuery({id: "ce90c180-c414-4176-b97c-fd11263b447e"});   //Esto se cambia cuando se solucione el problema de Daniel
  const [ getDoctorAppointments2, isLoading, isError ]= useGetDoctorAppointments2Mutation();

  useEffect(() => {
      getDoctorAppointments2({id: 'ce90c180-c414-4176-b97c-fd11263b447e'})
      .then((response) => {
        if (response.data) {
          setAppointments(response.data);
        }
      })
  }, []);

  const renderCell = React.useCallback((cita, columnKey, appointments, setAppointments) => {
    switch (columnKey) {
      case "idCita":
        return (
          <p className="text-bold text-sm capitalize text-default-400">{cita.id}</p>
        );
      case "fechaCita":
        return (
          <p className="text-bold text-sm capitalize text-default-400">{fechaHora(cita.appointmentDate, 'fecha')}</p>
        );
      case "horaCita":
        return (
          <p className="text-bold text-sm capitalize text-default-400">{fechaHora(cita.appointmentDate, "hora")}</p>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[cita.status]} size="sm" variant="flat">
            {cita.status}
          </Chip>
        );
      case "idPaciente":
        return (
          <p className="text-bold text-sm capitalize text-default-400">{cita.patientId}</p>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detalles" className="text-sm">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Editar Cita" className="text-sm">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <DeleteAppointmentButton id={cita.id} setAppointments={setAppointments} appointments={appointments}/>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="tabla">
      <TableHeader columns={columns} className="mb-5">
        {(column) => (
          <TableColumn className="bg-gray-100 " key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No posee citas registradas."} items={appointments} >
        {(item, index) => (
          <TableRow key={index} className={`hover:bg-table_hover h-16`}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey, appointments, setAppointments)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}


function fechaHora(fechaISO, accion) {
    switch (accion) {
    case "fecha":
      var item = fechaISO.slice(0, 10);
      break;
    case "hora":
      var item = fechaISO.slice(11, 16);
      break;
    }
    return item;
}


const DeleteAppointmentButton = ({ id, setAppointments, appointments }) => {
  const [ deleteAppointment, isLoading, isError ]= useDeleteAppointmentMutation();
  const [ getDoctorAppointments2 ]= useGetDoctorAppointments2Mutation();

  const handleClick = async (id) => {
    try {
      toast.promise(
        new Promise((resolve, reject) => {
          deleteAppointment({id: id})
            .then((response) => {
              if (response.data.value) {
                getDoctorAppointments2({id: 'ce90c180-c414-4176-b97c-fd11263b447e'})
                .then((response) => {
                  if (response.data) {
                    setAppointments(response.data);
                  }
                })
                resolve('¡Cita eliminada!');
              } else {
                reject(new Error(response.data.message));
              }
            })
            .catch((error) => {
              reject(new Error(error));
            })
        }),
        {
          loading: 'Cargando...',
          success: (message) => message,
          error: (error) => error.message,
        }
      );
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };

  return (
    <Tooltip  content="Eliminar Cita" className=" text-sm py-1 px-1 border bg-danger_blur text-danger rounded">
      <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleClick(id)}>
        <DeleteIcon />
      </span>
    </Tooltip>
  );
};
