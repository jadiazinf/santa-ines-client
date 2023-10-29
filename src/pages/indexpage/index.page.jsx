import { useSelector } from "react-redux";
import { LoginForm, NavbarComponent, VanguiardiaComponent, QSomosComponent, RegisterForm, AppointmentForm, AppointmentFormPrueba, ModalConfirmationComponent } from "../../components";
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
    <div className="h-screen bg-slate-500 flex flex-col justify-center items-center">
      {/* <AppointmentFormPrueba /> */}
      <ModalConfirmationComponent accion={'Editar'} />
    </div>
  );
}