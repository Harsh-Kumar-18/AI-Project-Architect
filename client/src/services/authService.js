import api from "./api";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  const { token, user } = response.data;
  localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
  return response.data;
};

export const signup = async (name, email, password) => {
  const response = await api.post("/auth/signup", { name, email, password });
  const { token, user } = response.data;
  localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getToken = () => localStorage.getItem("token");
export const isLoggedIn = () => !!localStorage.getItem("token");
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};
