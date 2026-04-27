"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import UserTable from "@/modules/user/components/UserTable";
import UserFormModal from "@/modules/user/components/UserFormModal";

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="User Management"
      description="Manage ISP user details"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add User
        </button>
      }
    >
      <UserTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <UserFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}