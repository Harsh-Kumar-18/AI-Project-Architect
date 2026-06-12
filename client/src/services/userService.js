import api from "./api";

// GET PROFILE
export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

// UPDATE PROFILE
export const updateProfile = async (payload) => {
  const { data } = await api.put("/users/profile", payload);
  return data;
};