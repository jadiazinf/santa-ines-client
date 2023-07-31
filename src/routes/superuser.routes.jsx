import { createBrowserRouter } from "react-router-dom";
import { IndexPage } from "../pages";

export const superUserRoutes = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />
  }
]);
