import { useFormik } from "formik";
import { InputComponent } from "..";
import { registerAppointmentSchema } from "../../validations";
import { useDispatch } from "react-redux";
import { crearCitaDescripcion, descripcionError } from "../../store/reducers/crearCita.reducer";
import { capitalizeFirstLetter } from "../../helpers/capitalize.helper";

export const AppointmentForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    descripcion: '',
    appointmentDate: '',
  }

  // Función para actualizar el estado local cuando se cambia un campo
  //Creo que esta logica no se esta manejando de la mejor manera, pero funciona
  //Se puede intentar mejorar
  const handleInputChange = e => {
    const { value } = e.target;
    if(!errors.descripcion){
      dispatch(descripcionError(false));
      dispatch(crearCitaDescripcion(capitalizeFirstLetter(value)));
    } else {
      dispatch(descripcionError(true));
    }
  };

  const {handleChange, handleBlur, handleSubmit, touched, errors} = useFormik({initialValues, validationSchema: registerAppointmentSchema});

  return (
    <form className="m-10">
      <InputComponent
        id='descripcion'
        name='descripcion'
        type='text'
        placeholder='Descripción'
        onChange={e => {
          handleChange(e);
          handleInputChange(e);
        }} onBlur={handleBlur}/>
      { touched.descripcion && errors.descripcion ? (<div className="ml-2 mt- mr-2 mb-2 text-red-500">{errors.descripcion}</div>) : null }
    </form>
  );
}
