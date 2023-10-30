import { useParams } from 'react-router-dom';
import { FilledButton, InputComponent } from '../../components';
import { useFormik } from 'formik';
import { editDoctorSchema, } from '../../validations';
import { useUpdateDoctorMutation } from '../../api';
import toast from 'react-hot-toast';
import { useState } from 'react';

export const TabsDoctorsComponents = ({doctor}) => {
  const [activeTab, setActiveTab] = useState("información");
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabData = [
    { id: "información", label: "Información", component: <DoctorInfo info={doctor} /> },
    { id: "acciones", label: "Acciones", component:  <h2>lkaskldcaksdlckasd</h2>},
  ];
  return (
    <div className='space-y-5 w-[70%]'>
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
        {tabData.map((tab) => (
          <li className="mr-2" key={tab.id} role="presentation">
            <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === tab.id ? "border-primary" : ""}`} id={`${tab.id}-tab`} data-tabs-target={`#${tab.id}`} type="button" role="tab" aria-controls={tab.id} aria-selected={activeTab === tab.id} onClick={() => handleTabClick(tab.id)}>
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div>
        {tabData.map((tab) => (
          <div className={`${activeTab === tab.id ? "block" : "hidden"}`} id={tab.id} role="tabpanel" aria-labelledby={`${tab.id}-tab`} key={tab.id}>
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  )
}


const DoctorInfo = ({ info }) => {
  const formik = useFormik({
    initialValues: {
      nombre: info.nombre.cuerpo,
      apellido: info.apellido.cuerpo,
      especialidad: info.especialidad,
      cedula: info.cedula,
      telefono: info.telefono,
      genero: info.genero,
      correo: info.correo.correo,
    },
    validationSchema: editDoctorSchema,
    onSubmit: (values) => {
      toast.promise(
        new Promise((resolve, reject) => {
          updateDoctor(values)
            .then((response) => {
              resolve('¡Doctor actualizado!');
            })
            .catch((error) => {
              reject(new Error(response.data.message));
            })
        }),
        {
          loading: 'Cargando...',
          success: (message) => message,
          error: (error) => error.message,
        }
      );
    },
  });
  const [updateDoctor, { isLoading, isError }] = useUpdateDoctorMutation();

  return(
    <article className='rounded-lg bg-gray-50 shadow-md p-5'>
      <form onSubmit={formik.handleSubmit}  className='grid grid-cols-2 gap-5 w-full'>
        <InputComponent
          placeholder='Nombre'
          label='Nombre'
          name='nombre'
          value={formik.values.nombre}
          onChange={formik.handleChange}
          error={formik.errors.nombre}
          className1={'w-full'}
        />
        <InputComponent
          placeholder='Apellido'
          label='Apellido'
          name='apellido'
          value={formik.values.apellido}
          onChange={formik.handleChange}
          error={formik.errors.apellido}
          className1={'w-full'}
        />
        <InputComponent
          placeholder='Especialidad'
          label='Especialidad'
          name='especialidad'
          value={formik.values.especialidad}
          onChange={formik.handleChange}
          error={formik.errors.especialidad}
          className1={'w-full'}
        />
        <InputComponent
          placeholder='Cédula'
          label='Cédula'
          name='cedula'
          value={formik.values.cedula}
          onChange={formik.handleChange}
          error={formik.errors.cedula}
          className1={'w-full'}
        />
        <InputComponent
          placeholder='Teléfono'
          label='Telefono'
          name='telefono'
          value={formik.values.telefono}
          onChange={formik.handleChange}
          error={formik.errors.telefono}
          className1={'w-full'}
        />
        <InputComponent
          placeholder='Género'
          label='Género'
          name='genero'
          value={formik.values.genero}
          onChange={formik.handleChange}
          error={formik.errors.genero}
          className1={'w-full'}
        />
        <InputComponent
          placeholder='Correo'
          label='Correo'
          name='correo'
          value={formik.values.correo}
          onChange={formik.handleChange}
          error={formik.errors.correo}
          className1={'w-full'}
        />
        <FilledButton text={!isLoading ? 'Actualizar' : 'Cargando...' } block={isLoading} type='submit'/>
      </form>
    </article>
  )
}


const InputComponentPrueba = ({ label, name, value, onChange, error }) => {
  return (
    <div className='flex flex-col relative'>
      <label>{label}:</label>
      <input
        className='w-full text-center px-2 py-2 border-1 border-gray-400 bg-gray-200 rounded outline-none'
        type={label === 'Correo' ? 'email' : 'text'}
        name={name}
        value={value}
        onChange={onChange}
        />
      {error && <span className='text-red-600 text-xs'>{error}</span>}
    </div>
  );
};