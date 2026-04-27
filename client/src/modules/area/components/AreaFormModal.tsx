"use client";

import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateArea, useUpdateArea } from "../hooks/useArea";
import { toast } from "sonner";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(2, "min legnth > 2"),  
});

export default function AreaFormModal({ open, onClose, data }: any) {

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

  const { mutate: createArea } = useCreateArea();
  const { mutate: updateArea } = useUpdateArea();

  const onSubmit = (formData: any) => {
    if (data?.areaid) {
        updateArea(
        { id: data.areaid, data: formData },
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
      createArea(formData, {
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
      title={data ? "Edit Area" : "Add Area"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        <input {...register("name")} placeholder="Name" className="input" />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
        
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