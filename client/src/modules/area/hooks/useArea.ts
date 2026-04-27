import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAreas,
  createArea,
  updateArea,
  deleteArea,
} from "../api/area.api";

export const useArea = () =>
  useQuery({
    queryKey: ["area"],
    queryFn: getAreas,
  });

export const useCreateArea = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createArea,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["area"] });
    },
  });
};

export const useUpdateArea = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateArea(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["area"] });
    },
  });
};

export const useDeleteArea = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteArea,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["area"] });
    },
  });
};