import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import Private from "./core/Private";
import ProtectedRoutes from "./core/ProtectedRoutes";
import Admin from "./core/Admin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Outlet />}>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/auth/activate/:token/:secret" element={<Activate />} />
      <Route
        element={<ProtectedRoutes allowedRoles={["admin", "subscriber"]} />}
      >
        <Route path="/private" element={<Private />} />
      </Route>
      <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Route>
  )
);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;
