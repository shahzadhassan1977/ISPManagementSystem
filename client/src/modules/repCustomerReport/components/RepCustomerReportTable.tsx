"use client";

import { useMemo, useState } from "react";
import DataTable from "@/components/ui/DataTable";
import Select from "react-select";
import { useCustomers } from "@/modules/customer/hooks/useCustomers";
import { usePayments } from "@/modules/payment/hooks/usePayments";
import { useSubscriptions } from "@/modules/subscription/hooks/useSubscription";

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
    .map((item) => new Date(item?.[fieldName] ?? item?.createdAt ?? item?.startDate))
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

const formatDisplayDate = (value: any) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-GB");
};

const getTotalAmount = (payment: any) => Number(payment?.amount || 0) + Number(payment?.otherAmount || 0);

export default function RepCustomerReportTable() {
  const { data: customers = [], isLoading: loadingCustomers } = useCustomers();
  const { data: payments = [], isLoading: loadingPayments } = usePayments();
  const { data: subscriptions = [], isLoading: loadingSubscriptions } = useSubscriptions();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [unpaidOnly, setUnpaidOnly] = useState(false);
  const [subscriptionFilter, setSubscriptionFilter] = useState("");

  const defaultRange = useMemo(
    () => ({
      ...getDefaultDateRange(payments, "createdAt"),
      ...getDefaultDateRange(customers, "createdAt"),
      ...getDefaultDateRange(subscriptions, "startDate"),
    }),
    [payments, customers, subscriptions]
  );

  const effectiveStartDate = startDate || defaultRange.start;
  const effectiveEndDate = endDate || defaultRange.end;

  const statusOptions = useMemo(
    () => [
      { value: "", label: "All Status" },
      { value: "Paid", label: "Paid" },
      { value: "Pending", label: "Pending" },
    ],
    []
  );

  const subscriptionOptions = useMemo(
    () => [
      { value: "", label: "All" },
      { value: "subscribed", label: "Subscribed" },
      { value: "unsubscribed", label: "Unsubscribed" },
    ],
    []
  );

  const reportRows = useMemo(() => {
    const dateRange = getDateRange(effectiveStartDate, effectiveEndDate);

    const rangeStart = dateRange.length ? new Date(dateRange[0]) : null;
    const rangeEnd = dateRange.length ? new Date(dateRange[dateRange.length - 1]) : null;

    const inRange = (value: any) => {
      if (!value) return false;
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return false;
      if (!rangeStart || !rangeEnd) return true;
      return d >= rangeStart && d <= rangeEnd;
    };

    return customers
      .map((customer: any) => {
        const id = customer.customerid ?? customer.id ?? customer.id;

        const paymentsForCustomer = payments.filter((payment: any) => {
          const cid = payment.customerId ?? payment.customer?.customerid ?? payment.customer?.id;
          return (cid === id) && inRange(payment.createdAt ?? payment.billingDate ?? payment.createdAt);
        });

        const totalPaid = paymentsForCustomer
          .filter((p: any) => p.status === "Paid")
          .reduce((sum: number, p: any) => sum + getTotalAmount(p), 0);

        const totalPending = paymentsForCustomer
          .filter((p: any) => p.status === "Pending")
          .reduce((sum: number, p: any) => sum + getTotalAmount(p), 0);

        const lastPaymentDate = paymentsForCustomer
          .map((p: any) => new Date(p.createdAt || p.billingDate || p.createdAt))
          .filter((d: Date) => !Number.isNaN(d.getTime()))
          .sort((a: Date, b: Date) => b.getTime() - a.getTime())[0];

        const isUnpaid = paymentsForCustomer.length === 0;

        const isSubscribed = subscriptions.some((sub: any) => {
          const cid = sub.customerId ?? sub.customer?.customerid ?? sub.customer?.id;
          return cid === id && !sub.isDeleted;
        });

        return {
          customer,
          totalPaid,
          totalPending,
          paymentsCount: paymentsForCustomer.length,
          lastPaymentDate,
          isUnpaid,
          isSubscribed,
        };
      })
      .filter((row: any) => {
        if (unpaidOnly && !row.isUnpaid) return false;
        if (status) {
          if (status === "Paid" && row.totalPaid <= 0) return false;
          if (status === "Pending" && row.totalPending <= 0) return false;
        }
        if (subscriptionFilter) {
          if (subscriptionFilter === "subscribed" && !row.isSubscribed) return false;
          if (subscriptionFilter === "unsubscribed" && row.isSubscribed) return false;
        }
        return true;
      });
  }, [customers, payments, subscriptions, effectiveStartDate, effectiveEndDate, status, unpaidOnly, subscriptionFilter]);

  const columns = [
    { accessorKey: "customer.name", header: "Customer" },
    { accessorKey: "customer.phone", header: "Phone" },
    { accessorKey: "paymentsCount", header: "Payments" },
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
      accessorKey: "lastPaymentDate",
      header: "Last Payment",
      cell: ({ row }: any) => formatDisplayDate(row.original.lastPaymentDate),
    },
    {
      accessorKey: "isSubscribed",
      header: "Subscribed",
      cell: ({ row }: any) => (row.original.isSubscribed ? "Yes" : "No"),
    },
    {
      accessorKey: "isUnpaid",
      header: "Unpaid",
      cell: ({ row }: any) => (row.original.isUnpaid ? "Yes" : "No"),
    },
  ];

  const isLoading = loadingCustomers || loadingPayments || loadingSubscriptions;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
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
            <label className="mb-1 block text-sm text-gray-600">Status</label>
            <Select
              options={statusOptions}
              value={statusOptions.find((o) => o.value === status) ?? null}
              onChange={(option: any) => setStatus(option?.value ?? "")}
              isSearchable
              placeholder="Select status"
              classNamePrefix="react-select"
              className="text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-600">Subscription</label>
            <Select
              options={subscriptionOptions}
              value={subscriptionOptions.find((o) => o.value === subscriptionFilter) ?? null}
              onChange={(option: any) => setSubscriptionFilter(option?.value ?? "")}
              isSearchable
              placeholder="Select subscription"
              classNamePrefix="react-select"
              className="text-sm"
            />
          </div>

          <div className="flex items-end space-x-2">
            <label className="flex items-center text-sm dark:text-slate-200">
              <input type="checkbox" checked={unpaidOnly} onChange={(e) => setUnpaidOnly(e.target.checked)} className="mr-2" />
              Unpaid Only
            </label>
            <button
              type="button"
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setStatus("");
                setUnpaidOnly(false);
                setSubscriptionFilter("");
              }}
              className="rounded-md border border-slate-300 bg-slate-100 px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow">
        <DataTable data={reportRows} columns={columns} loading={isLoading} />
      </div>
    </div>
  );
}
