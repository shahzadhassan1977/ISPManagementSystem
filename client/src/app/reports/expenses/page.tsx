"use client";

import PageWrapper from "@/components/ui/PageWrapper";
import DataTable from "@/components/ui/DataTable";
import { useExpenses } from "@/modules/expense/hooks/useExpenses";

const formatDate = (value: any) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-GB");
};

const formatCurrency = (value: number) => `Rs.${value.toFixed(2)}`;

export default function ExpensesReportPage() {
  const { data: expenses = [], isLoading } = useExpenses();

  const totals = expenses.reduce(
    (acc: any, expense: any) => {
      acc.count += 1;
      acc.amount += Number(expense.amount || 0);
      if (["Pending", "OnHold", "InProcess"].includes(expense.status)) {
        acc.pending += Number(expense.amount || 0);
      }
      if (expense.status === "Paid") {
        acc.paid += Number(expense.amount || 0);
      }
      return acc;
    },
    { count: 0, amount: 0, pending: 0, paid: 0 },
  );

  const columns = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "paymentMethod", header: "Payment Method" },
    { accessorKey: "amount", header: "Amount" },
    {
      accessorKey: "expenseDate",
      header: "Expense Date",
      cell: ({ row }: any) => formatDate(row.original.expenseDate),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }: any) => row.original.description || "-",
    },
  ];

  return (
    <PageWrapper
      title="Expenses Report"
      description="Review all expense activity, totals, and payment status."
      pagePermission="reportexpenses"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Total expense entries</p>
            <p className="mt-4 text-4xl font-semibold">{totals.count}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Total amount</p>
            <p className="mt-4 text-4xl font-semibold">{formatCurrency(totals.amount)}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Pending amount</p>
            <p className="mt-4 text-4xl font-semibold">{formatCurrency(totals.pending)}</p>
          </div>
        </div>

        <DataTable data={expenses} columns={columns} loading={isLoading} />
      </div>
    </PageWrapper>
  );
}
