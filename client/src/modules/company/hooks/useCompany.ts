import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../api/company.api";

export const useCompanies = () =>
  useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

export const useCreateCompany = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

export const useUpdateCompany = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateCompany(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

export const useDeleteCompany = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};