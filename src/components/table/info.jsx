import { useDeleteAppointmentMutation, useDeleteDoctorMutation, useDeletePatientMutation, useDeleteUserMutation, useGetDoctorAppointmentsMutation, useGetDoctorsMutation, useGetPatientsMutation, useGetUsersMutation } from "../../api";
import { useDispatch } from "react-redux";
import { fechaHora } from "../../helpers/calendar.helper";
import { Chip, Tooltip, useDisclosure } from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "../../assets";
import { saveAppointments } from "../../store/reducers/crearCita.reducer";
import { saveDoctors, savePatients, saveUsers } from "../../store/reducers/userAdmin.reducer";
import toast from "react-hot-toast";
import { detalleCita, detalleDoctor, detallePaciente, detalleUsuario } from "../../store/reducers/detalleCita.reducer";

const statusColorMap = {
  Activa: "primary",
  Deleted: "danger",
  Actualizada: "warning",
  Completada: "success",
};

const deleteFunctions = {
  'cita': useDeleteAppointmentMutation,
  'usuario': useDeleteUserMutation,
  'doctor': useDeleteDoctorMutation,
  'paciente': useDeletePatientMutation
};

const fetchFunctions = {
  'cita': useGetDoctorAppointmentsMutation,
  'usuario': useGetUsersMutation,
  'doctor': useGetDoctorsMutation,
  'paciente': useGetPatientsMutation
};

const onClickOpen = (object, dispatch, dataType) => {
  switch (dataType) {
    case 'cita':
      dispatch(detalleCita(object));
      break;
    case 'usuario':
      dispatch(detalleUsuario(object));
      break;
    case 'doctor':
      dispatch(detalleDoctor(object));
      break;
    case 'paciente':
      dispatch(detallePaciente(object));
      break;
    default:
      break;
  }
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
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => { onClickOpen(cita, dispatch, 'cita'); onOpen(); }}>
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Editar Cita" className="text-sm">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => onClick(cita.id, cita.appointmentDate, cita.description, 'Actualizada')}>
              <EditIcon />
            </span>
          </Tooltip>
          {/* <DeleteAppointmentButton id={cita.id} id_doctor={id_doctor}/> */}
          <DeleteButton idObject={cita.id} dataType={'cita'} saveFunction={saveAppointments} id2={id_doctor.UUID} />
        </div>
      );
    default:
      return cellValue;
  }
};

export const renderUsersCells = (usuario, columnKey, onOpen, dispatch) => {
  if(columnKey !== 'actions') {
    return (
      <p className="text-bold text-sm capitalize text-default-400">{usuario[columnKey]}</p>
    );
  }else{
    return (
        <ActionsButtons id={usuario.username} dataType={'usuario'} saveData={saveUsers} object={usuario} onOpen={onOpen} dispatch={dispatch}/>
      );
  }
};

export const renderDoctorsCells = (doctor, columnKey, onOpen, dispatch) => {
  if(columnKey === "cedula" ||columnKey === "especialidad" ||columnKey === "telefono") {
    return (
      <p className="text-bold text-sm capitalize text-default-400">{doctor[columnKey]}</p>
    );
  }
  switch (columnKey) {
    case "nombre":
      return (
        <p className="text-bold text-sm capitalize text-default-400">{doctor.nombre.cuerpo}</p>
      );
    case "apellido":
      return (
        <p className="text-bold text-sm capitalize text-default-400">{doctor.apellido.cuerpo}</p>
      );
    case "correo":
      return (
        <p className="text-bold text-sm capitalize text-default-400">{doctor.correo.correo}</p>
      );
    case "actions":
      return (
        <ActionsButtons id={doctor.cedula} dataType={'doctor'} saveData={saveDoctors} object={doctor} onOpen={onOpen} dispatch={dispatch}/>
      );
    }
};

export const renderPatientsCells = (patient, columnKey, onOpen, dispatch) => {
  switch (columnKey) {
    case "birthday":
      const fechaFormateada = new Date(patient[columnKey]).toISOString().split('T')[0];

      return ( <p className="text-bold text-sm capitalize text-default-400">{fechaFormateada}</p> )
    case "actions":
      return (
        <ActionsButtons id={patient.id_number} dataType={'paciente'} saveData={savePatients} object={patient} onOpen={onOpen} dispatch={dispatch}/>
      );
    default:
      return <p className="text-bold text-sm capitalize text-default-400">{patient[columnKey]}</p>
  }
};


const ActionsButtons = ({ id, dataType, saveData, object, onOpen, dispatch}) => {
  return (
    <div className="relative flex items-center gap-2">
      <Tooltip content="Detalles" className="text-sm">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => { onClickOpen(object, dispatch, dataType); onOpen(); }}>
          <EyeIcon />
        </span>
      </Tooltip>
      <Tooltip content={`Editar ${dataType}`} className="text-sm">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EditIcon />
        </span>
      </Tooltip>
      <DeleteButton idObject={id} dataType={dataType} saveFunction={saveData} />
    </div>
  )
}

const DeleteButton = ({ idObject, dataType, saveFunction, id2}) => {
  const selectedDeleteFunction = deleteFunctions[dataType];
  const selectedfetchFunction = fetchFunctions[dataType];

  const [deleteFunction] = selectedDeleteFunction();
  const [fetchFunction] = selectedfetchFunction();

  const dispatch = useDispatch();
  const handleClick = () => {
    deleteData(dispatch, deleteFunction, saveFunction, fetchFunction, dataType, {id: idObject}, id2)
  }

  return (
    <Tooltip  content={`Eliminar ${dataType}`} className=" text-sm py-1 px-1 border bg-danger_blur text-danger rounded">
      <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleClick()}>
        <DeleteIcon />
      </span>
    </Tooltip>
  );
};

export const fetchData = async (dispatch, fetchFunction, saveFunction, dataType, bodyData) => {
  try {
    let response;
    if (bodyData) {
      const { id } = bodyData;
      response = await fetchFunction({ id });
    } else {
      response = await fetchFunction();
    }

    if (response.data) {
      dispatch(saveFunction(response.data));
    }
  } catch (error) {
    console.error(`Error al capturar ${dataType}`, error);
  }
};

export const deleteData = async (dispatch, deleteFunction, saveFunction, fetchFunctionAct, dataType, bodyData, id2) => {
  try {
    const { id } = bodyData;
    let response = await deleteFunction({ id });
    console.log("🚀 ~ file: info.jsx:52 ~ deleteData ~ response:", response)
    //TODO -> AcA se deberia eliminar el doctor
    if(response.error){
      toast.error(response.error.data);
    }else {
      if(id2){
        fetchData(dispatch, fetchFunctionAct, saveFunction, dataType, {id: id2});
      }else{
        console.log('segundo id', dataType)
        fetchData(dispatch, fetchFunctionAct, saveFunction, dataType);
      }
    }
  } catch (error) {
    console.error(`Error al capturar ${dataType}`, error);
  }
};
