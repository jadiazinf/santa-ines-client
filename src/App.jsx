import { useSelector } from "react-redux"
import { RouterProvider } from "react-router-dom";
import { notAuthenticatedUserRoutes,
         adminUserRoutes,
         regularUserRoutes,
         superUserRoutes } from "./routes";

export const App = () => {

  const { role } = useSelector( state => state.authenticatedUser)

  let userRoutes;

  switch(role) {
    case 'not-authenticated':
      userRoutes = notAuthenticatedUserRoutes;
      break;
    case 'regular':
      userRoutes = regularUserRoutes;
      break;
    case 'admin':
      userRoutes = adminUserRoutes;
      break;
    case 'superuser':
      userRoutes = superUserRoutes;
      break;
    default:
      userRoutes = notAuthenticatedUserRoutes;
  }

  return (
    <>
      <RouterProvider router={userRoutes}/>
    </>
  );
}
