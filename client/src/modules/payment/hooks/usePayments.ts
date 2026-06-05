import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
  getPaymentBySearch,
} from "../api/payment.api";

export const usePayments = () =>
  useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

export const useCreatePayment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

export const useUpdatePayment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updatePayment(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

export const useDeletePayment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deletePayment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

export const usePaymentBySearch = (term: string) =>
  useQuery({
    queryKey: ["payments", term],
    queryFn: () => getPaymentBySearch(term),
  });
