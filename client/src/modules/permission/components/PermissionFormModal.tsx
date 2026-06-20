"use client";

import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePermission, useUpdatePermission } from "../hooks/usePermission";
import { toast } from "sonner";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(2, "min legnth > 2"), 
  isActive: z.boolean(),
  isDeleted: z.boolean(), 
});

export default function PermissionFormModal({ open, onClose, data }: any) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      isActive: true,
      isDeleted: false,
    },
  });

  useEffect(() => {
    if (!data) return;

    reset({
      ...data,
      isActive: data.isActive ?? true,
      isDeleted: data.isDeleted ?? false,
    });
  }, [data, reset]);

  const { mutate: createPermission } = useCreatePermission();
  const { mutate: updatePermission } = useUpdatePermission();

  const onSubmit = (formData: any) => {
    const permissionId = data?.permissionid ?? data?.id;

    console.log("data update per--", data);
    console.log("formData update per--", formData);
    if (permissionId) {
      updatePermission(
        { id: permissionId, data: formData },
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
      createPermission(formData, {
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
      title={data ? "Edit Permission" : "Add Permission"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <input {...register("name")} placeholder="Name" className="input" />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
        
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