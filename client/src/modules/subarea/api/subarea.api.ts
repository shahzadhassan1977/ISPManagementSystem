import { api } from "@/core/api/client";
import { da } from "zod/locales";

export const getSubareas = async () => {
  const res = await api.get("/subarea");
  return res.data.data;
};

export const createSubarea = async (data: any) => {
  data.areaid = Number(data.areaid);
  data.name = data.name.trim();
  const payload = {
  "name": data.name,
  "areaId": data.areaid
};      
  const res = await api.post("/subarea", payload);
  return res.data.data;
};

export const updateSubarea = async (subareaid: number, data: any) => {
    const res = await api.put('/subarea/' + subareaid, data);
    return res.data.data;
};

export const deleteSubarea = async (id: number) => {
  const res = await api.delete('/subarea/' + id);
  return res.data.data;
};

