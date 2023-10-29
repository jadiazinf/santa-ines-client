import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom";
import { notAuthenticatedUserRoutes,
         adminUserRoutes,
         regularUserRoutes,
         superUserRoutes } from "./routes";
import { Toaster } from "react-hot-toast";
import { DashboardPage, DoctorInfoPage, IndexPage, LoginPage } from "./pages";
import { NavbarRecepcionistaComponent } from "./components/Navbar-recepcionista/navbar_recepcionista.component";
import { useState } from "react";

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
        <Route
          path="/:userName/dashboard/*"
          element={
            role === 'not-authenticated'
              ? <LoginPage />
              : <DashboardWithNavbar />
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

const DashboardWithNavbar = () => {
  const [doctores, setDoctores] = useState({});
  const [doctor, setDoctor] = useState({});
  return (
    <section className="w-full">
      <NavbarRecepcionistaComponent />
      <Routes>
        <Route index element={<DashboardPage doctores={doctores} setDoctores={setDoctores} doctor={doctor} setDoctor={setDoctor} />} />
        <Route path="info-doctor/:doctor_id" element={<DoctorInfoPage doctor={doctor} />} />
        <Route path="perfil" element={<h1>kakjsjkdc</h1>} />
      </Routes>
    </section>
  );
}