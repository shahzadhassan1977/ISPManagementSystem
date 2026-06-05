"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import PaymentTable from "@/modules/payment/components/PaymentTable";
import PaymentFormModal from "@/modules/payment/components/PaymentFormModal";

export default function PaymentPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Payment Management"
      description="Manage ISP payment details"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Payment
        </button>
      }
    >
      <PaymentTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <PaymentFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}