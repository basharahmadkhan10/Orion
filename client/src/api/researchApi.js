import { apiClient } from "./apiClient";

export const runResearch = async (ticker, companyName = "") => {
  const response = await apiClient.post("/research/run", {
    ticker,
    companyName,
  });
  return response.data?.data;
};

export const getResearchHistory = async () => {
  const response = await apiClient.get("/research/history");
  return response.data?.data || [];
};

export const getResearchRunById = async (id) => {
  const response = await apiClient.get(`/research/${id}`);
  return response.data?.data;
};

// Research API v1
