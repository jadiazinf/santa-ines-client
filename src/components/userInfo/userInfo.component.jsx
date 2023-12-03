import { useFormik } from "formik";
import { registerUserSchema } from "../../validations";
import { InputComponent } from "../inputs/input.component";
import { useUpdateUserMutation } from "../../api";
import { FilledButton, SelectComponent } from '../../components'
import { Checkbox } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { newUsername } from "../../store/reducers/user.reducer";

export const UserInfo = ({ info }) => {
  const [selections, setSelections] = useState({ username: false, password: false, typeUser: false })
  const { username: userName } = useSelector( state => state.authenticatedUser)
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: info.username,
      contrasena: info.password,
      userType: info.user_type,
    },
    validationSchema: registerUserSchema,
    onSubmit: (values) => {

      const selectedFields = {};
      if (selections.username) {
        selectedFields.username = values.username;
      }
      if (selections.password) {
        selectedFields.password = values.contrasena;
      }
      if (selections.typeUser) {
        selectedFields.user_type = values.userType;
      }

      toast.promise(
        new Promise((resolve, reject) => {
          updateUser({userName, selectedFields})
            .then((response) => {
              resolve('Usuario actualizado!');
              if(selections.username){
                dispatch(newUsername(selections.username));
              }
              if(selections.typeUser){
                dispatch(newTypeUser(selections.typeUser));
              }
            })
            .catch((error) => {
              reject(new Error(error));
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
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

  const handleClick = (e, checkboxName, checked) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [checkboxName]: !checked,
    }));
  };
  return (
    <section className='rounded-lg bg-gray-50 shadow-md p-5 w-3/4 flex flex-col justify-center items-center min-w-[430px]'>
      <div className="">
        <h1>Por favor seleccione los datos a actualizar</h1>
        <div className={`flex flex-row ${userName !== 'admin' ? 'gap-5 m-5' : 'my-5'}`}>
          {userName !== 'admin' ? <Checkbox color="default" onClick={(e) => handleClick(e, "username", selections.username)} >Nombre de usuario</Checkbox> : null }
          <Checkbox color="default" onClick={(e) => handleClick(e, "password", selections.password)} >Contraseña</Checkbox>
          {userName !== 'admin' ? <Checkbox color="default" onClick={(e) => handleClick(e, "typeUser",selections.typeUser)} >Tipo de usuario</Checkbox> : null }
        </div>
      </div>
      <div className="w-full">
        <form onSubmit={formik.handleSubmit}  className='flex flex-col gap-3 w-full'>
          {selections.username
          ? <InputComponent
              placeholder='Nombre de usuario'
              label='Username'
              name='username'
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.errors.username}
              className1={'w-full'}
            />
          : null
          }
          {selections.password
            ? <InputComponent
                placeholder='Contraseña'
                label='Contrasena'
                name='contrasena'
                value={formik.values.contrasena}
                onChange={formik.handleChange}
                error={formik.errors.contrasena}
                className1={'w-full'}
              />
            : null
          }
          {selections.typeUser
            ? <SelectComponent
                id='userType'
                name='userType'
                placeholder='Tipo de usuario'
                onChange={formik.handleChange}
                value={formik.values.userType}
                className1={'w-full'}
                options={[
                  { value: 'asistente', label: 'Asistente' },
                  { value: 'superUsuario', label: 'Super Usuario' }
                ]}
              />
            : null
          }
          {selections.username || selections.password || selections.typeUser  ? <FilledButton text={!isLoading ? 'Actualizar' : 'Cargando...' } block={isLoading} type='submit'/> : null }
        </form>
      </div>
    </section>
  )
}
