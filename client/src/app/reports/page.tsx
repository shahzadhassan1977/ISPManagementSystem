"use client";

import Link from "next/link";
import PageWrapper from "@/components/ui/PageWrapper";

const cards = [
  {
    label: "Daily Reports",
    description: "Customer registration, revenue, and subscriptions for today.",
    href: "/reports/daily",
  },
  {
    label: "Monthly Reports",
    description: "Monthly customer, revenue, and subscription summaries.",
    href: "/reports/monthly",
  },
  {
    label: "Yearly Reports",
    description: "Yearly customer, revenue, and subscription summaries.",
    href: "/reports/yearly",
  },
  {
    label: "Employee Wise Report",
    description: "Explore product payment and profit by employee-related records.",
    href: "/reports/employee-wise",
  },
  {
    label: "Product Wise Report",
    description: "View payment, purchase price, sale price, and profit by product.",
    href: "/reports/product-wise",
  },
];

export default function ReportsPage() {
  return (
    <PageWrapper
      title="Reports"
      description="Choose a report type to review customer registration, revenue, and subscription activity."
      pagePermission="reports"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block rounded-3xl border border-slate-200 bg-white p-6 shadow hover:border-blue-500 hover:ring-1 hover:ring-blue-500"
          >
            <p className="text-lg font-semibold mb-2">{card.label}</p>
            <p className="text-sm text-slate-500">{card.description}</p>
            <div className="mt-4 text-blue-600 font-semibold">Open report →</div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
