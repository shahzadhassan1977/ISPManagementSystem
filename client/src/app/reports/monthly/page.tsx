"use client";

import PageWrapper from "@/components/ui/PageWrapper";
import DataTable from "@/components/ui/DataTable";
import ReportMetricCard from "@/components/reports/ReportMetricCard";
import { Activity, CreditCard, Users, Wallet } from "lucide-react";
import { useCustomers } from "@/modules/customer/hooks/useCustomers";
import { useExpenses } from "@/modules/expense/hooks/useExpenses";
import { usePayments } from "@/modules/payment/hooks/usePayments";
import { useSubscriptions } from "@/modules/subscription/hooks/useSubscription";

const parseDate = (value: any) => (value ? new Date(value) : null);

const isSameMonth = (value: any, compare: Date) => {
  const date = parseDate(value);
  return date && date.getFullYear() === compare.getFullYear() && date.getMonth() === compare.getMonth();
};

const formatDate = (value: any) => {
  const date = parseDate(value);
  return date ? date.toLocaleDateString("en-GB") : "N/A";
};

export default function MonthlyReportPage() {
  const { data: customers = [], isLoading: loadingCustomers, error: customersError, refetch: refetchCustomers } = useCustomers();
  const { data: payments = [], isLoading: loadingPayments, error: paymentsError, refetch: refetchPayments } = usePayments();
  const { data: subscriptions = [], isLoading: loadingSubscriptions, error: subscriptionsError, refetch: refetchSubscriptions } = useSubscriptions();
  const { data: expenses = [], isLoading: loadingExpenses, error: expensesError, refetch: refetchExpenses } = useExpenses();

  const today = new Date();

  const customerRows = customers.filter((customer: any) => isSameMonth(customer.createdAt, today));
  const paymentRows = payments.filter((payment: any) =>
    Number(payment.billingMonth) - 1 === today.getMonth() && Number(payment.billingYear) === today.getFullYear()
  );
  const subscriptionRows = subscriptions.filter((subscription: any) => {
    const startDate = parseDate(subscription.startDate);
    return (
      subscription.isActive &&
      startDate &&
      startDate.getFullYear() === today.getFullYear() &&
      startDate.getMonth() === today.getMonth()
    );
  });
  const expenseRows = expenses.filter((expense: any) => {
    const expenseDate = parseDate(expense.expenseDate || expense.createdAt);
    return expenseDate && expenseDate.getFullYear() === today.getFullYear() && expenseDate.getMonth() === today.getMonth();
  });

  const totalRevenue = paymentRows.reduce(
    (sum: number, payment: any) =>
      sum + Number(payment.amount || 0) + Number(payment.otherAmount || 0),
    0
  );
  const totalExpenses = expenseRows.reduce((sum: number, expense: any) => sum + Number(expense.amount || 0), 0);

  const isLoading = loadingCustomers || loadingPayments || loadingSubscriptions || loadingExpenses;
  const reportError = customersError || paymentsError || subscriptionsError || expensesError;
  const retryReport = () => {
    void refetchCustomers();
    void refetchPayments();
    void refetchSubscriptions();
    void refetchExpenses();
  };

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
      title="Monthly Reports"
      description="Review this month's customer registration, revenue, expense, and subscription activity."
      pagePermission="reportmonthly"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <ReportMetricCard label="New customers" value={customerRows.length.toLocaleString()} icon={Users} tone="blue" />
          <ReportMetricCard label="Revenue collected" value={`Rs. ${totalRevenue.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={CreditCard} tone="green" />
          <ReportMetricCard label="Subscription starts" value={subscriptionRows.length.toLocaleString()} icon={Activity} tone="navy" />
          <ReportMetricCard label="Expenses recorded" value={`Rs. ${totalExpenses.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={Wallet} tone="orange" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Customer Registrations</h2>
            <DataTable data={customerRows} columns={customerColumns} loading={isLoading} error={reportError} onRetry={retryReport} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Revenue</h2>
            <DataTable data={paymentRows} columns={paymentColumns} loading={isLoading} error={reportError} onRetry={retryReport} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Active Subscriptions</h2>
            <DataTable data={subscriptionRows} columns={subscriptionColumns} loading={isLoading} error={reportError} onRetry={retryReport} />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Expenses</h2>
            <DataTable data={expenseRows} columns={expenseColumns} loading={isLoading} error={reportError} onRetry={retryReport} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
