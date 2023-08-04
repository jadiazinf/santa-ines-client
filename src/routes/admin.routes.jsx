import { createBrowserRouter } from "react-router-dom";
import { IndexPage } from "../pages";

export const adminUserRoutes = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />
  }
]);
