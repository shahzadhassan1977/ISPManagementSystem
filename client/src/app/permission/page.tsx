"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import PermissionTable from "@/modules/permission/components/PermissionTable";
import PermissionFormModal from "@/modules/permission/components/PermissionFormModal";

export default function PermissionPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Permission Management"
      description="Manage ISP permission details"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Permission
        </button>
      }
    >
      <PermissionTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <PermissionFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}