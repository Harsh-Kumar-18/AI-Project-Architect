import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/authService";

const PublicRoutes = ({ children }) => {
  return isLoggedIn()
    ? <Navigate to="/dashboard" replace />
    : children;
};

export default PublicRoutes;