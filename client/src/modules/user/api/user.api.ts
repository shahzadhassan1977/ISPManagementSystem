import { api } from "@/core/api/client";

export const getUsers = async () => {
  const res = await api.get("/user");
  return res.data.data;
};

export const createUser = async (data: any) => {
  const res = await api.post("/user/create-user", data);
  return res.data.data;
};

export const updateUser = async (userid: number, data: any) => {
    const res = await api.put(`/user/${userid}`, data);
    return res.data.data;
};

export const deleteUser = async (id: number) => {
  const res = await api.delete(`/user/${id}`);
  return res.data.data;
};

export const createUserRole = async (data: {
  userId: number;
  roleIds: number[]; // 
}) => {   
    const res = await api.post("/user/AssignRole", data);
  return res.data.data;
};