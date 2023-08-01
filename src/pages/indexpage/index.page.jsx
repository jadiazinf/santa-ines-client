import { useSelector } from "react-redux";
import { VanguiardiaComponent } from "../../components";
import NavbarComponent from "../../components/Navbar/navbar.component";
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
    <div className="px-2">
      <NavbarComponent/>
      {/* main */}
      {/* <h1>USER ROLE: { role }</h1> */}
      <VanguiardiaComponent/>
      <FooterComponent/>
    </div>
  );
}
