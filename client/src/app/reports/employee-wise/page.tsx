"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import PageWrapper from "@/components/ui/PageWrapper";
import DataTable from "@/components/ui/DataTable";
import { useEmployees } from "@/modules/employee/hooks/useEmployee";
import { usePayments } from "@/modules/payment/hooks/usePayments";

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
  const { data: employees = [], isLoading: loadingEmployees } = useEmployees();
  const { data: payments = [], isLoading: loadingPayments } = usePayments();

  const [employeeId, setEmployeeId] = useState<number | "">("");
  const [billingMonth, setBillingMonth] = useState<string>("");
  const [billingYear, setBillingYear] = useState<string>("");
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const employeeOptions = useMemo(
    () =>
      employees.map((employee: any) => ({
        value: employee.employeeid,
        label: employee.name,
      })),
    [employees]
  );

  const isLoading = loadingEmployees || loadingPayments;

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
    {
      id: "profit",
      header: "Profit",
      cell: ({ row }) => formatCurrency(getProfit(row.original)),
    },
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
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Employee</label>
              <select
                value={employeeId}
                onChange={(e) =>
                  setEmployeeId(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-full border rounded p-2"
              >
                <option value="">All Employees</option>
                {employeeOptions.map((employee: { value: number; label: string }) => (
                  <option key={employee.value} value={employee.value}>
                    {employee.label}
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
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow">
              <p className="text-sm text-slate-500">Total profit</p>
              <p className="mt-4 text-4xl font-semibold">{formatCurrency(totalProfit)}</p>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow">
          {hasSearched ? (
            <DataTable data={filteredPayments} columns={columns} loading={isLoading} />
          ) : (
            <div className="text-gray-500 text-center py-16">
              Select filters and click Search to view employee-wise payment records.
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
