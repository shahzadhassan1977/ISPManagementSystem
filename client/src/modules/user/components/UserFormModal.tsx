"use client";

import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, email, number, z } from "zod";
import {
  useCreateUser,
  useUpdateUser,
  useCreateUserRole,
} from "../hooks/useUser";
import { useRoles } from "@/modules/role/hooks/useRole";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Select from "react-select";
import { extractRoles } from "@/utils/user";
import { is } from "zod/locales";

const schema = z.object({
  name: z.string().min(2, "min length > 2"),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "min length > 6"),
  isActive: z.string().transform((val) => val === "true"), // 🔥 transform to boolean
  isDeleted: z.string().transform((val) => val === "true"), // 🔥 transform to boolean    
});

export default function UserFormModal({ open, onClose, data }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const { data: roles = [] } = useRoles();
  const [selectedRoles, setSelectedRoles] = useState<any[]>([]);

  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: assignRole } = useCreateUserRole();

 useEffect(() => {
  if (data) {
    reset(data);

    // 🔥 FIX: extract from nested API
    const perms = extractRoles(data);

    setSelectedRoles(perms);
  }
}, [data, reset]);

  // 🎯 convert roles for dropdown
  const options = roles.map((p: any) => ({
    value: p.roleid,
    label: p.name,
  }));

  const onSubmit = async (formData: any) => {
  try {
    let userId = data?.userid;

    // ✅ CREATE / UPDATE USER
    if (data?.userid) {
      await updateUser({
        userid: data.userid,
        data: formData,
      });
    } else {
      const res = await createUser(formData);

      console.log("CREATE RESPONSE", res);

      userId = res?.userid || res?.id; // ✅ FIX
    }

    // 🚨 SAFETY CHECK
    if (!userId) {
      throw new Error("User ID is missing");
    }

    // ✅ PREPARE ROLE IDS
    const roleIds = selectedRoles.map(
      (p) => p.value
    );

    // ✅ ASSIGN PERMISSIONS
    if (selectedRoles.length > 0) {

       await assignRole({
        userId: userId,           // ✅ correct key
        roleIds: roleIds, // ✅ correct key
      });
     
    }

    toast.success("User saved successfully");
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
      title={data ? "Edit User" : "Add User"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* USER NAME */}
        <div>
          <input
            {...register("name")}
            placeholder="User Name"
            className="input"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* USER EMAIL */}
        <div>
          <input
            {...register("email")}
            placeholder="User Email"
            className="input"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">
              {errors.email.message as string}
            </p>
          )}
        </div>

        {/* USER PASSWORD */}
        <div>
          <input
            {...register("password")}
            placeholder="User Password"
            className="input"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">
              {errors.password.message as string}
            </p>
          )}
        </div>
            
            {/* USER ACTIVE STATUS */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Is Active
          </label>
          <select
            {...register("isActive")}
            className="input"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* USER DELETED STATUS */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Is Deleted
          </label>
          <select
            {...register("isDeleted")}
            className="input"
          >
            <option value="true">Deleted</option>
            <option value="false">Not Deleted</option>
          </select>
        </div>

        {/* 🔥 MULTI SELECT ROLES */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Roles
          </label>

          <Select            
            isMulti
            options={options}
            value={selectedRoles}
            onChange={(val) => setSelectedRoles(val as any)}
            className="text-black"
            placeholder="Select roles..."
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="border px-3 py-1 rounded"
          >
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