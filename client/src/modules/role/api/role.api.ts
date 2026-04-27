import { api } from "@/core/api/client";

export const getRoles = async () => {
  const res = await api.get("/role");
  return res.data.data;
};

export const createRole = async (data: any) => {
  const res = await api.post("/role", data);
  return res.data.data;
};

export const updateRole = async (roleid: number, data: any) => {
    const res = await api.put(`/role/${roleid}`, data);
    return res.data.data;
};

export const deleteRole = async (id: number) => {
  const res = await api.delete(`/role/${id}`);
  return res.data.data;
};

export const createRolePermission = async (data: {
  roleId: number;
  permissionIds: number[]; // 
}) => {   
    console.log("data --- ", data); 
  const res = await api.post("/role/AssignPermission", data);
  return res.data.data;
};