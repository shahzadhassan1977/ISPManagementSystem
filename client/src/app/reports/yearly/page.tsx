"use client";

import PageWrapper from "@/components/ui/PageWrapper";
import DataTable from "@/components/ui/DataTable";
import { useCustomers } from "@/modules/customer/hooks/useCustomers";
import { useExpenses } from "@/modules/expense/hooks/useExpenses";
import { usePayments } from "@/modules/payment/hooks/usePayments";
import { useSubscriptions } from "@/modules/subscription/hooks/useSubscription";

const parseDate = (value: any) => (value ? new Date(value) : null);

const isSameYear = (value: any, compare: Date) => {
  const date = parseDate(value);
  return date && date.getFullYear() === compare.getFullYear();
};

const formatDate = (value: any) => {
  const date = parseDate(value);
  return date ? date.toLocaleDateString("en-GB") : "N/A";
};

export default function YearlyReportPage() {
  const { data: customers = [], isLoading: loadingCustomers } = useCustomers();
  const { data: payments = [], isLoading: loadingPayments } = usePayments();
  const { data: subscriptions = [], isLoading: loadingSubscriptions } = useSubscriptions();
  const { data: expenses = [], isLoading: loadingExpenses } = useExpenses();

  const today = new Date();

  const customerRows = customers.filter((customer: any) => isSameYear(customer.createdAt, today));
  const paymentRows = payments.filter((payment: any) => Number(payment.billingYear) === today.getFullYear());
  const subscriptionRows = subscriptions.filter((subscription: any) => {
    const startDate = parseDate(subscription.startDate);
    return subscription.isActive && startDate && startDate.getFullYear() === today.getFullYear();
  });
  const expenseRows = expenses.filter((expense: any) => {
    const expenseDate = parseDate(expense.expenseDate || expense.createdAt);
    return expenseDate && expenseDate.getFullYear() === today.getFullYear();
  });

  const totalRevenue = paymentRows.reduce(
    (sum: number, payment: any) =>
      sum + Number(payment.amount || 0) + Number(payment.otherAmount || 0),
    0
  );
  const totalExpenses = expenseRows.reduce((sum: number, expense: any) => sum + Number(expense.amount || 0), 0);

  const isLoading = loadingCustomers || loadingPayments || loadingSubscriptions || loadingExpenses;

  const customerColumns = [
    { accessorKey: "name", header: "Customer Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    {
      accessorKey: "createdAt",
      header: "Registered At",
      cell: ({ row }: any) => formatDate(row.original.createdAt),
    },
  ];

  const paymentColumns = [
    { accessorKey: "invoiceNumber", header: "Invoice #" },
    {
      header: "Customer",
      cell: ({ row }: any) =>
        row.original.customer?.name ?? row.original.subscription?.customer?.name ?? "N/A",
    },
    { accessorKey: "amount", header: "Amount" },
    { accessorKey: "otherAmount", header: "Other Amount" },
    { accessorKey: "status", header: "Status" },
    {
      accessorKey: "createdAt",
      header: "Payment Date",
      cell: ({ row }: any) => formatDate(row.original.createdAt),
    },
  ];

  const subscriptionColumns = [
    { accessorKey: "customer.name", header: "Customer" },
    { accessorKey: "product.name", header: "Product" },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }: any) => formatDate(row.original.startDate),
    },
    {
      accessorKey: "renewalDate",
      header: "Renewal Date",
      cell: ({ row }: any) => formatDate(row.original.renewalDate),
    },
    { accessorKey: "status", header: "Status" },
  ];

  const expenseColumns = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "amount", header: "Amount" },
    {
      accessorKey: "expenseDate",
      header: "Expense Date",
      cell: ({ row }: any) => formatDate(row.original.expenseDate || row.original.createdAt),
    },
  ];

  return (
    <PageWrapper
      title="Yearly Reports"
      description="Review this year's customer registration, revenue, expense, and subscription activity."
      pagePermission="reportyearly"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
            <p className="text-sm text-slate-500">New customer registrations</p>
            <p className="mt-4 text-4xl font-semibold">{customerRows.length}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Yearly revenue</p>
            <p className="mt-4 text-4xl font-semibold">Rs.{totalRevenue.toFixed(2)}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Active subscriptions</p>
            <p className="mt-4 text-4xl font-semibold">{subscriptionRows.length}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Yearly expenses</p>
            <p className="mt-4 text-4xl font-semibold">Rs.{totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Customer Registrations</h2>
            <DataTable data={customerRows} columns={customerColumns} loading={isLoading} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Revenue</h2>
            <DataTable data={paymentRows} columns={paymentColumns} loading={isLoading} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Active Subscriptions</h2>
            <DataTable data={subscriptionRows} columns={subscriptionColumns} loading={isLoading} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Expenses</h2>
            <DataTable data={expenseRows} columns={expenseColumns} loading={isLoading} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
