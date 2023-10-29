import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom";
import { notAuthenticatedUserRoutes,
         adminUserRoutes,
         regularUserRoutes,
         superUserRoutes } from "./routes";
import { Toaster } from "react-hot-toast";
import { DashboardPage, DoctorInfoPage, IndexPage, LoginPage } from "./pages";

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
      {/* <RouterProvider router={userRoutes}/> */}
      <Routes>
        <Route  path="/" element={<IndexPage />} />
        <Route  path="/login" element={<LoginPage />} />
        <Route path="/:userName/dashboard/*" element={<DashboardWithNavbar />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

const DashboardWithNavbar = () => {
  return (
    <div>
      {/* <NavbarComponent /> */}
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="info-doctor/:doctorName" element={<DoctorInfoPage />} />
      </Routes>
    </div>
  );
}