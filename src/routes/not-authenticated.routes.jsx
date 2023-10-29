import { createBrowserRouter } from "react-router-dom";
import { IndexPage } from "../pages";

export const notAuthenticatedUserRoutes = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />
  }
]);
