"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import AreaTable from "@/modules/area/components/AreaTable";
import AreaFormModal from "@/modules/area/components/AreaFormModal";

export default function AreaPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Area Management"
      description="Manage ISP area details"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Area
        </button>
      }
    >
      <AreaTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <AreaFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}