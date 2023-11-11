import { useDeleteAppointmentMutation, useGetDoctorAppointmentsMutation } from "../../api";
import { useDispatch } from "react-redux";
import { fechaHora } from "../../helpers/calendar.helper";
import { Chip, Tooltip, useDisclosure } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "../../assets";
import { saveAppointments } from "../../store/reducers/crearCita.reducer";
import { saveUsers } from "../../store/reducers/userAdmin.reducer";
import toast from "react-hot-toast";
import { detalleCita } from "../../store/reducers/detalleCita.reducer";

const statusColorMap = {
  Activa: "primary",
  Deleted: "danger",
  Actualizada: "warning",
  Completada: "success",
};

export const fetchDoctorAppointments = async (id, dispatch, getDoctorAppointments) => {
  try {
    const response = await getDoctorAppointments({ id });
    if (response.data) {
      dispatch(saveAppointments(response.data));
    }
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
  }
};
const onClickOpen = (cita, dispatch) => {
  dispatch(detalleCita(cita));
}

export const renderAppointmentsCells = (cita, columnKey, id_doctor, onClick, onOpen, dispatch) => {
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
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => { onClickOpen(cita, dispatch); onOpen(); }}>
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Editar Cita" className="text-sm">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => onClick(cita.id, cita.appointmentDate, cita.description, 'Actualizada')}>
              <EditIcon />
            </span>
          </Tooltip>
          <DeleteAppointmentButton id={cita.id} id_doctor={id_doctor}/>
        </div>
      );
    default:
      return cellValue;
  }
};

const DeleteAppointmentButton = ({ id, id_doctor}) => {
  const dispatch = useDispatch();
  const [ deleteAppointment, isLoading, isError ]= useDeleteAppointmentMutation();
  const [ getDoctorAppointments ]= useGetDoctorAppointmentsMutation();

  const handleClick = async (id) => {
    try {
      toast.promise(
        new Promise((resolve, reject) => {
          deleteAppointment({id: id})
            .then((response) => {
              if (response.data.value) {
                getDoctorAppointments({id: 'ce90c180-c414-4176-b97c-fd11263b447e'})
                .then((response) => {
                  if (response.data) {
                    dispatch(saveAppointments(response.data));
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
      <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleClick(id)} >
        <DeleteIcon />
      </span>
    </Tooltip>
  );
};

export const fetchUsers = async (dispatch, getAllUsers) => {
  try {
    const response = await getAllUsers();
    if (response.data) {
      dispatch(saveUsers(response.data));
    }
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
  }
};

export const renderUsersCells = (usuario, columnKey) => {
  switch (columnKey) {
    case "id":
      return (
        <p className="text-bold text-sm capitalize text-default-400">{usuario.ID}</p>
      );
    case "username":
      return (
        <p className="text-bold text-sm capitalize text-default-400">{usuario.username}</p>
      );
    case "password":
      return (
        <p className="text-bold text-sm capitalize text-default-400">{usuario.password}</p>
      );
    case "tipoUsuario":
      return (
        <p className="text-bold text-sm capitalize text-default-400">{usuario.user_type}</p>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Detalles" className="text-sm">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Editar Usuario" className="text-sm">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <DeleteUserButton id={usuario.ID}/>
        </div>
      );
      default:
        return cellValue;
      }
};

const DeleteUserButton = ({ id }) => {
  const dispatch = useDispatch();
  // const [ deleteAppointment, isLoading, isError ]= useDeleteAppointmentMutation();
  // const [ getDoctorAppointments ]= useGetDoctorAppointmentsMutation();

  // const handleClick = async (id) => {
  //   try {
  //     toast.promise(
  //       new Promise((resolve, reject) => {
  //         deleteAppointment({id: id})
  //           .then((response) => {
  //             if (response.data.value) {
  //               getDoctorAppointments({id: 'ce90c180-c414-4176-b97c-fd11263b447e'})
  //               .then((response) => {
  //                 if (response.data) {
  //                   dispatch(saveAppointments(response.data));
  //                 }
  //               })
  //               resolve('¡Cita eliminada!');
  //             } else {
  //               reject(new Error(response.data.message));
  //             }
  //           })
  //           .catch((error) => {
  //             reject(new Error(error));
  //           })
  //       }),
  //       {
  //         loading: 'Cargando...',
  //         success: (message) => message,
  //         error: (error) => error.message,
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error al eliminar usuario:", error);
  //   }
  // };

  return (
    <Tooltip  content="Eliminar Usuario" className=" text-sm py-1 px-1 border bg-danger_blur text-danger rounded">
      <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => console.log('se elimina el usuario')}>
        <DeleteIcon />
      </span>
    </Tooltip>
  );
};
