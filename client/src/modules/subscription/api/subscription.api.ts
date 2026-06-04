import { api } from "@/core/api/client";

export const getSubscriptions = async () => {
  console.log("Fetching subscriptions..."); // Debug log
  const res = await api.get(`/subscriptions`);
  const data = res.data.data;
  console.log("Fetched subscriptions data:", data); // Debug log
  return res.data.data;
};

export const getSubscriptionsbyCustomerId = async (customerId : any) => {
  const res = await api.get(`/subscriptions/{customerId}?customerId=${customerId }`);
  return res.data.data;
};

export const createSubscription = async (data: any) => {
  console.log("Creating subscription with data:", data); // Debug log
  const res = await api.post("/subscriptions", data);
  return res.data.data;
};

export const updateSubscription = async (id: number, data: any) => {
  console.log(`Updating subscription ${id} with data:`, data); // Debug log
  const res = await api.put(`/subscriptions/${id}`, data);
  return res.data.data;
};

export const deleteSubscription = async (id: number) => {
  const res = await api.delete(`/subscriptions/${id}`);
  return res.data.data;
};