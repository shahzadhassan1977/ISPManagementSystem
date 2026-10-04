"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import PermissionActionButtons from "@/components/ui/PermissionActionButtons";
import { ColumnDef } from "@tanstack/react-table";
import { useExpenses, useDeleteExpense } from "../hooks/useExpenses";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";

type Expense = {
  id: number;
  title: string;
  month: string;
  year: string;
  amount: number;
  expenseDate: Date;
  description: string;
  category: string;
  paymentMethod: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;    
  createdBy: number;
  updatedBy: number;
  branchId: number;
  vendorId: number;
  employeeId: number;
  invoiceNo: string;
  attachment: string;
  approvedBy: number;
  status: string;
};
const formatDate = (value: any) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-GB");
};

export default function ExpenseTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error, refetch } = useExpenses();
  const { mutate: deleteExpense, isPending } = useDeleteExpense();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);
  const pagePermission = "expense";
  
  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "expenseDate",
      header: "Expense Date",
      cell: ({ row }) => formatDate(row.original.expenseDate),
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "description",
      header: "Description",
    },    
    {
      accessorKey: "category",
      header: "Category",
    },
    {
        accessorKey: "paymentMethod",
        header: "Payment Method",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <PermissionActionButtons
          pagePermission={pagePermission}
          onView={() => {
              setViewData(row.original);
              setOpenView(true);
          }}
          onEdit={() => onEdit(row.original)}
          onDelete={() => {
            setSelectedId(row.original.id);
            setOpenConfirm(true);
          }}
        />
      ),
    },
  ];


  const handleDelete = () => {
    if (!selectedId) return;

    deleteExpense(selectedId as any, {
      onSuccess: () => {
        toast.success("Deleted successfully");
        setOpenConfirm(false);
        setSelectedId(null);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || error?.message || "Delete failed",
        );
      },
    });
  };
  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        loading={isLoading}
        error={isError ? error : undefined}
        onRetry={refetch}
      />

        <ViewModal
            open={openView}
            onClose={() => setOpenView(false)}
            title="Expense Details"
        >       
        {viewData && (
            <div className="grid grid-cols-3 gap-4">
                {/* Title */}
                <div>
                    <p className="text-sm text-gray-500">Title</p>
                    <p className="font-semibold">{viewData.title}</p>
                </div>

                {/* EXPENSEDATE */}
                <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold">{formatDate(viewData.expenseDate)}</p>
                </div>

                {/* AMOUNT */}
                <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-semibold">{viewData.amount}</p>
                </div>

                {/* DESCRIPTION */}
                <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="font-semibold">{viewData.description}</p>
                </div>

                {/* CATEGORY */}
                <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold">{viewData.category}</p>
                </div>

                {/* PAYMENT METHOD */}
                <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-semibold">{viewData.paymentMethod}</p>
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