import { apiClient, setAccessToken } from "./apiClient";

export const registerUser = async (name, email, password) => {
  const response = await apiClient.post("/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await apiClient.post("/auth/login", { email, password });
  const { accessToken, user } = response.data?.data || {};
  if (accessToken) {
    setAccessToken(accessToken);
  }
  return { user, accessToken };
};

export const logoutUser = async () => {
  await apiClient.post("/auth/logout");
  setAccessToken(null);
};
