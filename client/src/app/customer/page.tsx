"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import CustomerTable from "@/modules/customer/components/CustomerTable";
import CustomerFormModal from "@/modules/customer/components/CustomerFormModal";

export default function CustomerPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Customer Management"
      description="Manage ISP customer details"
      pagePermission="customer"
      actionPermission="add"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Customer
        </button>
      }
    >
      <CustomerTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <CustomerFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}