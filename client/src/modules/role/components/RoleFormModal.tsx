"use client";

import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, number, z } from "zod";
import {
  useCreateRole,
  useUpdateRole,
  useCreateRolePermission,
} from "../hooks/useRole";
import { usePermission } from "@/modules/permission/hooks/usePermission";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Select from "react-select";
import { extractPermissions } from "@/utils/role";

const schema = z.object({
  name: z.string().min(2, "min length > 2")  
});

export default function RoleFormModal({ open, onClose, data }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const { data: permissions = [] } = usePermission();
  const [selectedPermissions, setSelectedPermissions] = useState<any[]>([]);

  const { mutateAsync: createRole } = useCreateRole();
  const { mutateAsync: updateRole } = useUpdateRole();
  const { mutateAsync: assignPermission } = useCreateRolePermission();

 useEffect(() => {
  if (data) {
    reset(data);

    // 🔥 FIX: extract from nested API
    const perms = extractPermissions(data);

    setSelectedPermissions(perms);
  }
}, [data, reset]);

  // 🎯 convert permissions for dropdown
  const options = permissions.map((p: any) => ({
    value: p.permissionid,
    label: p.name,
  }));

  const onSubmit = async (formData: any) => {
  try {
    console.log("createrole data ----",data);
    console.log("createrole formdata ----",formData);
    let roleId = data?.roleid;

    // ✅ CREATE / UPDATE ROLE
    if (data?.roleid) {
      await updateRole({
        roleid: data.roleid,
        data: formData,
      });
    } else {
      const res = await createRole(formData);

      console.log("CREATE RESPONSE", res);

      roleId = res?.roleid || res?.id; // ✅ FIX
    }

    // 🚨 SAFETY CHECK
    if (!roleId) {
      throw new Error("Role ID is missing");
    }

    // ✅ PREPARE PERMISSION IDS
    const permissionIds = selectedPermissions.map(
      (p) => p.value
    );

    // ✅ ASSIGN PERMISSIONS
    if (selectedPermissions.length > 0) {

       await assignPermission({
        roleId: roleId,           // ✅ correct key
        permissionIds: permissionIds, // ✅ correct key
      });
     
    }

    toast.success("Role saved successfully");
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
      title={data ? "Edit Role" : "Add Role"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* ROLE NAME */}
        <div>
          <input
            {...register("name")}
            placeholder="Role Name"
            className="input"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* 🔥 MULTI SELECT PERMISSIONS */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Permissions
          </label>

          <Select            
            isMulti
            options={options}
            value={selectedPermissions}
            onChange={(val) => setSelectedPermissions(val as any)}
            className="text-black"
            placeholder="Select permissions..."
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