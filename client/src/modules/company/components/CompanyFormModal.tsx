"use client";

import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateCompany, useUpdateCompany, useCompanies } from "../hooks/useCompany";
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
  isOwner: z.boolean(),
});

export default function CompanyFormModal({ open, onClose, data }: any) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name:  "",
      email:  "",
      address: "",
      phone:  "",
      isActive: true,
      isDeleted: false,
      isOwner: false,
    },
  });

  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  const { data: companies = [] } = useCompanies();
  const { mutate: createCompany } = useCreateCompany();
  const { mutate: updateCompany } = useUpdateCompany();

  const currentCompanyId = data?.companyid ?? data?.id;
  const existingOwner = companies.find((company: any) => company.isOwner);
  const existingOwnerCompanyId = existingOwner?.companyid ?? existingOwner?.id;
  const isOwnerDisabled = Boolean(
    existingOwner && existingOwnerCompanyId !== currentCompanyId
  );

  const onSubmit = (formData: any) => {
    if (data?.companyid) {
      updateCompany(
        { id: data.companyid, data: formData },
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
        <label htmlFor="company-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Company name</label>
        <input id="company-name" {...register("name")} placeholder="Enter company name" className="input" />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}

        <label htmlFor="company-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Email address</label>
        <input id="company-email" type="email" autoComplete="email" {...register("email")} placeholder="name@example.com" className="input" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message as string}</p>}

        <label htmlFor="company-address" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Address</label>
        <input id="company-address" {...register("address")} placeholder="Street, area and city" className="input" />
        {errors.address && <p className="text-red-500 text-xs">{errors.address.message as string}</p>}

        <label htmlFor="company-phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">Phone</label>
        <input id="company-phone" type="tel" autoComplete="tel" {...register("phone")} placeholder="03XX XXXXXXX" className="input" />
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
                {...register("isOwner")}
                className="checkbox"
                disabled={isOwnerDisabled}
                />
                <span>Owner</span>
          </label>
        </div>


        <div className="crud-form-actions flex justify-end gap-2 mt-4">
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