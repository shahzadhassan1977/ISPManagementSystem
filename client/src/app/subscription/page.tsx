"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import SubscriptionTable from "@/modules/subscription/components/SubscriptionTable";
import SubscriptionFormModal from "@/modules/subscription/components/SubscriptinFormModal";

export default function SubscriptionPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Subscription Management"
      description="Manage ISP subscription details"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Subscription
        </button>
      }
    >
      <SubscriptionTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <SubscriptionFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}