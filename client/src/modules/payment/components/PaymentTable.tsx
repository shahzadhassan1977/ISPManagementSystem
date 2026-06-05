"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { usePayments, useDeletePayment } from "../hooks/usePayments";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";

type Payment = {
  id: number;
  amount: number;
  otherAmount: number;
  invoiceNumber: string;
  comments: string;
  billingMonth: string;
  billingYear: string;
  status: string;
  customerId: number;
  subscriptionId: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export default function PaymentTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error } = usePayments();
  const { mutate: deletePayment, isPending } = useDeletePayment();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);
  
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "customer.name",
      header: "Customer Name",
    },
    {
      accessorKey: "invoiceNumber",
      header: "Invoice Number",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "otherAmount",
      header: "Other Amount",
    },    
    {
      accessorKey: "status",
      header: "status",
    },
    {
        accessorKey: "isActive",
        header: "Is Active",
        cell: ({ row }) => (row.original.isActive ? "Yes" : "No"),
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

    deletePayment(selectedId, {
      onSuccess: () => {
        toast.success("Deleted successfully");
        setOpenConfirm(false);
      },
    });
  };
console.log("table data ----", data);
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
            title="Payment Details"
        >       
        {viewData && (
            <div className="grid grid-cols-3 gap-4">
                {/* INVOICE NUMBER */}
                <div>
                    <p className="text-sm text-gray-500">Invoice Number</p>
                    <p className="font-semibold">{viewData.invoiceNumber}</p>
                </div>

                {/* STATUS */}
                <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold">{viewData.status}</p>
                </div>

                {/* CUSTOMER ID */}
                <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-semibold">{viewData.customer.name}</p>
                </div>

                {/* SUBSCRIPTION ID */}
                <div>
                    <p className="text-sm text-gray-500">Subscription</p>
                    <p className="font-semibold">{viewData.subscription.product.name}</p>
                </div>

                {/* AMOUNT */}
                <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-semibold">{viewData.amount}</p>
                </div>

                {/* OTHER AMOUNT */}
                <div>
                    <p className="text-sm text-gray-500">Other Amount</p>
                    <p className="font-semibold">{viewData.otherAmount}</p>
                </div>
                
                {/* BILLING MONTH */}
                <div>
                    <p className="text-sm text-gray-500">Billing Month</p>
                    <p className="font-semibold">{viewData.billingMonth}</p>
                </div>

                {/* BILLING YEAR */}
                <div>
                    <p className="text-sm text-gray-500">Billing Year</p>
                    <p className="font-semibold">{viewData.billingYear}</p>
                </div>

                {/* COMMENTS */}
                <div>
                    <p className="text-sm text-gray-500">Comments</p>
                    <p className="font-semibold">{viewData.comments}</p>
                </div>
                
                {/* IS ACTIVE */}
                <div>
                    <p className="text-sm text-gray-500">Is Active</p>
                    <p className="font-semibold">{viewData.isActive ? "Yes" : "No"}</p>
                </div>

                {/* ID */}
                <div>
                    <p className="text-sm text-gray-500">ID</p>
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