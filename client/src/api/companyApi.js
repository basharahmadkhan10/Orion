import { apiClient } from "./apiClient";

export const searchCompanies = async (query = "") => {
  const response = await apiClient.get(
    `/companies${query ? `?query=${encodeURIComponent(query)}` : ""}`
  );
  return response.data?.data || [];
};
