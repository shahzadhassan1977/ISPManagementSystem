"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChartColumnIncreasing,
  Package,
  ReceiptText,
  Users,
  Wallet,
} from "lucide-react";
import PageWrapper from "@/components/ui/PageWrapper";

const cards = [
  {
    label: "Daily Reports",
    description: "Today’s customer, payment, subscription, and expense activity.",
    href: "/reports/daily",
    icon: CalendarDays,
    tone: "blue",
  },
  {
    label: "Revenue Report",
    description: "Compare collected revenue, status, and expenses by date.",
    href: "/reports/revenue",
    icon: ChartColumnIncreasing,
    tone: "green",
  },
  {
    label: "Monthly Reports",
    description: "Review this month’s registrations, income, and service starts.",
    href: "/reports/monthly",
    icon: CalendarDays,
    tone: "orange",
  },
  {
    label: "Yearly Reports",
    description: "See annual performance across customers, revenue, and expenses.",
    href: "/reports/yearly",
    icon: ChartColumnIncreasing,
    tone: "navy",
  },
  {
    label: "Employee Report",
    description: "Review payments and product performance by assigned employee.",
    href: "/reports/employee-wise",
    icon: Users,
    tone: "blue",
  },
  {
    label: "Product Report",
    description: "Compare product sales and payments; financial details follow access.",
    href: "/reports/product-wise",
    icon: Package,
    tone: "orange",
  },
  {
    label: "Customer Report",
    description: "Find customer payment history, unpaid accounts, and subscriptions.",
    href: "/reports/customer",
    icon: Users,
    tone: "green",
  },
  {
    label: "Expense Report",
    description: "Filter expenses by category, payment method, period, and status.",
    href: "/reports/expenses",
    icon: Wallet,
    tone: "navy",
  },
  {
    label: "Customer Invoices",
    description: "Find customer invoices and download printable PDF copies.",
    href: "/repCustomerInvoice",
    icon: ReceiptText,
    tone: "blue",
  },
];

const toneStyles: Record<string, string> = {
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  orange: "bg-orange-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  navy: "bg-[#edf1f8] text-[#244e88] dark:bg-slate-800 dark:text-blue-200",
};

export default function ReportsPage() {
  return (
    <PageWrapper
      title="Reports"
      description="Choose a report type to review customer registration, revenue, and subscription activity."
      pagePermission="reports"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex min-h-32 items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-700 sm:p-5"
          >
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${toneStyles[card.tone]}`}>
              <card.icon size={18} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-[#142e5c] dark:text-blue-100">{card.label}</span>
              <span className="mt-1.5 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{card.description}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#245fae] transition group-hover:gap-2 dark:text-blue-300">
                Open report <ArrowRight size={13} aria-hidden="true" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
