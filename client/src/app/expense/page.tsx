"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import ExpenseTable from "@/modules/expense/components/ExpenseTable";
import ExpenseFormModal from "@/modules/expense/components/ExpenseFormModal";

export default function ExpensePage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Expense Management"
      description="Manage ISP expense details"
      pagePermission="expense"
      actionPermission="add"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Expense
        </button>
      }
    >
      <ExpenseTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <ExpenseFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}