"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useCustomers, useDeleteCustomer } from "../hooks/useCustomers";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";

type Customer = {
  customerid: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  cnic: string;
  mobile: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function CustomerTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error } = useCustomers();
  const { mutate: deleteCustomer, isPending } = useDeleteCustomer();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);

  //console.log("viewData ---", viewData);

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: "Customer Name",
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
      accessorKey: "cnic",
      header: "CNIC",
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
    },
    {
        accessorKey: "isActive",
        header: "Is Active",
        cell: ({ row }) => (row.original.isActive ? "Yes" : "No"),
    },
    {
        accessorKey: "isDeleted",
        header: "Is Deleted",
        cell: ({ row }) => (row.original.isDeleted ? "Yes" : "No"),
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
              setSelectedId(row.original.customerid);
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

    deleteCustomer(selectedId, {
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
            title="Customer Details"
        >       
        {viewData && (
            <div className="grid grid-cols-2 gap-4">
                {/* NAME */}
                <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
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
                
                {/* CNIC */}
                <div>
                    <p className="text-sm text-gray-500">CNIC</p>
                    <p className="font-semibold">{viewData.cnic}</p>
                </div>

                {/* MOBILE */}
                <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-semibold">{viewData.mobile}</p>
                </div>

                {/* ID (optional) */}
                <div>
                    <p className="text-sm text-gray-500">Customer ID</p>
                    <p className="font-semibold">{viewData.customerid}</p>
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