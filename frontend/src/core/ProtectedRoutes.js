import React from "react";
import { isAuth } from "../auth/helpers";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const location = useLocation();
  console.log(isAuth().role);
  return isAuth() && allowedRoles?.includes(isAuth().role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
