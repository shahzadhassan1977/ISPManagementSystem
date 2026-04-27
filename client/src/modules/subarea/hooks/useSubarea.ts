import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubareas,
  createSubarea,
  updateSubarea,
  deleteSubarea,
} from "../api/subarea.api";

export const useSubareas = () =>
  useQuery({
    queryKey: ["subarea"],
    queryFn: getSubareas,
  });

export const useCreateSubarea = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSubarea,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subarea"] });
    },
  });
};

export const useUpdateSubarea = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ subareaid, data }: any) =>
      updateSubarea(subareaid, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subarea"] });
    },
  });
};

export const useDeleteSubarea = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteSubarea,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subarea"] });
    },
  });
};
