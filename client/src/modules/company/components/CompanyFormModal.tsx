"use client";

import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateCompany, useUpdateCompany } from "../hooks/useCompany";
import { toast } from "sonner";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(2, "min legnth > 2"),
  email: z.email("Please enter correct email address"),
  address: z.string().min(2, "min legnth > 2"),
  phone: z.string().min(11, "min legnth = 11").max(11, "max legnth = 11"),
  // ✅ FIX HERE
  isActive: z.boolean(),
  isDeleted: z.boolean(),
});

export default function CompanyFormModal({ open, onClose, data }: any) {

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

  const { mutate: createCompany } = useCreateCompany();
  const { mutate: updateCompany } = useUpdateCompany();

  const onSubmit = (formData: any) => {    
    if (data?.id) {
      updateCompany(
        { id: data.id, data: formData },
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
      createCompany(formData, {
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
      title={data ? "Edit Company" : "Add Company"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <input {...register("name")} placeholder="Name" className="input" />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}

        <input {...register("email")} placeholder="Email" className="input" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message as string}</p>}

        <input {...register("address")} placeholder="Address" className="input" />
        {errors.address && <p className="text-red-500 text-xs">{errors.address.message as string}</p>}

        <input {...register("phone")} placeholder="Phone" className="input" />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message as string}</p>}

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