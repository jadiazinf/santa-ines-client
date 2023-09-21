import { useSelector } from "react-redux";
import { LoginForm, NavbarComponent, VanguiardiaComponent, QSomosComponent } from "../../components";
import ServiciosComponent from "../../components/servicios/servicios.component";
import FooterComponent from "../../components/footer/footer.component";

export const IndexPage = () => {

  const { role } = useSelector(state => state.authenticatedUser);

  // let userMain;

  // switch(role) {
  //   case 'not-authenticated':
  //     userMain = notAuthenticatedUserMain;
  //     break;
  //   case 'regular':
  //     userMain = regularUserMain;
  //     break;
  //   case 'admin':
  //     userMain = adminUserMain;
  //     break;
  //   case 'superuser':
  //     userMain = superUserMain;
  //     break;
  //   default:
  //     userMain = notAuthenticatedUserMain;
  // }

  return (
    //De esta manera sabremos que renderizar dependiendo del usuario
    <div className="mx-2 flex flex-col justify-center items-center">
      <NavbarComponent />
      {role === 'regular' || role === 'not-authenticated'
        ? <><VanguiardiaComponent /><QSomosComponent /><ServiciosComponent /><FooterComponent /></>
        : <LoginForm/>//aca verificamos si es adminUser o superUser
      }
    </div>
  );
}