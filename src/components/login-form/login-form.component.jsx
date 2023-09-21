import { useFormik } from "formik";
import { useLoginUserMutation } from "../../api";
import { CheckboxComponent, FilledButton, InputComponent, UnfilledButton } from "..";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUserSchema } from "../../validations";

export const LoginForm = () => {

  const initialValues = {
    id: '',
    password: '',
    remember: false
  }

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const onSubmit = values => {
    // loginUser(data);
    console.log(values);
    //validate and redirect
  }

  const navigate = useNavigate();
  const handleCreateUserClick = e => {
    e.preventDefault();
    navigate('/register');
  }

  const {handleChange, handleBlur, handleSubmit, touched, errors} = useFormik({initialValues, validationSchema: loginUserSchema, onSubmit});

  return (
    <form onSubmit={handleSubmit}>
      <InputComponent id='id' name='id' type='text' placeholder='Cédula' onChange={handleChange} onBlur={handleBlur}/>
      { touched.id && errors.id ? (<div className="ml-2 mt- mr-2 mb-2 text-red-500">{errors.id}</div>) : null }
      <InputComponent id='password' name='password' type='password' placeholder='Contraseña' onChange={handleChange} onBlur={handleBlur}/>
      <div className=''>
        <CheckboxComponent id='remember' name='remember' text='Recordarme' onChange={handleChange} onBlur={handleBlur} />
        <NavLink to='/forgot-password' className=''>¿Olvidó su clave?</NavLink>
      </div>
      <div className=''>
        { isLoading ? <span>Loading</span> : <FilledButton text='Registrar' type='submit'/> }
        <UnfilledButton text='Crear cuenta' type='button' onClick={handleCreateUserClick} />
      </div>
      { isError ? <span className="ml-2 mt- mr-2 mb-2 text-red-500">Error al acceder</span> : null}
    </form>
  );
}
