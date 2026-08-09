"use client";

import { Eye, Edit3, Trash2 } from "lucide-react";
import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
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
  const { data = [], isLoading } = useExpenses();
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setViewData(row.original);
              setOpenView(true);
            }}
            className="text-blue-500 hover:text-blue-700"
            aria-label="View"
            title="View"
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </button>

          <button
            onClick={() => onEdit(row.original)}
            className="text-green-500 hover:text-green-700"
            aria-label="Edit"
            title="Edit"
          >
            <Edit3 className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </button>

          <button
            onClick={() => {
              setSelectedId(row.original.id);
              setOpenConfirm(true);
            }}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </button>
        </div>
      ),
    },
  ];


  const handleDelete = () => {
    if (!selectedId) return;

    deleteExpense(selectedId as any, {
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