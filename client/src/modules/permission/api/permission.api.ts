import { api } from "@/core/api/client";

export const getPermissions = async () => {
  const res = await api.get("/permission");
  return res.data.data;
};

export const createPermission = async (data: any) => {
  const res = await api.post("/permission", data);
  return res.data.data;
};

export const updatePermission = async (id: number, data: any) => {
  const res = await api.put(`/permission/${id}`, data);
  return res.data.data;
};

export const deletePermission = async (id: number) => {
  const res = await api.delete('/permission/${id}');
  return res.data.data;
};