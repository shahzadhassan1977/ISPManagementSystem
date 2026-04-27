import { api } from "@/core/api/client";

export const getCompanies = async () => {
  const res = await api.get("/companies");
  return res.data.data;
};

export const createCompany = async (data: any) => {
  const res = await api.post("/companies", data);
  return res.data.data;
};

export const updateCompany = async (id: number, data: any) => {
  const res = await api.put(`/companies/${id}`, data);
  return res.data.data;
};

export const deleteCompany = async (id: number) => {
  const res = await api.delete(`/companies/${id}`);
  return res.data.data;
};