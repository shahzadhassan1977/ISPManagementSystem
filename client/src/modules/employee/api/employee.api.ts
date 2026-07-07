import { api } from "@/core/api/client";

export const getEmployees = async () => {
  const res = await api.get("/employee");
  return res.data.data;
};

export const createEmployee = async (data: any) => {
  const newData = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    mobile: data.mobile,
    designation: data.designation,
    isActive: data.isActive ?? true,
    isDeleted: data.isDeleted ?? false,
    companyId: data.companyId ?? data.companyid,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };

  const res = await api.post("/employee/create-employee", newData);
  return res.data.data;
};

export const updateEmployee = async (employeeid: number, data: any) => {
  const res = await api.put(`/employee/${employeeid}`, data);
  return res.data.data;
};

export const deleteEmployee = async (id: number) => {
  const res = await api.delete(`/employee/${id}`);
  return res.data.data;
};

export const createEmployeeSubarea = async (data: {
  employeeId: number;
  subareaIds: number[];
}) => {
  const res = await api.post("/employee/AssignSubarea", data);
  return res.data.data;
};

export const getEmployeeByEmail = async (email: any) => {
  const res = await api.post("/employee/EmployeeByEmail", { email });
  return res.data.data;
};

export const getEmployeeByCompany = async (company: any) => {
  const res = await api.post("/employee/EmployeeByCompany/" + company, {});
  return res.data.data;
};