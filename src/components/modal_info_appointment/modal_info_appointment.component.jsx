import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip} from "@nextui-org/react";
import { useSelector } from 'react-redux';
import { FilledButton } from '../buttons/filledbutton.component';

export const ModalInfoComponent = ({ isOpen, onOpen, onOpenChange, idCita }) => {
  const { id, date, creationDate, descripcion, status, patientId } = useSelector( state => state.detalleAppointment)
  const { doctor } = useSelector( state => state.saveDoctors)
  const statusColorMap = {
    Activa: "primary",
    Deleted: "danger",
    Actualizada: "warning",
    Completada: "success",
  };
  return (
    <>
      <Modal  backdrop={'blur'} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true}  className=' bg-slate-50 p-2 rounded-lg'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-lg text-primary underline">Información de la cita:</ModalHeader>
              <ModalBody>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>Id: </h1>
                  <p>
                    {id}
                  </p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>Descripción:</h1>
                  <p className='break-words w-[330px]'>
                    {descripcion}
                  </p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>Fecha de cración:</h1>
                  <p>
                    {creationDate}
                  </p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>Fecha de actividad:</h1>
                  <p>
                    {date}
                  </p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>Estado:</h1>
                  <Chip className="capitalize" color={statusColorMap[status]} size="sm" variant="flat">
                    {status}
                  </Chip>
                </div>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>ID paciente:</h1>
                  <p>
                    {patientId}
                  </p>
                </div>
                <div className='border w-full'></div>
                <h1 className="py-4  flex-initial flex flex-col gap-1 font-bold text-lg text-primary underline">Información del doctor:</h1>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>Nombre:</h1>
                  <p>
                    {doctor.nombre.cuerpo} {doctor.apellido.cuerpo}
                  </p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>Cédula:</h1>
                  <p>
                    {doctor.cedula}
                  </p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>Especialidad:</h1>
                  <p>
                    {doctor.especialidad}
                  </p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>Correo:</h1>
                  <p>
                    {doctor.correo.correo}
                  </p>
                </div>
                <div className='flex flex-row space-x-2'>
                  <h1 className='font-bold'>Teléfono:</h1>
                  <p>
                    {doctor.telefono}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <FilledButton onClick={onClose} class={`bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded w-[100px]`} text={'Cerrar'}/>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
