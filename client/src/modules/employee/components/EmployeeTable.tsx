"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";
import { extractRoles } from "@/utils/user";
import { useDeleteEmployee, useEmployees } from "../hooks/useEmployee";
import { extractSubareas } from "@/utils/subarea";


type Employee = {
  employeeid: number;
  name: string;
  email: string;
  phone: string;
  mobile: string;
  isactive: boolean;
  isdeleted: boolean;
  companyid: number;  
};

export default function EmployeeTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error } = useEmployees();
  const { mutate: deleteEmployee, isPending } = useDeleteEmployee();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);

  

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => (row.original.isactive ? "Yes" : "No"),
    },    
    {
      accessorKey: "company.name",
      header: "Company",
    },    
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="space-x-2">
          <button onClick={() => {            
          setViewData(row.original);
          setOpenView(true);
          }}
          className="text-blue-500">View</button>

          <button
            onClick={() => onEdit(row.original)}
            className="text-green-500"
          >
            Edit
          </button>

          <button
            onClick={() => {
              setSelectedId(row.original.employeeid);
              setOpenConfirm(true);
            }}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];


  const handleDelete = () => {
    if (!selectedId) return;

    deleteEmployee(selectedId, {
      onSuccess: () => {
        toast.success("Deleted successfully");
        setOpenConfirm(false);
      },
    });
  };

  
  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        loading={isLoading}
      />

        <ViewModal
            open={openView}
            onClose={() => setOpenView(false)}
            title="Employee Details"
            >
            {viewData && (
                <div className="grid grid-cols-3 gap-4">

                {/* EMPLOYEE INFO */}
                <div>
                    <p className="text-sm text-gray-500">Employee Name</p>
                    <p className="font-semibold">{viewData.name}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Employee Email</p>
                    <p className="font-semibold">{viewData.email}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Employee Phone</p>
                    <p className="font-semibold">{viewData.phone}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Employee Mobile</p>
                    <p className="font-semibold">{viewData.mobile}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Is Active</p>
                    <p className="font-semibold">{viewData.isActive ? "Yes" : "No"}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Is Deleted</p>
                    <p className="font-semibold">{viewData.isDeleted ? "Yes" : "No"}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Employee Id</p>
                    <p className="font-semibold">{viewData.employeeid}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="font-semibold">{viewData.company?.name || "N/A"}</p>
                </div>              

                {/* SUBAREAS */}
                <div className="col-span-3">
                    <p className="text-sm text-gray-500 mb-2">Subareas</p>

                    <div className="flex flex-wrap gap-2">
                    {viewData?.employeeSubAreas?.map((subarea: any) => (
                        <span
                            key={subarea.subarea?.subareaid}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                            { subarea.subarea?.area?.name + " - " + subarea.subarea?.name }
                            
                        </span>
                        ))
                    //   (
                    //     <p className="text-gray-400 text-sm">No subareas</p>
                    // )
                    }
                    </div>
                </div>

                </div>
            )}
            </ViewModal>
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
        loading={isPending}
      />
    </>
  );
}