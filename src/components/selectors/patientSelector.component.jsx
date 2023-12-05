import React, { useEffect, useState } from 'react'
import { CheckboxGroup } from '@nextui-org/react'
import { CustomCheckbox } from './customCheckbox';
import { crearPatient } from '../../store/reducers/crearCita.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { FilledButton } from '../../components'
import { setAccion2 } from '../../store/reducers/detalleCita.reducer';


export const PatientSelector = ({ patientEditable, onOpen }) => {
  const [patientSelected, setPatientSelected] = useState(null);
  const dispatch = useDispatch()
  const { patients } = useSelector( state => state.saveDoctors)

  useEffect(() => {
    if (patientEditable) {
      const editablePatient = patients.find((paciente) => paciente.id_number === patientEditable);
      setPatientSelected(editablePatient || null);
    }
  }, [patientEditable, patients]);

  const handleCheckboxChange = (paciente) => {
    if (patientSelected && patientSelected.id_number === paciente.id_number) {
      setPatientSelected(null);
      dispatch(crearPatient({}))
    } else {
      setPatientSelected(paciente);
      dispatch(crearPatient(paciente))
    }
  };
const onClickOpen = () => {
  dispatch(setAccion2('crearPacienteCita'));
}
  return (
    <div className="mt-14 m-10 flex flex-col justify-end items-end">
      <FilledButton onClick={() => { onClickOpen(); onOpen(); }}  text={'Agregar paciente'} type='button'/>
      <div className='grid xs:grid-cols-1 smm:grid-cols-2 gap-4 mt-5'>
        {patients === undefined
          ? <>
              <h1>Aún no tienes asignados pacientes agregardos al sistema, agrega uno.</h1>
            </>
          :<>
            {Object.values(patients).map((paciente, index) => (
              <div key={index} className="flex flex-col gap-1" >
                <CheckboxGroup
                  value={patientSelected ? [patientSelected.id_number] : []}
                  classNames={{
                    base: "w-full",
                  }}
                >
                  <CustomCheckbox
                    value={paciente.id_number}
                    user={{
                      name: `${paciente.name} ${paciente.lastname}`,
                      avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
                      username: `${paciente.id_number}`,
                      status: "Active",
                    }}
                    statusColor="primary"
                    checked={patientSelected && patientSelected.id_number === paciente.id_number}
                    onChange={() => handleCheckboxChange(paciente)}
                  />
                </CheckboxGroup>
              </div>
            ))}
          </>
        }
      </div>
    </div>

  );
};