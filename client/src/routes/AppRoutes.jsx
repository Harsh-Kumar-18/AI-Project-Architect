import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import GenerateProject from "../pages/GenerateProject";
import SavedProjects from "../pages/SavedProjects";
import ProjectDetail from "../pages/ProjectDetail";
import NotFound from "../pages/NotFound";

import ProtectedLayout from "../components/layout/ProtectedLayout";
import PublicRoutes from "./PublicRoutes";
import Profile from "../components/dashboard/Profile";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Pages */}
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoutes>
            <Signup />
          </PublicRoutes>
        }
      />

      {/* Protected Pages */}
      <Route element={<ProtectedLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/generate"
          element={<GenerateProject />}
        />

        <Route
          path="/saved-projects"
          element={<SavedProjects />}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetail />}
        />

        <Route
  path="/profile"
  element={<Profile />}
/>

      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;