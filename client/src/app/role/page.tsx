"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import RoleTable from "@/modules/role/components/RoleTable";
import RoleFormModal from "@/modules/role/components/RoleFormModal";

export default function RolePage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Role Management"
      description="Manage ISP role details"
      pagePermission="role"
      actionPermission="add"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Role
        </button>
      }
    >
      <RoleTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <RoleFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}