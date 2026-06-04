import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../api/subscription.api";

export const useSubscriptions = () =>
  useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
  });

export const useCreateSubscription = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

export const useUpdateSubscription = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateSubscription(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};

export const useDeleteSubscription = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subscriptions"] });
    },
  });
};