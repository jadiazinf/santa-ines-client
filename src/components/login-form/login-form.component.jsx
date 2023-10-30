import { useFormik } from "formik";
import { FilledButton, InputComponent, UnfilledButton } from "..";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUserSchema } from "../../validations";
import { useLoginUserMutation } from "../../api";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../store/reducers/user.reducer";
import toast, { useToaster } from "react-hot-toast";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: ''
  }

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const onSubmit = values => {
    toast.promise(
      new Promise((resolve, reject) => {
        loginUser(values)
          .then((response) => {
            if (response.data.value) {
              dispatch(authenticateUser({
                username: values.username,
                role: 'authenticated'
              }));
              resolve('¡Bienvenido!'); // Resuelve la promesa si la solicitud es exitosa
              navigate(`/${values.username}/dashboard`);
            } else {
              reject(new Error(response.data.message)); // Rechaza la promesa si las credenciales son incorrectas
            }
          })
          .catch((error) => {
            reject(new Error(response.data.message)); // Rechaza la promesa si hay un error durante la solicitud
          })
      }),
      {
        loading: 'Cargando...',
        success: (message) => message,
        error: (error) => error.message,
      }
    );
  }

  const handleCreateUserClick = e => {
    e.preventDefault();
    navigate('/');
  }

  const {handleChange, handleBlur, handleSubmit, touched, errors} = useFormik({initialValues, validationSchema: loginUserSchema, onSubmit});

  return (
    <form onSubmit={handleSubmit}>
      <InputComponent id='username' name='username' type='text' placeholder='Nombre de usuario' onChange={handleChange} onBlur={handleBlur} error={errors.username}/>
      <InputComponent id='password' name='password' type='password' placeholder='Contraseña' onChange={handleChange} onBlur={handleBlur} error={errors.password}/>
      <div className='flex flex-col justify-end items-end mt-2 mr-1'>
        {/* <CheckboxComponent id='remember' name='remember' text='Recordarme' onChange={handleChange} onBlur={handleBlur} /> */}
        <NavLink to='/recuperar-clave' className='hover:text-primary'>¿Olvidó su clave?</NavLink>
        <NavLink to='/crear-cuenta' className='hover:text-primary'>Crear cuenta</NavLink>
      </div>
      <div className=''>
        <FilledButton text={!isLoading ? 'Registrar' : 'Cargando...' } block={isLoading} type='submit'/>
        <UnfilledButton text='Cancelar' type='button' onClick={handleCreateUserClick} />
      </div>
    </form>
  );
}