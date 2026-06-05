import { api } from "@/core/api/client";

export const getPayments = async () => {
  const res = await api.get("/payments");
  return res.data.data;
};

export const createPayment = async (data: any) => {
  const res = await api.post("/payments", data);
  return res.data.data;
};

export const updatePayment = async (id: number, data: any) => {
  const res = await api.put(`/payments/${id}`, data);
  return res.data.data;
};

export const deletePayment = async (id: number) => {
  const res = await api.delete(`/payments/${id}`);
  return res.data.data;
};

export const getPaymentBySearch = async (term: any) => {
  const res = await api.post(`/payments/search?term=${term}`);
  return res.data.data;
};
