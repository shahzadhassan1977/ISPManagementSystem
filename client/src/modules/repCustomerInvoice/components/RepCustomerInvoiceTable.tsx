"use client";

import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useCustomers } from "../../customer/hooks/useCustomers";
import { usePayments } from "../../payment/hooks/usePayments";
import { useCompanies } from "@/modules/company/hooks/useCompany";
import { useMemo, useState } from "react";
import jsPDF from "jspdf";

type PaymentRow = {
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
  customer: {
    customerid: number;
    name: string;
    phone: string;
    address: string;
  };
  subscription: {
    subscriptionid: number;
    product: {
      name: string;
    };
  };
};

const monthOptions = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const yearOptions = (() => {
  const currentYear = new Date().getFullYear();
  const years = [] as number[];

  for (let year = currentYear - 5; year <= currentYear + 2; year += 1) {
    years.push(year);
  }

  return years;
})();

export default function RepCustomerInvoiceTable() {
  const { data: customers = [] } = useCustomers();
  const { data: payments = [], isLoading } = usePayments();
  const { data: companies = [] } = useCompanies();

  const [customerId, setCustomerId] = useState<number | "">("");
  const [billingMonth, setBillingMonth] = useState<string>("");
  const [billingYear, setBillingYear] = useState<string>("");
  const [filteredPayments, setFilteredPayments] = useState<PaymentRow[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const ownerCompany = useMemo(
    () => companies.find((company: any) => company.isOwner) ?? companies[0] ?? null,
    [companies]
  );

  const handleSearch = () => {
    const filtered = payments.filter((payment: any) => {
      const customerMatch = customerId === "" || payment.customerId === customerId;
      const monthMatch = billingMonth === "" || payment.billingMonth === billingMonth;
      const yearMatch = billingYear === "" || payment.billingYear === billingYear;
      return customerMatch && monthMatch && yearMatch;
    });

    setFilteredPayments(filtered);
    setHasSearched(true);
  };

  const downloadInvoicePdf = (payment: PaymentRow) => {
    const companyName = ownerCompany?.name ?? "Company Name";
    const companyAddress = ownerCompany?.address ?? "Company Address";
    const companyPhone = ownerCompany?.phone ?? "Company Phone";
    const status = payment.status ?? "";
    const invoiceDate = new Date();
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + 15);

    const formatDate = (date: Date) =>
      date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });

    const doc = new jsPDF({ unit: "pt", format: "a4" });

    doc.setFillColor(35, 93, 212);
    doc.rect(0, 0, 595, 110, "F");

    doc.setFontSize(34);
    doc.setTextColor("#ffffff");
    doc.text("INVOICE", 40, 66);

    doc.setFontSize(10);
    doc.text(`INVOICE #`, 430, 35);
    doc.text(payment.invoiceNumber || "N/A", 520, 35, { align: "right" });
    doc.text(`INVOICE DATE`, 430, 52);
    doc.text(formatDate(invoiceDate), 520, 52, { align: "right" });
    doc.text(`P.O.#`, 430, 69);
    doc.text(`PO-${payment.id}`, 520, 69, { align: "right" });
    doc.text(`DUE DATE`, 430, 86);
    doc.text(formatDate(dueDate), 520, 86, { align: "right" });

    doc.setTextColor("#000000");
    doc.setFontSize(12);
    doc.text(companyName, 40, 140);
    doc.setFontSize(10);
    doc.text(companyAddress, 40, 158);
    doc.text(`Phone: ${companyPhone}`, 40, 176);

    doc.setFontSize(10);
    doc.text("BILL TO", 250, 140);
    doc.setFontSize(12);
    doc.text(payment.customer?.name || "Customer Name", 250, 158);
    doc.setFontSize(10);
    doc.text(payment.customer?.address || "Customer Address", 250, 176);
    doc.text(payment.customer?.phone || "Customer Phone", 250, 194);

    doc.setFillColor(220, 38, 38);
    doc.rect(420, 128, 130, 24, "F");
    doc.setTextColor("#ffffff");
    doc.setFontSize(10);
    doc.text(status.toUpperCase(), 485, 145, { align: "center" });

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(40, 200, 555, 200);

    const tableY = 225;
    doc.setFontSize(10);
    doc.setTextColor("#235dc0");
    doc.text("DESCRIPTION", 40, tableY);
    doc.text("UNIT PRICE", 300, tableY);
    doc.text("QTY", 420, tableY);
    doc.text("AMOUNT", 520, tableY, { align: "right" });

    doc.setTextColor("#000000");

    const description = payment.subscription?.product?.name || "Subscription";
    const amountText = payment.amount?.toFixed(2) ?? "0.00";
    const subtotal = (payment.amount ?? 0) + (payment.otherAmount ?? 0);

    doc.text(description, 40, tableY + 25);
    doc.text(amountText, 300, tableY + 25);
    doc.text("1", 420, tableY + 25);
    doc.text(subtotal.toFixed(2), 520, tableY + 25, { align: "right" });

    doc.line(40, tableY + 35, 555, tableY + 35);

    doc.setTextColor("#235dc0");
    doc.text("SUBTOTAL", 400, tableY + 70);
    doc.text(subtotal.toFixed(2), 520, tableY + 70, { align: "right" });
    doc.text("TOTAL", 400, tableY + 90);
    doc.setFontSize(18);
    doc.text(`$${subtotal.toFixed(2)}`, 520, tableY + 90, { align: "right" });

    doc.setFontSize(10);
    doc.setTextColor("#444444");
    doc.text("Comments:", 40, tableY + 130);
    doc.text(payment.comments || "-", 40, tableY + 146);

    doc.save(`invoice-${payment.invoiceNumber || payment.id}.pdf`);
  };

  const columns: ColumnDef<PaymentRow>[] = [
    { accessorKey: "customer.name", header: "Customer" },
    { accessorKey: "invoiceNumber", header: "Invoice #" },
    { accessorKey: "billingMonth", header: "Month" },
    { accessorKey: "billingYear", header: "Year" },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "otherAmount", header: "Other Amount" },
    { accessorKey: "status", header: "Status" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <button
          onClick={() => downloadInvoicePdf(row.original)}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Download Invoice
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Customer</label>
            <select
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value === "" ? "" : Number(e.target.value))}
              className="w-full border rounded p-2"
            >
              <option value="">All Customers</option>
              {customers.map((customer: any) => (
                <option key={customer.customerid} value={customer.customerid}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Month</label>
            <select
              value={billingMonth}
              onChange={(e) => setBillingMonth(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">All Months</option>
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Year</label>
            <select
              value={billingYear}
              onChange={(e) => setBillingYear(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">All Years</option>
              {yearOptions.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white rounded p-3"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        {hasSearched ? (
          <DataTable
            data={filteredPayments}
            columns={columns}
            loading={isLoading}
          />
        ) : (
          <div className="text-gray-500 text-center py-16">
            Select filters and click Search to view customer invoice records.
          </div>
        )}
      </div>
    </div>
  );
}
