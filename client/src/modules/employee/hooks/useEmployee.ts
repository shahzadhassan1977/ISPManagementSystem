import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  createEmployeeSubarea,
  getEmployeeByEmail,
  getEmployeeByCompany,
} from "../api/employee.api";

export const useEmployees = () =>
  useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

    


export const useCreateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
};

export const useUpdateEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ employeeid, data }: any) => updateEmployee(employeeid, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });
};


export const useDeleteEmployee = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["employees"] }),
  });  
};

export const useCreateEmployeeSubarea = () => {
    const qc = useQueryClient();
  
    return useMutation({
      mutationFn: createEmployeeSubarea,
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["employees"] });
      },
    });
};

export const useEmployeesByEmail = (email: string) =>
  useQuery({
    queryKey: ["employees", email],
    queryFn: () => getEmployeeByEmail(email),
  });

export const useEmployeesByCompany = (company: string) =>
  useQuery({
    queryKey: ["employees", company],
    queryFn: () => getEmployeeByCompany(company),
  });