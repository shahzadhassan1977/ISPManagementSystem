"use client";

import { useMemo, useState } from "react";
import Select from "react-select";
import PageWrapper from "@/components/ui/PageWrapper";
import DataTable from "@/components/ui/DataTable";
import { useCustomers } from "@/modules/customer/hooks/useCustomers";
import { useExpenses } from "@/modules/expense/hooks/useExpenses";
import { usePayments } from "@/modules/payment/hooks/usePayments";
import { useSubscriptions } from "@/modules/subscription/hooks/useSubscription";

const formatDate = (value: any) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-GB");
};

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDayKey = (value: any) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : formatDateKey(date);
};

const getTotalAmount = (payment: any) =>
  Number(payment?.amount || 0) + Number(payment?.otherAmount || 0);

const getDateRange = (start: string, end: string) => {
  if (!start && !end) return [] as Date[];

  const startDate = start ? new Date(start) : new Date();
  const endDate = end ? new Date(end) : new Date();

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return [] as Date[];
  }

  const startNormalized = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const endNormalized = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  const rangeStart = startNormalized <= endNormalized ? startNormalized : endNormalized;
  const rangeEnd = startNormalized <= endNormalized ? endNormalized : startNormalized;

  const dates: Date[] = [];
  const cursor = new Date(rangeStart);

  while (cursor <= rangeEnd) {
    dates.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return dates;
};

const getDefaultDateRange = (items: any[], fieldName: string) => {
  const dates = items
    .map((item) => new Date(item?.[fieldName] ?? item?.createdAt ?? item?.expenseDate ?? item?.startDate ?? item?.renewalDate))
    .filter((date) => !Number.isNaN(date.getTime()));

  if (!dates.length) {
    return { start: "", end: "" };
  }

  const min = new Date(Math.min(...dates.map((date) => date.getTime())));
  const max = new Date(Math.max(...dates.map((date) => date.getTime())));

  return {
    start: formatDateKey(min),
    end: formatDateKey(max),
  };
};

export default function RevenueReportPage() {
  const { data: payments = [], isLoading: loadingPayments } = usePayments();
  const { data: customers = [], isLoading: loadingCustomers } = useCustomers();
  const { data: subscriptions = [], isLoading: loadingSubscriptions } = useSubscriptions();
  const { data: expenses = [], isLoading: loadingExpenses } = useExpenses();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const defaultRange = useMemo(
    () => ({
      ...getDefaultDateRange(payments, "createdAt"),
      ...getDefaultDateRange(customers, "createdAt"),
      ...getDefaultDateRange(subscriptions, "startDate"),
      ...getDefaultDateRange(expenses, "expenseDate"),
    }),
    [payments, customers, subscriptions, expenses]
  );

  const effectiveStartDate = startDate || defaultRange.start;
  const effectiveEndDate = endDate || defaultRange.end;

  const statusOptions = useMemo(
    () => [
      { value: "", label: "All Status" },
      ...Array.from(new Set(payments.map((payment: any) => payment.status).filter(Boolean))).map(
        (value) => ({ value, label: value })
      ),
    ],
    [payments]
  );

  const reportRows = useMemo(() => {
    const dateRange = getDateRange(effectiveStartDate, effectiveEndDate);

    if (!dateRange.length) {
      return [];
    }

    const customerCounts = new Map<string, number>();
    customers.forEach((customer: any) => {
      const key = getDayKey(customer.createdAt);
      if (!key) return;
      customerCounts.set(key, (customerCounts.get(key) || 0) + 1);
    });

    const subscriptionCounts = new Map<string, number>();
    subscriptions.forEach((subscription: any) => {
      const key = getDayKey(subscription.startDate);
      if (!key) return;
      subscriptionCounts.set(key, (subscriptionCounts.get(key) || 0) + 1);
    });

    const expenseTotals = new Map<string, number>();
    expenses.forEach((expense: any) => {
      const key = getDayKey(expense.expenseDate || expense.createdAt);
      if (!key) return;
      expenseTotals.set(key, (expenseTotals.get(key) || 0) + Number(expense.amount || 0));
    });

    const paymentTotals = new Map<string, { revenue: number; paid: number; pending: number }>();
    payments.forEach((payment: any) => {
      const key = getDayKey(payment.createdAt);
      if (!key) return;

      const current = paymentTotals.get(key) || { revenue: 0, paid: 0, pending: 0 };
      const total = getTotalAmount(payment);
      current.revenue += total;

      if (payment.status === "Paid") {
        current.paid += total;
      }

      if (payment.status === "Pending") {
        current.pending += total;
      }

      paymentTotals.set(key, current);
    });

    return dateRange.map((date) => {
      const key = formatDateKey(date);
      const paymentData = paymentTotals.get(key) || { revenue: 0, paid: 0, pending: 0 };
      const selectedStatusRevenue = status
        ? payments
            .filter((payment: any) => getDayKey(payment.createdAt) === key && payment.status === status)
            .reduce((sum: number, payment: any) => sum + getTotalAmount(payment), 0)
        : paymentData.revenue;

      const selectedPaidRevenue = status
        ? payments
            .filter((payment: any) => getDayKey(payment.createdAt) === key && payment.status === "Paid" && (status === "" || status === "Paid"))
            .reduce((sum: number, payment: any) => sum + getTotalAmount(payment), 0)
        : paymentData.paid;

      const selectedPendingRevenue = status
        ? payments
            .filter((payment: any) => getDayKey(payment.createdAt) === key && payment.status === "Pending" && (status === "" || status === "Pending"))
            .reduce((sum: number, payment: any) => sum + getTotalAmount(payment), 0)
        : paymentData.pending;

      return {
        date: key,
        totalRevenue: selectedStatusRevenue,
        totalCustomer: customerCounts.get(key) || 0,
        totalSubscription: subscriptionCounts.get(key) || 0,
        totalPaid: selectedPaidRevenue,
        totalPending: selectedPendingRevenue,
        totalExpense: expenseTotals.get(key) || 0,
      };
    });
  }, [payments, customers, subscriptions, expenses, effectiveStartDate, effectiveEndDate, status]);

  const summary = reportRows.reduce(
    (acc: any, row: any) => {
      acc.totalRevenue += row.totalRevenue;
      acc.totalCustomer += row.totalCustomer;
      acc.totalSubscription += row.totalSubscription;
      acc.totalPaid += row.totalPaid;
      acc.totalPending += row.totalPending;
      acc.totalExpense += row.totalExpense;
      return acc;
    },
    { totalRevenue: 0, totalCustomer: 0, totalSubscription: 0, totalPaid: 0, totalPending: 0, totalExpense: 0 }
  );

  const columns = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }: any) => formatDate(row.original.date),
    },
    {
      accessorKey: "totalRevenue",
      header: "Total Revenue",
      cell: ({ row }: any) => `${Number(row.original.totalRevenue || 0).toFixed(2)}`,
    },
    {
      accessorKey: "totalCustomer",
      header: "Total Customer",
    },
    {
      accessorKey: "totalSubscription",
      header: "Total Subscription",
    },
    {
      accessorKey: "totalPaid",
      header: "Total Paid",
      cell: ({ row }: any) => `${Number(row.original.totalPaid || 0).toFixed(2)}`,
    },
    {
      accessorKey: "totalPending",
      header: "Total Pending",
      cell: ({ row }: any) => `${Number(row.original.totalPending || 0).toFixed(2)}`,
    },
    {
      accessorKey: "totalExpense",
      header: "Total Expense",
      cell: ({ row }: any) => `${Number(row.original.totalExpense || 0).toFixed(2)}`,
    },
  ];

  const isLoading = loadingPayments || loadingCustomers || loadingSubscriptions || loadingExpenses;

  return (
    <PageWrapper
      title="Revenue Report"
      description="Review daily totals for revenue, customers, subscriptions, paid and pending amounts, and expenses between the selected date range."
      pagePermission="reportrevenue"
    >
      <div className="space-y-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow space-y-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm text-gray-600 dark:text-slate-200">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-600 dark:text-slate-200">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-gray-600 dark:text-slate-200">Status</label>
              <Select
                options={statusOptions}
                value={statusOptions.find((option) => option.value === status) ?? null}
                onChange={(option: any) => setStatus(option?.value ?? "")}
                isSearchable
                placeholder="Select status"
                classNamePrefix="react-select"
                className="text-sm"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setStatus("");
                }}
                className="w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {[
            { k: "Revenue", v: summary.totalRevenue.toFixed(2) },
            { k: "Customers", v: String(summary.totalCustomer) },
            { k: "Subscriptions", v: String(summary.totalSubscription) },
            { k: "Paid", v: summary.totalPaid.toFixed(2) },
            { k: "Pending", v: summary.totalPending.toFixed(2) },
            { k: "Expenses", v: summary.totalExpense.toFixed(2) },
          ].map((item) => (
            <div key={item.k} className="rounded-3xl border border-slate-200 bg-white p-5 shadow dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{item.k}</p>
              <p className="mt-3 text-2xl font-semibold dark:text-slate-100 truncate max-w-full break-words">
                <span className="inline-block max-w-full break-words">{item.v}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-900">
          <DataTable data={reportRows} columns={columns} loading={isLoading} />
        </div>
      </div>
    </PageWrapper>
  );
}
