import { useSelector } from "react-redux"
import { Route, Routes, useLocation } from "react-router-dom";
import { notAuthenticatedUserRoutes,
          adminUserRoutes,
          regularUserRoutes,
          superUserRoutes } from "./routes";
import { Toaster } from "react-hot-toast";
import { AdminPage, AppointmentConsultPage, AppointmentFormPage, DashboardPage, DoctorInfoPage, IndexPage, LoginPage, PerfilPage } from "./pages";
import { NavbarRecepcionistaComponent } from "./components/Navbar-recepcionista/navbar_recepcionista.component";

export const App = () => {

  const { role, username } = useSelector( state => state.authenticatedUser)

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
        <Route  path="/consultar-citas" element={<AppointmentConsultPage />} />
        <Route  path="/login" element={<LoginPage />} />
        <Route
          path="/:userName/dashboard/*"
          element={
            role === 'not-authenticated'
              ? <LoginPage />
              : <DashboardWithNavbar username={username} />
          }
        />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

const DashboardWithNavbar = ({ username }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <section className="w-full">
      {pathname.includes('/appointmentForm/create') || pathname.includes('/appointmentForm/update') ? null : <NavbarRecepcionistaComponent />}
      {username === 'admin'
        ? <Routes>
            <Route index element={<AdminPage />} />
            <Route path="perfil" element={<PerfilPage action={'administrador'}/>} />
          </Routes>
        : <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="perfil" element={<PerfilPage action={'usuario'}/>} />
          <Route path="info-doctor/:doctor_id" element={<DoctorInfoPage />} />
          <Route path="appointmentForm/create" element={<AppointmentFormPage title={'Creación'} />} />
          <Route path="appointmentForm/update" element={<AppointmentFormPage title={'Edición'} />} />
        </Routes>
      }
    </section>
  );
}