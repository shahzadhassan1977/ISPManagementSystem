"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useCompanies, useDeleteCompany } from "../hooks/useCompany";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";

type Company = {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
};

export default function CompanyTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error } = useCompanies();
  const { mutate: deleteCompany, isPending } = useDeleteCompany();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);

  console.log("viewData ---", viewData);

  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: "name",
      header: "Company Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "phone",
      header: "Phone",
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
              setSelectedId(row.original.id);
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

    deleteCompany(selectedId, {
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
            title="Company Details"
        >       
        {viewData && (
            <div className="grid grid-cols-2 gap-4">
                {/* NAME */}
                <div>
                    <p className="text-sm text-gray-500">Company Name</p>
                    <p className="font-semibold">{viewData.name}</p>
                </div>

                {/* EMAIL */}
                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{viewData.email}</p>
                </div>

                {/* ADDRESS */}
                <div className="col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-semibold">{viewData.address}</p>
                </div>

                {/* PHONE */}
                <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-semibold">{viewData.phone}</p>
                </div>

                {/* ID (optional) */}
                <div>
                    <p className="text-sm text-gray-500">Company ID</p>
                    <p className="font-semibold">{viewData.id}</p>
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