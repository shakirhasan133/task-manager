import { createBrowserRouter } from "react-router";
import App from "./../App";
import Login from "../Pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);
