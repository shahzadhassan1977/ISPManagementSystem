import { api } from "@/core/api/client";

export const getCustomers = async () => {
  const res = await api.get("/customers");
  return res.data.data;
};

export const createCustomer = async (data: any) => {
  const res = await api.post("/customers", data);
  return res.data.data;
};

export const updateCustomer = async (customerid: number, data: any) => {
  const res = await api.put(`/customers/${customerid}`, data);
  return res.data.data;
};

export const deleteCustomer = async (customerid: number) => {
  const res = await api.delete(`/customers/${customerid}`);
  return res.data.data;
};

export const getCustomerBySearch = async (term: any) => {
  const res = await api.post(`/customers/search?term=${term}`);
  return res.data.data;
}