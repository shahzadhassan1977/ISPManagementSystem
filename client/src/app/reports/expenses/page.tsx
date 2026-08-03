"use client";

import { useMemo, useState } from "react";
import Select from "react-select";
import PageWrapper from "@/components/ui/PageWrapper";
import DataTable from "@/components/ui/DataTable";
import { useExpenses } from "@/modules/expense/hooks/useExpenses";

const monthOptions = [
  { value: "", label: "All Months" },
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

const formatDate = (value: any) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-GB");
};

const formatCurrency = (value: number) => `Rs.${value.toFixed(2)}`;

export default function ExpensesReportPage() {
  const { data: expenses = [], isLoading } = useExpenses();
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [billingMonth, setBillingMonth] = useState("");
  const [billingYear, setBillingYear] = useState("");

  const categoryOptions = useMemo(
    () => [
      { value: "", label: "All Categories" },
      ...Array.from(new Set(expenses.map((expense: any) => expense.category).filter(Boolean))).map(
        (value) => ({ value, label: value })
      ),
    ],
    [expenses]
  );

  const statusOptions = useMemo(
    () => [
      { value: "", label: "All Status" },
      ...Array.from(new Set(expenses.map((expense: any) => expense.status).filter(Boolean))).map(
        (value) => ({ value, label: value })
      ),
    ],
    [expenses]
  );

  const paymentMethodOptions = useMemo(
    () => [
      { value: "", label: "All Payment Methods" },
      ...Array.from(new Set(expenses.map((expense: any) => expense.paymentMethod).filter(Boolean))).map(
        (value) => ({ value, label: value })
      ),
    ],
    [expenses]
  );

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense: any) => {
      const expenseDate = expense.expenseDate ? new Date(expense.expenseDate) : null;
      const monthMatch = billingMonth === "" || (expenseDate && expenseDate.getMonth() + 1 === Number(billingMonth));
      const yearMatch = billingYear === "" || (expenseDate && expenseDate.getFullYear() === Number(billingYear));
      const categoryMatch = category === "" || expense.category === category;
      const statusMatch = status === "" || expense.status === status;
      const paymentMethodMatch = paymentMethod === "" || expense.paymentMethod === paymentMethod;

      return monthMatch && yearMatch && categoryMatch && statusMatch && paymentMethodMatch;
    });
  }, [expenses, category, status, paymentMethod, billingMonth, billingYear]);

  const totals = filteredExpenses.reduce(
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
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="mb-1 block text-sm text-gray-600">Category</label>
              <Select
                options={categoryOptions}
                value={categoryOptions.find((option) => option.value === category) ?? null}
                onChange={(option: any) => setCategory(option?.value ?? "")}
                isSearchable
                placeholder="Select category"
                className="text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">Status</label>
              <Select
                options={statusOptions}
                value={statusOptions.find((option) => option.value === status) ?? null}
                onChange={(option: any) => setStatus(option?.value ?? "")}
                isSearchable
                placeholder="Select status"
                className="text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">Payment Method</label>
              <Select
                options={paymentMethodOptions}
                value={paymentMethodOptions.find((option) => option.value === paymentMethod) ?? null}
                onChange={(option: any) => setPaymentMethod(option?.value ?? "")}
                isSearchable
                placeholder="Select method"
                className="text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">Month</label>
              <Select
                options={monthOptions}
                value={monthOptions.find((option) => option.value === billingMonth) ?? null}
                onChange={(option: any) => setBillingMonth(option?.value ?? "")}
                isSearchable
                placeholder="Select month"
                className="text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">Year</label>
              <Select
                options={yearOptions.map((year) => ({ value: String(year), label: String(year) }))}
                value={yearOptions
                  .map((year) => ({ value: String(year), label: String(year) }))
                  .find((option) => option.value === billingYear) ?? null}
                onChange={(option: any) => setBillingYear(option?.value ?? "")}
                isSearchable
                placeholder="Select year"
                className="text-sm"
              />
            </div>
          </div>
        </div>

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

        <DataTable data={filteredExpenses} columns={columns} loading={isLoading} />
      </div>
    </PageWrapper>
  );
}
