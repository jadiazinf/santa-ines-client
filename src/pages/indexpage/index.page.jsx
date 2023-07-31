import { useSelector } from "react-redux";

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
    <>
      {/* navbar */}
      {/* main */}
      {/* footer */}
      <h1>USER ROLE: { role }</h1>
    </>
  );
}
