import { api } from "@/core/api/client";

export const getAreas = async () => {
  const res = await api.get("/area");
  return res.data.data;
};

export const createArea = async (data: any) => {
  const res = await api.post("/area", data);
  return res.data.data;
};

export const updateArea = async (id: number, data: any) => {
  const res = await api.put('/area/' + id, data);
  return res.data.data;
};

export const deleteArea = async (id: number) => {
  const res = await api.delete('/area/' + id);
  return res.data.data;
};