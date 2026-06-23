"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import CompanyTable from "@/modules/company/components/CompanyTable";
import CompanyFormModal from "@/modules/company/components/CompanyFormModal";

export default function CompanyPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Company Management"
      description="Manage ISP company details"
      pagePermission="company"
      actionPermission="add"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Company
        </button>
      }
    >
      <CompanyTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <CompanyFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}