"use client";

import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateCustomer, useUpdateCustomer } from "../hooks/useCustomers";
import { toast } from "sonner";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(2, "min legnth > 2"),
  email: z.string(),
  address: z.string().min(2, "min legnth > 2"),
  phone: z.string(),
  cnic: z.string(),
  mobile: z.string(),
  isActive: z.boolean(),
});

type CustomerFormData = z.infer<typeof schema>;
type CustomerRecord = Partial<CustomerFormData> & { customerid?: number; isDeleted?: boolean };
type ApiError = { response?: { data?: { message?: string } } };

export default function CustomerFormModal({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data?: CustomerRecord | null;
}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerFormData>({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const { mutate: createCustomer } = useCreateCustomer();
  const { mutate: updateCustomer } = useUpdateCustomer();

  const onSubmit = (formData: CustomerFormData) => {
    const customerPayload = {
      ...formData,
      isDeleted: data?.isDeleted ?? false,
    };

    if (data?.customerid) {
      updateCustomer(
        { customerid: data.customerid, data: customerPayload },
        {
          onSuccess: () => {
            toast.success("Updated");
            onClose();
          },
          onError: (error: unknown) => {
            toast.error((error as ApiError)?.response?.data?.message || "Update failed");
          },          
        }
      );
    } else {
      createCustomer(customerPayload, {
        onSuccess: () => {
          toast.success("Created");
          onClose();
        },
        onError: (error: unknown) => {
          toast.error((error as ApiError)?.response?.data?.message || "Something went wrong");
        },
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={data ? "Edit Customer" : "Add Customer"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Full name</span>
            <input {...register("name")} placeholder="Enter customer name" className="input" />
            {errors.name && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{errors.name.message as string}</span>}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Email address</span>
            <input type="email" autoComplete="email" {...register("email")} placeholder="name@example.com" className="input" />
            {errors.email && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{errors.email.message as string}</span>}
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Service address</span>
            <input {...register("address")} placeholder="Street, area and city" className="input" />
            {errors.address && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{errors.address.message as string}</span>}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Phone</span>
            <input type="tel" autoComplete="tel" {...register("phone")} placeholder="03XX XXXXXXX" className="input" />
            {errors.phone && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{errors.phone.message as string}</span>}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Mobile</span>
            <input type="tel" {...register("mobile")} placeholder="03XX XXXXXXX" className="input" />
            {errors.mobile && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{errors.mobile.message as string}</span>}
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">CNIC</span>
            <input {...register("cnic")} placeholder="XXXXX-XXXXXXX-X" className="input" />
            {errors.cnic && <span className="mt-1 block text-xs text-red-600 dark:text-red-400">{errors.cnic.message as string}</span>}
          </label>
        </div>

        <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
          <label className="flex min-h-9 cursor-pointer items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
            <input type="checkbox" {...register("isActive")} className="checkbox h-4 w-4 accent-[#2468bd]" />
            <span>Account active</span>
          </label>
        </div>

        <div className="crud-form-actions flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
          <button type="button" onClick={onClose} className="min-h-10 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
            Cancel
          </button>
          <button type="submit" className="min-h-10 rounded-md bg-[#142e5c] px-4 text-sm font-semibold text-white transition hover:bg-[#1d447d] dark:bg-blue-700 dark:hover:bg-blue-600">
            Save customer
          </button>
        </div>
      </form>
    </Modal>
  );
}