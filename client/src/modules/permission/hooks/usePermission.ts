import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from "../api/permission.api";

export const usePermission = () =>
  useQuery({
    queryKey: ["permission"],
    queryFn: getPermissions,
  });

export const useCreatePermission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createPermission,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["permission"] });
    },
  });
};

export const useUpdatePermission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updatePermission(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["permission"] });
    },
  });
};

export const useDeletePermission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deletePermission,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["permission"] });
    },
  });
};