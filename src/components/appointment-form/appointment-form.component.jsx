import { useFormik } from "formik";
import { InputComponent } from "..";
import { registerAppointmentSchema } from "../../validations";
import { useDispatch } from "react-redux";
import { crearCitaDescripcion, descripcionError } from "../../store/reducers/crearCita.reducer";
import { capitalizeFirstLetter } from "../../helpers/capitalize.helper";
import { useEffect } from "react";

export const AppointmentForm = ({ edited, descripcionEditable}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(edited){
      dispatch(crearCitaDescripcion(capitalizeFirstLetter(descripcionEditable)));
      dispatch(descripcionError(false));
    }
  }, [edited])

  const handleDescripcionChange = (e) => {
    formik.handleChange(e);
    const { value } = e.target;
    if(formik.errors.descripcion || value.length < 20){
      dispatch(descripcionError(true));
    } else {
      dispatch(descripcionError(false));
      dispatch(crearCitaDescripcion(capitalizeFirstLetter(value)));
    }
  };

  const formik = useFormik({
    initialValues: {
      descripcion: descripcionEditable || '' ,
      appointmentDate: '',
    },
    validationSchema: registerAppointmentSchema,
  });

  return (
    <form className="m-10 mt-36">
      <InputComponent
        placeholder='Descripción'
        label='descripcion'
        name='descripcion'
        value={formik.values.descripcion}
        onChange={handleDescripcionChange}
        error={formik.errors.descripcion}
      />
    </form>
  );
}
