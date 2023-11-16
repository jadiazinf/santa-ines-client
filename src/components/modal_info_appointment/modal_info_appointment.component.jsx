import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip} from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { FilledButton } from '../buttons/filledbutton.component';
import { capitalizeFirstLetter } from '../../helpers/capitalize.helper';
import { format } from 'date-fns';
import { es } from "date-fns/locale";
import { fechaHora } from '../../helpers/calendar.helper';
import { setAccion } from '../../store/reducers/detalleCita.reducer';

const statusColorMap = {
  Activa: "primary",
  Deleted: "danger",
  Actualizada: "warning",
  Completada: "success",
};

export const ModalInfoComponent = ({ isOpen, onOpenChange }) => {
  const dispatch = useDispatch();
  const { accion } = useSelector( state => state.detalles)

  const handleClick = () => {
    dispatch(setAccion());
  }

  return (
    <>
      <Modal  backdrop={'blur'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true}  className=' bg-slate-50 p-2 rounded-lg'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-lg text-primary underline">Información de {accion}:</ModalHeader>
              <ModalBody>
                { accion === 'cita' ? <DetalleCita /> : null }
                { accion === 'usuario' ? <DetalleUsuario /> : null }
                { accion === 'doctor' ? <DetalleDoctor /> : null }
                { accion === 'paciente' ? <DetallePaciente /> : null }

              </ModalBody>
              <ModalFooter>
                <FilledButton onClick={() => { handleClick(); onClose(); }} class={`bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded w-[100px]`} text={'Cerrar'}/>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}


//TODO -> Este componente se puede mejorar para que no se repita tanto codigo
const DetalleCita = () => {
  const { cita } = useSelector( state => state.detalles)
  const { doctor } = useSelector( state => state.saveDoctors)
  var dateObject2 = new Date(cita.date);
  const name = `${doctor.nombre.cuerpo} ${doctor.apellido.cuerpo}}`
  const date = `${fechaHora(cita.date, 'fecha')} a las ${' '} ${fechaHora(cita.date, 'hora')}`;
  return (
    <>
      <DetalleItem key={'Id'} titulo={'Id'} valor={cita.id} />
      <DetalleItem key={'Descripción'} titulo={'Descripción'} valor={cita.descripcion} />
      <DetalleItem
        key={'Fecha de creación'}
        titulo={'Fecha de creación'}
        valor={capitalizeFirstLetter(
          format(dateObject2, "yyyy'-'MM'-'dd", {
            locale: es,
          }).toString()
          )} />
      <DetalleItem key={'Fecha de actividad'} titulo={'Fecha de actividad'} valor={date} />
      <div className='flex flex-row space-x-2'>
        <h1 className='font-bold'>Estado:</h1>
        <Chip className="capitalize" color={statusColorMap[cita.status]} size="sm" variant="flat">
          {cita.status}
        </Chip>
      </div>
      <DetalleItem key={'ID paciente'} titulo={'ID paciente'} valor={cita.patientId} />

      <div className='border w-full'></div>
      <h1 className="py-4  flex-initial flex flex-col gap-1 font-bold text-lg text-primary underline">Información del doctor:</h1>
      <DetalleItem key={'Nombre'} titulo={'Nombre'} valor={name}/>
      <DetalleItem key={'Cédula'} titulo={'Cédula'} valor={doctor.cedula}/>
      <DetalleItem key={'Especialidad'} titulo={'Especialidad'} valor={doctor.especialidad}/>
      <DetalleItem key={'Correo'} titulo={'Correo'} valor={doctor.correo.correo}/>
      <DetalleItem key={'Teléfono'} titulo={'Teléfono'} valor={doctor.telefono}/>
    </>
  )
}

const DetalleUsuario = () => {
  const { usuario } = useSelector((state) => state.detalles);

  const renderizarDetalles = () => {
    return Object.entries(usuario).map(([clave, valor]) => (
      <DetalleItem key={clave} titulo={clave} valor={valor} />
    ));
  };

  return <>{renderizarDetalles()}</>;
};


const DetalleDoctor = () => {
  const { doctor } = useSelector((state) => state.detalles);

  const renderizarDetalles = () => {
    return Object.entries(doctor).map(([clave, valor]) => (
      <DetalleItem key={clave} titulo={clave} valor={valor} />
    ));
  };

  return <>{renderizarDetalles()}</>;
}

const DetallePaciente = () => {
  const { paciente } = useSelector((state) => state.detalles);

  const renderizarDetalles = () => {
    return Object.entries(paciente).map(([clave, valor]) => (
      <DetalleItem key={clave} titulo={clave} valor={valor} />
    ));
  };

  return <>{renderizarDetalles()}</>;
}



const DetalleItem = ({ titulo, valor }) => (
  <div className='flex flex-row space-x-2'>
    <h1 className='font-bold'>{titulo}:</h1>
    <p>{valor}</p>
  </div>
);
