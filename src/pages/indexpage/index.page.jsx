import { useSelector } from "react-redux";
import { FooterComponent, NavbarAllUsersComponent, QSomosComponent, ServiciosComponent, VanguiardiaComponent } from "../../components";

export const IndexPage = () => {

  const { role } = useSelector(state => state.authenticatedUser);
  console.log("🚀 ~ file: index.page.jsx:12 ~ IndexPage ~ role:", role)

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
    <div className="flex flex-col justify-center items-center">
      <NavbarAllUsersComponent />
      <><VanguiardiaComponent /><QSomosComponent /><ServiciosComponent /><FooterComponent /></>
    </div>
  );
}