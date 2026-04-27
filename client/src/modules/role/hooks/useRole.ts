import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  createRolePermission,
} from "../api/role.api";

export const useRoles = () =>
  useQuery({
    queryKey: ["role"],
    queryFn: getRoles,
  });

export const useCreateRole = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["role"] });
    },
  });
};

export const useUpdateRole = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ roleid, data }: any) =>
      updateRole(roleid, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["role"] });
    },
  });
};

export const useDeleteRole = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["role"] });
    },
  });
};

export const useCreateRolePermission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createRolePermission,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["role"] });
    },
  });
};