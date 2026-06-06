"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { usePayments, useDeletePayment } from "../hooks/usePayments";
import { useCompanies } from "@/modules/company/hooks/useCompany";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";
import jsPDF from "jspdf";

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
  const { data: companies = [] } = useCompanies();

  const getOwnerCompany = () =>
    companies.find((company: any) => company.isOwner) ?? companies[0] ?? null;

  const downloadInvoicePdf = (payment: any) => {
    const ownerCompany = getOwnerCompany();
    const companyName = ownerCompany?.name ?? "Company Name";
    const companyAddress = ownerCompany?.address ?? "Company Address";
    const companyPhone = ownerCompany?.phone ?? "Company Phone";
    const status = payment.status ?? "";
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(companyName, 20, 25);
    doc.setFontSize(10);
    doc.text(companyAddress, 20, 33);
    doc.text(`Phone: ${companyPhone}`, 20, 40);

    const statusLabel = status.toString();
    const ribbonWidth = doc.getTextWidth(statusLabel) + 12;
    const ribbonX = 180 - ribbonWidth;
    const ribbonY = 15;

    doc.setFillColor(220, 38, 38);
    doc.rect(ribbonX, ribbonY, ribbonWidth, 12, "F");
    doc.setTextColor("#ffffff");
    doc.setFontSize(10);
    doc.text(statusLabel, ribbonX + 6, ribbonY + 8);
    doc.setTextColor("#000000");

    doc.setFontSize(14);
    doc.text("Invoice", 20, 55);
    doc.setFontSize(11);
    doc.text(`Invoice Number: ${payment.invoiceNumber || "N/A"}`, 20, 68);
    doc.text(`Billing Month: ${payment.billingMonth || "N/A"}`, 20, 76);
    doc.text(`Billing Year: ${payment.billingYear || "N/A"}`, 20, 84);
    doc.text(`Customer Name: ${payment.customer?.name || "N/A"}`, 20, 92);
    doc.text(`Subscription: ${payment.subscription?.product?.name || "N/A"}`, 20, 100);
    doc.text(`Amount: ${payment.amount ?? "0"}`, 20, 108);
    doc.text(`Other Amount: ${payment.otherAmount ?? "0"}`, 20, 116);
    doc.text(`Comments: ${payment.comments || "-"}`, 20, 124);

    doc.save(`invoice-${payment.invoiceNumber ?? payment.id}.pdf`);
  };

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
          <button
            onClick={() => {
              setViewData(row.original);
              setOpenView(true);
            }}
            className="text-blue-500"
          >
            View
          </button>

          <button
            onClick={() => onEdit(row.original)}
            className="text-green-500"
          >
            Edit
          </button>

          <button
            onClick={() => downloadInvoicePdf(row.original)}
            className="text-purple-500"
          >
            Invoice
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