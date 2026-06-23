"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import SubareaTable from "@/modules/subarea/components/SubareaTable";
import SubareaFormModal from "@/modules/subarea/components/SubareaFormModal";

export default function SubareaPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Subarea Management"
      description="Manage ISP subarea details"      pagePermission="subarea"
      actionPermission="add"      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Subarea
        </button>
      }
    >
      <SubareaTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <SubareaFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}