import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "../../assets";
import { useGetDoctorAppointmentsQuery } from "../../api";
import { format } from "date-fns";

const statusColorMap = {
  activa: "success",
  paused: "danger",
  vacation: "warning",
};

export const TableComponent = ({columns, id_doctor, doctorName, doctorEspecialidad}) => {

  const [appointments, setAppointments] = useState([]);
  // const { data: appointments, isLoading, isError } = useGetDoctorAppointmentsQuery({id: id_doctor.UUID});
  const { data: appointmentsApi, isLoading, isError } = useGetDoctorAppointmentsQuery({id: "ce90c180-c414-4176-b97c-fd11263b447e"});   //Esto se cambia cuando se solucione el problema de Daniel

  useEffect(() => {
    if (!isLoading && !isError) {
      setAppointments(appointmentsApi);
      console.log("🚀 ~ file: table.component.jsx:21 ~ useEffect ~ appointmentsApi:", appointmentsApi)
    }
  }, [id_doctor, isLoading, isError, appointments]);


  const renderCell = React.useCallback((cita, columnKey) => {
    const cellValue = cita[columnKey];
    console.log("🚀 ~ file: table.component.jsx:31 ~ renderCell ~ cellValue:", cellValue)

    switch (columnKey) {
      case "idCita":
        return (
          <p className="text-bold text-sm capitalize text-default-400">{cita.id}</p>
        );
      // case "doctor":
      //   return (
      //     <User
      //       className="text-bold text-sm capitalize text-default-400 w-36"
      //       avatarProps={{ src: cita.avatar}}
      //       description={doctorName}
      //       name={cellValue}
      //     >
      //       {doctorName}
      //     </User>
      //   );
      case "fechaCita":
        return (
          <p className="text-bold text-sm capitalize text-default-400">{fechaHora(cita.appointmentDate, 'fecha')}</p>
        );
      case "horaCita":
        return (
          <p className="text-bold text-sm capitalize text-default-400">{fechaHora(cita.appointmentDate, "hora")}</p>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{cita.team}</p>
          </div>
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
            <Tooltip content="Detalles">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Editar Cita">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar Cita">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table isStriped >
      <TableHeader columns={columns} >
        {(column) => (
          <TableColumn className="bg-gray-100" key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No posee citas registradas."} items={appointments}>
        {(item, index) => (
          <TableRow key={index} className="hover:bg-slate-50 rounded-2xl">
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
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
