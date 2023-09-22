import { useFormik } from "formik";
import { registerUserSchema } from "../../validations";
import { InputComponent, FilledButton } from "../";
import { useRegisterUserMutation } from "../../api";

export const RegisterForm = () => {

  const initialValues = {
    firstName: '',
    lastName: '',
    id: '',
    address: '',
    birthdate: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();

  const onSubmit = values => {
    const { confirmPassword, ...data } = values;
    // registerUser(data);
    console.log(data);
  }

  const {handleChange, handleBlur, handleSubmit, touched, errors} = useFormik({initialValues, validationSchema: registerUserSchema, onSubmit});

  return (
    <form onSubmit={handleSubmit}>
      <InputComponent id='firstName' name='firstName' type='text' placeholder='Nombre' onChange={handleChange} onBlur={handleBlur}/>
      { touched.firstName && errors.firstName ? (<div className="ml-2 mt- mr-2 mb-2 text-red-500">{errors.firstName}</div>) : null }
      <InputComponent id='lastName' name='lastName' type='text' placeholder='Apellido' onChange={handleChange} onBlur={handleBlur}/>
      { touched.lastName && errors.lastName ? (<div className="ml-2 mt- mr-2 mb-2 text-red-500">{errors.lastName}</div>) : null }
      <InputComponent id='id' name='id' type='text' placeholder='Cédula' onChange={handleChange} onBlur={handleBlur}/>
      { touched.id && errors.id ? (<div className="ml-2 mt- mr-2 mb-2 text-red-500">{errors.id}</div>) : null }
      <InputComponent id='address' name='address' type='text' placeholder='Dirección' onChange={handleChange} onBlur={handleBlur}/>
      { touched.address && errors.address ? (<div className="ml-2 mt- mr-2 mb-2 text-red-500">{errors.address}</div>) : null }
      <InputComponent id='birthdate' name='birthdate' type='date' placeholder='Fecha de nacimiento' onChange={handleChange} onBlur={handleBlur}/>
      { touched.birthdate && errors.birthdate ? (<div className="ml-2 mt- mr-2 mb-2 text-red-500">{errors.birthdate}</div>) : null }
      <InputComponent id='email' name='email' type='text' placeholder='Correo electrónico' onChange={handleChange} onBlur={handleBlur}/>
      { touched.email && errors.email ? (<div className="ml-2 mt- mr-2 mb-2 text-red-500">{errors.email}</div>) : null }
      <InputComponent id='password' name='password' type='password' placeholder='Contraseña' onChange={handleChange} onBlur={handleBlur}/>
      { touched.password && errors.password ? (<div className="ml-2 mt- mr-2 mb-2 text-red-500">{errors.password}</div>) : null }
      <InputComponent id='confirmPassword' name='confirmPassword' type='password' placeholder='Confirmar contraseña' onChange={handleChange} onBlur={handleBlur}/>
      { touched.confirmPassword && errors.confirmPassword ? (<div className="ml-2 mt- mr-2 mb-2 text-red-500">{errors.confirmPassword}</div>) : null }
      { isLoading ? <span>Loading</span> : <FilledButton text='Registrar' type='submit'/> }
      { isError ? <span>Error al registrar usuario</span> : null}
    </form>
  );
}
