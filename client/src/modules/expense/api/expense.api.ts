import { api } from "@/core/api/client";

export const getExpenses = async () => {
  const res = await api.get("/expenses");
  return res.data.data;
};

export const createExpense = async (data: any) => {
  const res = await api.post("/expenses", data);
  return res.data.data;
};

export const updateExpense = async (id: number, data: any) => {
  const res = await api.put(`/expenses/${id}`, data);
  return res.data.data;
};

export const deleteExpense = async (id: number) => {
  const res = await api.delete(`/expenses/${id}`);
  return res.data.data;
};

export const getExpenseBySearch = async (term: any) => {
  const res = await api.post(`/expenses/search?term=${term}`);
  return res.data.data;
};
