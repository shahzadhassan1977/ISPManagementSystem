"use client";

import Modal from "@/components/ui/Modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useCreateSubarea,
  useUpdateSubarea,
} from "../hooks/useSubarea";
import { useArea } from "@/modules/area/hooks/useArea";
import { toast } from "sonner";
import { useEffect } from "react";
import Select from "react-select";

const schema = z.object({
  name: z.string().min(2, "min length > 2"),
  areaid: z.number({
    error: "Area is required",
  }),
});

export default function SubareaFormModal({ open, onClose, data }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      areaid: undefined,
    },
  });

  const { data: areas = [] } = useArea();

  const { mutateAsync: createSubarea } = useCreateSubarea();
  const { mutateAsync: updateSubarea } = useUpdateSubarea();

  // ✅ EDIT MODE FIX
  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        areaid: Number(data.areaid || data.area?.areaid || data.area?.id),
      });
    } else {
      reset({
        name: "",
        areaid: undefined,
      });
    }
  }, [data, areas, reset]);

  // ✅ DROPDOWN OPTIONS
  const options = areas.map((a: any) => ({
    value: Number(a.id || a.areaid),
    label: a.name,
  }));

  const onSubmit = async (formData: any) => {
    try {
      if (!formData.areaid) {
        throw new Error("Area is required");
      }

      if (data?.subareaid) {
        await updateSubarea({
          subareaid: data.subareaid,
          data: formData,
        });
      } else {
        await createSubarea(formData);
      }

      toast.success("Subarea saved successfully");
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || err.message || "Failed"
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={data ? "Edit Subarea" : "Add Subarea"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* NAME */}
        <div>
          <input
            {...register("name")}
            placeholder="Subarea Name"
            className="input"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* AREA DROPDOWN */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Area
          </label>

          <Controller
            name="areaid"
            control={control}
            render={({ field }) => (
              <Select
                options={options}
                value={
                  options.find((o: { value: number; }) => o.value === field.value) || null
                }
                onChange={(val: any) =>
                  field.onChange(val ? Number(val.value) : undefined)
                }
                className="text-black"
                placeholder="Select area..."
                isClearable
              />
            )}
          />

          {errors.areaid && (
            <p className="text-red-500 text-xs">
              {errors.areaid.message as string}
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="border px-3 py-1 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>

      </form>
    </Modal>
  );
}