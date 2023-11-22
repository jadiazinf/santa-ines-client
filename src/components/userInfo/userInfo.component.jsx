import { useFormik } from "formik";
import { registerUserSchema } from "../../validations";
import { InputComponent } from "../inputs/input.component";
import { useUpdateUserMutation } from "../../api";
import { FilledButton } from '../../components'
import { Checkbox } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const UserInfo = ({ info }) => {
  const [selections, setSelections] = useState({ username: false, password: false, typeUser: false })
    const { username: userName } = useSelector( state => state.authenticatedUser)

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
        <div className="flex flex-row gap-5 m-5">
          <Checkbox color="default" onClick={(e) => handleClick(e, "username", selections.username)} >Nombre de usuario</Checkbox>
          <Checkbox color="default" onClick={(e) => handleClick(e, "password", selections.password)} >Contraseña</Checkbox>
          <Checkbox color="default" onClick={(e) => handleClick(e, "typeUser",selections.typeUser)} >Tipo de usuario</Checkbox>
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
            ? <InputComponent
                placeholder='Tipo de usuario'
                label='Tipo de usuario'
                name='userType'
                value={formik.values.userType}
                onChange={formik.handleChange}
                error={formik.errors.userType}
                className1={'w-full'}
              />
            : null
          }
          {selections.username || selections.password || selections.typeUser  ? <FilledButton text={!isLoading ? 'Actualizar' : 'Cargando...' } block={isLoading} type='submit'/> : null }
        </form>
      </div>
    </section>
  )
}
