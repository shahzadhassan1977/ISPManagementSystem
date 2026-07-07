import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseBySearch,
} from "../api/expense.api";

export const useExpenses = () =>
  useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

export const useCreateExpense = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useUpdateExpense = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateExpense(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useDeleteExpense = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

export const useExpenseBySearch = (term: string) =>
  useQuery({
    queryKey: ["expenses", term],
    queryFn: () => getExpenseBySearch(term),
  });
