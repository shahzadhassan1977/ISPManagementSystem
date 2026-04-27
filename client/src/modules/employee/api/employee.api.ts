import { api } from "@/core/api/client";

export const getEmployees = async () => {
  const res = await api.get("/Employee");
  return res.data.data;
};

export const createEmployee = async (data: any) => {
  const newData = {
  "name": data.name,
  "phone": data.phone,
  "email": data.email,
  "mobile": data.mobile,
  "designation": data.designation,
  "isActive": true,
  "isDeleted": true,
  "companyId": data.companyid
  };

  const res = await api.post("/Employee/create-employee", newData);
  return res.data.data;
};

export const updateEmployee = async (employeeid: number, data: any) => {
    console.log("Updating employee with data:", data);
    const res = await api.put(`/Employee/${employeeid}`, data);
    return res.data.data;
};

export const deleteEmployee = async (id: number) => {
  const res = await api.delete(`/Employee/${id}`);
  return res.data.data;
};

export const createEmployeeSubarea = async (data: {
  employeeId: number;
  subareaIds: number[]; // 
}) => {   
    const res = await api.post("/employee/AssignSubarea", data);
  return res.data.data;
};

export const getEmployeeByEmail = async (email: any) => {
  const res = await api.post("/Employee/EmployeeByEmail", { email });
  return res.data.data;
};

export const getEmployeeByCompany = async (company: any) => {
  const res = await api.post("/employees/EmployeeByCompany/", { company });
  return res.data.data;
};