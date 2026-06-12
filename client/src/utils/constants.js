export const APP_NAME = "AI Project Architect";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  GENERATE: "/generate",
  SAVED_PROJECTS: "/saved-projects",
  PROJECT_DETAIL: "/projects/:id",
};

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  GENERATE: "/ai/generate",
  PROJECTS: "/projects",
  PROJECT_BY_ID: (id) => `/projects/${id}`,
};