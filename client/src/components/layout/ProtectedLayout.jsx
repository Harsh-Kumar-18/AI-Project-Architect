import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../services/authService";

const ProtectedLayout = () => {
  return isLoggedIn()
    ? <Outlet />
    : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
