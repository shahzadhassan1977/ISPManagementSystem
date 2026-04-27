import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerBySearch,
} from "../api/customer.api";

export const useCustomers = () =>
  useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

export const useCreateCustomer = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useUpdateCustomer = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ customerid, data }: any) => updateCustomer(customerid, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useDeleteCustomer = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useCustomerBySearch = (term: string) =>
  useQuery({
    queryKey: ["customers", term],
    queryFn: () => getCustomerBySearch(term),
  });