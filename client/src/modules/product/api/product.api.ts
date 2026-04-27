import { api } from "@/core/api/client";

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data.data;
};

export const createProduct = async (data: any) => {
  const res = await api.post("/products", data);
  return res.data.data;
};

export const updateProduct = async (productid: number, data: any) => {
  const res = await api.put(`/products/${productid}`, data);
  return res.data.data;
};

export const deleteProduct = async (productid: number) => {
  const res = await api.delete(`/products/${productid}`);
  return res.data.data;
};

export const getProductBySearch = async (term: any) => {
  const res = await api.post(`/products/search?term=${term}`);
  return res.data.data;
}

export const getProductDetails = async () => {
  const res = await api.get("/product-details");
  return res.data.data;
};

export const createProductDetails = async (data: any) => {
  const res = await api.post("/product-details", data);
  return res.data.data;
};

export const updateProductDetails = async (id: number, data: any) => {
  const res = await api.put(`/product-details/${id}`, data);
  return res.data.data;
};

export const deleteProductDetails = async (id: number) => {
  const res = await api.delete(`/product-details/${id}`);
  return res.data.data;
};

export const getProductDetailsByProduct = async (productid: number) => {
  const res = await api.post(`/product-details/by-product/${productid}`);
  return res.data.data;
};
