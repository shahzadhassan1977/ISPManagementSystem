"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import EmployeeTable from "@/modules/employee/components/EmployeeTable";
import EmployeeFormModal from "@/modules/employee/components/EmployeeFormModal";

export default function EmployeePage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Employee Management"
      description="Manage ISP employee details"
      pagePermission="employee"
      actionPermission="add"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Employee
        </button>
      }
    >
      <EmployeeTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <EmployeeFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}