"use client";

import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct, useUpdateProduct } from "../hooks/useProducts";
import { toast } from "sonner";
import { useEffect } from "react";
import { is } from "zod/locales";

const schema = z.object({
  name: z.string().min(2, "min legnth > 2"),
  salePrice: z.float64().min(1, "Sale Price is required"),
  purchasePrice: z.float64().min(1, "Purchase Price is required"),  
  // ✅ FIX HERE
  isActive: z.boolean(),
  isDeleted: z.boolean(),
});

export default function ProductFormModal({ open, onClose, data }: any) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const onSubmit = (formData: any) => {
    console.log("formData ---", formData);
    if (data?.productid) {
      updateProduct(
        { productid: data.productid, data: formData },
        {
          onSuccess: () => {
            toast.success("Updated");
            onClose();
          },
          onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Update failed"
            );
          },          
        }
      );
    } else {
      createProduct(formData, {
        onSuccess: () => {
          toast.success("Created");
          onClose();
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        },
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={data ? "Edit Product" : "Add Product"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <input {...register("name")} placeholder="Name" className="input" />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
        <input {...register("salePrice")} placeholder="Sale Price" className="input" />
        {errors.salePrice && <p className="text-red-500 text-xs">{errors.salePrice.message as string}</p>}
        <input {...register("purchasePrice")} placeholder="Purchase Price" className="input" />
        {errors.purchasePrice && <p className="text-red-500 text-xs">{errors.purchasePrice.message as string}</p>}
        
        {/* ACTIVE & DELETED TOGGLES */}
        <div className="flex items-center gap-4">
            <label className="flex items-center gap-1">
                <input
                type="checkbox"
                {...register("isActive")}
                className="checkbox"
                />
                <span>Active</span>
            </label>

            <label className="flex items-center gap-1">
                <input
                type="checkbox"
                {...register("isDeleted")}
                className="checkbox"
                />
                <span>Deleted</span>
          </label>
        </div>


        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="border px-3 py-1 rounded">
            Cancel
          </button>

          <button className="bg-blue-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </div>

      </form>
    </Modal>
  );
}