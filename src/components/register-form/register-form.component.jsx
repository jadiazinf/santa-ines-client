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
      <InputComponent id='firstName' name='firstName' type='text' placeholder='Nombre' onChange={handleChange} onBlur={handleBlur} error={errors.firstName} />
      <InputComponent id='lastName' name='lastName' type='text' placeholder='Apellido' onChange={handleChange} onBlur={handleBlur} error={errors.lastName}/>
      <InputComponent id='id' name='id' type='text' placeholder='Cédula' onChange={handleChange} onBlur={handleBlur} error={errors.id}/>
      <InputComponent id='address' name='address' type='text' placeholder='Dirección' onChange={handleChange} onBlur={handleBlur} error={errors.address}/>
      <InputComponent id='birthdate' name='birthdate' type='date' placeholder='Fecha de nacimiento' onChange={handleChange} onBlur={handleBlur} error={errors.birthdate}/>
      <InputComponent id='email' name='email' type='text' placeholder='Correo electrónico' onChange={handleChange} onBlur={handleBlur} error={errors.email}/>
      <InputComponent id='password' name='password' type='password' placeholder='Contraseña' onChange={handleChange} onBlur={handleBlur} error={errors.password}/>
      <InputComponent id='confirmPassword' name='confirmPassword' type='password' placeholder='Confirmar contraseña' onChange={handleChange} onBlur={handleBlur} error={errors.confirmPassword}/>
      <div className=''>
        <FilledButton text={!isLoading ? 'Actualizar' : 'Cargando...' } block={isLoading} type='submit'/>
      </div>
    </form>
  );
}
