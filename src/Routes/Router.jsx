import { createBrowserRouter } from "react-router";
import App from "./../App";
import Login from "../Pages/Login";
import Dashboard from "../Layout/Dashboard";
import TaskBoard from "../Component/Dashboard/TaskBoard";
import AddTask from "../Pages/AddTask";
import SignUp from "../Pages/SignUp";
import DashStats from "../Pages/DashStats";
import Settings from "../Pages/Settings";
import PrivateRoute from "./PrivateRotue";
import EditTask from "../Pages/EditTask";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true, // ✅ This makes DashStats the default child inside Dashboard
        element: <DashStats />,
      },

      {
        path: "task",
        element: <TaskBoard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "updateTask/:id",
        element: <EditTask />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/addTask",
    element: <AddTask />,
  },
]);
