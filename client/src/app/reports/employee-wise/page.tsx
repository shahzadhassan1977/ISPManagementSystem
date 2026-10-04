"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Select from "react-select";
import PageWrapper from "@/components/ui/PageWrapper";
import DataTable from "@/components/ui/DataTable";
import { useEmployees } from "@/modules/employee/hooks/useEmployee";
import { usePayments } from "@/modules/payment/hooks/usePayments";
import { useAuthStore } from "@/core/store/auth.store";
import { isAdminUser } from "@/utils/auth";

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

const getPaymentAmount = (payment: any) =>
  Number(payment?.amount || 0) + Number(payment?.otherAmount || 0);

const getSubscriptionDetails = (payment: any) => {
  const details = payment?.subscription?.subscriptiondetails;
  if (Array.isArray(details)) return details[0] ?? null;
  return details ?? null;
};

const getProfit = (payment: any) => {
  const purchasePrice = Number(payment?.subscription?.product?.purchasePrice || 0);
  return getPaymentAmount(payment) - purchasePrice;
};

const formatCurrency = (value: number) => `Rs.${value.toFixed(2)}`;

export default function EmployeeWiseReportPage() {
  const { data: employees = [], isLoading: loadingEmployees, error: employeesError, refetch: refetchEmployees } = useEmployees();
  const { data: payments = [], isLoading: loadingPayments, error: paymentsError, refetch: refetchPayments } = usePayments();
  const user = useAuthStore((state) => state.user);
  const canViewAdminFinancials = isAdminUser(user);

  const [employeeId, setEmployeeId] = useState<number | "">("");
  const [billingMonth, setBillingMonth] = useState<string>("");
  const [billingYear, setBillingYear] = useState<string>("");
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const employeeOptions = useMemo(
    () => [
      { value: "", label: "All Employees" },
      ...employees.map((employee: any) => ({
        value: employee.employeeid,
        label: employee.name,
      })),
    ],
    [employees]
  );

  const isLoading = loadingEmployees || loadingPayments;
  const reportError = employeesError || paymentsError;
  const retryReport = () => {
    void refetchEmployees();
    void refetchPayments();
  };

  const resetFilters = () => {
    setEmployeeId("");
    setBillingMonth("");
    setBillingYear("");
    setFilteredPayments([]);
    setHasSearched(false);
  };

  const handleSearch = () => {
    const filtered = payments.filter((payment: any) => {
      const details = getSubscriptionDetails(payment);
      const employeeMatch =
        employeeId === "" ||
        details?.linemanId === employeeId ||
        details?.areaRecoveryOfficerId === employeeId;
      const monthMatch = billingMonth === "" || payment.billingMonth === billingMonth;
      const yearMatch = billingYear === "" || payment.billingYear === billingYear;
      return employeeMatch && monthMatch && yearMatch;
    });

    setFilteredPayments(filtered);
    setHasSearched(true);
  };

  const totalPayments = filteredPayments.reduce(
    (sum, payment) => sum + getPaymentAmount(payment),
    0
  );

  const totalProfit = filteredPayments.reduce(
    (sum, payment) => sum + getProfit(payment),
    0
  );

  const columns: ColumnDef<any>[] = [
    { accessorKey: "invoiceNumber", header: "Invoice #" },
    {
      header: "Customer",
      cell: ({ row }) =>
        row.original.customer?.name ?? row.original.subscription?.customer?.name ?? "N/A",
    },
    {
      accessorKey: "subscription.product.name",
      header: "Product",
      cell: ({ row }) => row.original.subscription?.product?.name ?? "N/A",
    },
    {
      accessorKey: "subscription.product.purchasePrice",
      header: "Purchase Price",
      cell: ({ row }) => formatCurrency(Number(row.original.subscription?.product?.purchasePrice || 0)),
    },
    {
      accessorKey: "subscription.product.salePrice",
      header: "Sale Price",
      cell: ({ row }) => formatCurrency(Number(row.original.subscription?.product?.salePrice || 0)),
    },
    {
      id: "payment",
      header: "Payment",
      cell: ({ row }) => formatCurrency(getPaymentAmount(row.original)),
    },
    ...(canViewAdminFinancials
      ? [
          {
            id: "profit",
            header: "Profit",
            cell: ({ row }: { row: any }) => formatCurrency(getProfit(row.original)),
          },
        ]
      : []),
    { accessorKey: "billingMonth", header: "Billing Month" },
    { accessorKey: "billingYear", header: "Billing Year" },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  return (
    <PageWrapper
      title="Employee Wise Report"
      description="View payments, purchase price, sale price, and profit for employee-associated records."
      pagePermission="reportemployee-wise"
    >
      <div className="space-y-6">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Employee</label>
              <Select
                options={employeeOptions}
                value={employeeOptions.find((option) => option.value === employeeId) ?? null}
                onChange={(option: any) => setEmployeeId(option?.value ?? "")}
                isSearchable
                placeholder="Select employee"
                classNamePrefix="react-select"
                className="text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Month</label>
              <Select
                options={monthOptions}
                value={monthOptions.find((option) => option.value === billingMonth) ?? null}
                onChange={(option: any) => setBillingMonth(option?.value ?? "")}
                isSearchable
                placeholder="Select month"
                classNamePrefix="react-select"
                className="text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Year</label>
              <Select
                options={yearOptions.map((year) => ({ value: String(year), label: String(year) }))}
                value={yearOptions
                  .map((year) => ({ value: String(year), label: String(year) }))
                  .find((option) => option.value === billingYear) ?? null}
                onChange={(option: any) => setBillingYear(option?.value ?? "")}
                isSearchable
                placeholder="Select year"
                classNamePrefix="react-select"
                className="text-sm"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handleSearch}
                className="min-h-10 flex-1 rounded-md bg-[#142e5c] px-4 text-sm font-semibold text-white transition hover:bg-[#1d447d] dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Search
              </button>
              <button type="button" onClick={resetFilters} className="min-h-10 rounded-md border border-slate-300 px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                Reset
              </button>
            </div>
          </div>
        </div>

        {hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
              <p className="text-sm text-slate-500">Records returned</p>
              <p className="mt-4 text-4xl font-semibold">{filteredPayments.length}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
              <p className="text-sm text-slate-500">Total payment</p>
              <p className="mt-4 text-4xl font-semibold">{formatCurrency(totalPayments)}</p>
            </div>
            {canViewAdminFinancials && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
                <p className="text-sm text-slate-500">Total profit</p>
                <p className="mt-4 text-4xl font-semibold">{formatCurrency(totalProfit)}</p>
              </div>
            )}
          </div>
        )}

        <div>
          {hasSearched ? (
            <DataTable data={filteredPayments} columns={columns} loading={isLoading} error={reportError} onRetry={retryReport} />
          ) : reportError ? (
            <div role="alert" className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-slate-700 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-slate-200">
              <p className="font-semibold">Report data couldn&apos;t be loaded.</p>
              <button type="button" onClick={retryReport} className="mt-3 min-h-9 rounded-md bg-[#142e5c] px-4 text-xs font-semibold text-white hover:bg-[#1d447d] dark:bg-blue-700">Try again</button>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              Select filters and click Search to view employee-wise payment records.
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
