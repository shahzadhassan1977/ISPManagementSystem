"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  Search,
  Users,
  Wallet,
} from "lucide-react";
import { useCustomers } from "@/modules/customer/hooks/useCustomers";
import { usePayments } from "@/modules/payment/hooks/usePayments";
import { useSubscriptions } from "@/modules/subscription/hooks/useSubscription";
import { useExpenses } from "@/modules/expense/hooks/useExpenses";

type Period = "day" | "month" | "year";
type TrendMetric = "revenue" | "customers" | "subscriptions";
type TrendPoint = { label: string; revenue: number; customers: number; subscriptions: number };
type DashboardRecord = {
  [key: string]: unknown;
  id?: string | number;
  subscriptionid?: string | number;
  customerid?: string | number;
  customerId?: string | number;
  name?: string;
  cnic?: string;
  cnic_no?: string;
  cnicNo?: string;
  phone?: string;
  mobile?: string;
  createdAt?: string | number | Date;
  startDate?: string | number | Date;
  renewalDate?: string | number | Date;
  expenseDate?: string | number | Date;
  billingMonth?: number | string;
  billingYear?: number | string;
  amount?: number | string;
  otherAmount?: number | string;
  isActive?: boolean;
  status?: string;
  title?: string;
  category?: string;
  customer?: DashboardRecord;
  product?: { name?: string };
};

const parseDate = (value: unknown) => (value ? new Date(value as string | number | Date) : null);

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const isRenewalOn = (renewalValue: unknown, targetDate: Date) => {
  const date = parseDate(renewalValue);
  if (!date || Number.isNaN(date.getTime())) return false;
  return Math.min(date.getDate(), daysInMonth(targetDate.getFullYear(), targetDate.getMonth())) === targetDate.getDate();
};

const isSameDay = (value: unknown, compare: Date) => {
  const date = parseDate(value);
  return Boolean(
    date &&
      !Number.isNaN(date.getTime()) &&
      date.getFullYear() === compare.getFullYear() &&
      date.getMonth() === compare.getMonth() &&
      date.getDate() === compare.getDate(),
  );
};

const getDateKeys = (days: number) => {
  const today = new Date();
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - 1 - index));
    return date;
  });
};

const getMonthKeys = (months: number) => {
  const today = new Date();
  return Array.from({ length: months }, (_, index) =>
    new Date(today.getFullYear(), today.getMonth() - (months - 1 - index), 1),
  );
};

const getYearKeys = (years: number) => {
  const today = new Date();
  return Array.from({ length: years }, (_, index) =>
    new Date(today.getFullYear() - (years - 1 - index), 0, 1),
  );
};

const formatDayLabel = (date: Date) => date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
const formatMonthLabel = (date: Date) => date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
const formatDate = (value: unknown) => {
  const date = parseDate(value);
  return date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString("en-GB") : "N/A";
};
const formatCurrency = (value: number) =>
  `Rs. ${new Intl.NumberFormat("en-PK", { maximumFractionDigits: 2 }).format(value)}`;
const formatCompactCurrency = (value: number) =>
  `Rs. ${new Intl.NumberFormat("en-PK", { notation: "compact", maximumFractionDigits: 1 }).format(value)}`;

const sumPayment = (payments: DashboardRecord[]) =>
  payments.reduce((sum, payment) => sum + Number(payment.amount || 0) + Number(payment.otherAmount || 0), 0);

function TrendChart({ data, metric }: { data: TrendPoint[]; metric: TrendMetric }) {
  const values = data.map((point) => point[metric]);
  const maxValue = Math.max(...values, 1);
  const width = 640;
  const height = 210;
  const left = 56;
  const right = 14;
  const top = 16;
  const bottom = 34;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const points = values.map((value, index) => ({
    x: left + (index / Math.max(values.length - 1, 1)) * plotWidth,
    y: top + plotHeight - (value / maxValue) * plotHeight,
    value,
  }));
  const path = points.map((point) => `${point.x},${point.y}`).join(" ");
  const fillPath = `${left},${top + plotHeight} ${path} ${left + plotWidth},${top + plotHeight}`;
  const color = metric === "revenue" ? "#2468bd" : metric === "customers" ? "#e98216" : "#1c4b88";
  const total = values.reduce((sum, value) => sum + value, 0);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="dashboard-ink text-2xl font-bold sm:text-3xl">
            {metric === "revenue" ? formatCurrency(total) : total.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {metric === "revenue" ? "Revenue in selected trend" : `${metric === "customers" ? "Customers" : "Subscription starts"} in selected trend`}
          </p>
        </div>
      </div>
      <div className="mt-4 w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[190px] w-full sm:h-[220px]" role="img" aria-label={`${metric} trend chart`}>
          {[0, 1, 2, 3].map((line) => {
            const y = top + (line / 3) * plotHeight;
            const value = Math.round(maxValue * (1 - line / 3));
            return (
              <g key={line}>
                <line className="dashboard-chart-grid" x1={left} x2={width - right} y1={y} y2={y} stroke="#e8edf3" strokeDasharray="4 5" />
                <text x={left - 8} y={y + 3} textAnchor="end" fill="#8290a7" fontSize="9">
                  {metric === "revenue" ? formatCompactCurrency(value).replace("Rs. ", "") : value}
                </text>
              </g>
            );
          })}
          <polygon points={fillPath} fill={color} opacity="0.09" />
          <polyline points={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((point, index) => (
            <g key={`${data[index]?.label}-${index}`}>
              <circle cx={point.x} cy={point.y} r="4" fill="white" stroke={color} strokeWidth="2.5" />
              <title>{`${data[index]?.label}: ${metric === "revenue" ? formatCurrency(point.value) : point.value}`}</title>
            </g>
          ))}
          {data.map((point, index) => {
            const showLabel = data.length <= 7 || index === 0 || index === data.length - 1 || index % 2 === 0;
            if (!showLabel) return null;
            return (
              <text key={`${point.label}-axis`} x={points[index].x} y={height - 8} textAnchor="middle" fill="#8290a7" fontSize="9">
                {point.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof Users;
  tone: "blue" | "orange" | "navy";
}) {
  const toneClasses = {
    blue: "dashboard-blue-surface bg-blue-50 dashboard-link",
    orange: "dashboard-orange-surface bg-orange-50 dashboard-orange",
    navy: "dashboard-navy-surface bg-[#edf1f8] dashboard-link",
  };
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
          <p className="dashboard-ink mt-2 break-words text-xl font-bold leading-tight sm:text-2xl">{value}</p>
        </div>
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${toneClasses[tone]}`}>
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-[11px] text-slate-500 sm:text-xs">{description}</p>
    </article>
  );
}

export default function DashboardPage() {
  const { data: customers = [] } = useCustomers();
  const { data: payments = [] } = usePayments();
  const { data: subscriptions = [] } = useSubscriptions();
  const { data: expenses = [] } = useExpenses();
  const [period, setPeriod] = useState<Period>("month");
  const [trendMetric, setTrendMetric] = useState<TrendMetric>("revenue");
  const [renewalTab, setRenewalTab] = useState<"yesterday" | "today" | "tomorrow">("today");
  const [renewalSearch, setRenewalSearch] = useState("");
  const [renewalPage, setRenewalPage] = useState(1);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const dailyCustomers = customers.filter((customer: DashboardRecord) => isSameDay(customer.createdAt, today)).length;
  const dailyRevenue = sumPayment(payments.filter((payment: DashboardRecord) => isSameDay(payment.createdAt, today)));
  const dailySubscriptions = subscriptions.filter(
    (subscription: DashboardRecord) => subscription.isActive && isSameDay(subscription.startDate, today),
  ).length;

  const monthlyCustomers = customers.filter((customer: DashboardRecord) => {
    const date = parseDate(customer.createdAt);
    return date && date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  }).length;
  const monthlyRevenue = sumPayment(
    payments.filter(
      (payment: DashboardRecord) => Number(payment.billingMonth) - 1 === currentMonth && Number(payment.billingYear) === currentYear,
    ),
  );
  const monthlySubscriptions = subscriptions.filter((subscription: DashboardRecord) => {
    const date = parseDate(subscription.startDate);
    return subscription.isActive && date && date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  }).length;

  const yearlyCustomers = customers.filter((customer: DashboardRecord) => {
    const date = parseDate(customer.createdAt);
    return date && date.getFullYear() === currentYear;
  }).length;
  const yearlyRevenue = sumPayment(payments.filter((payment: DashboardRecord) => Number(payment.billingYear) === currentYear));
  const yearlySubscriptions = subscriptions.filter((subscription: DashboardRecord) => {
    const date = parseDate(subscription.startDate);
    return subscription.isActive && date && date.getFullYear() === currentYear;
  }).length;

  const monthlyExpenses = expenses
    .filter((expense: DashboardRecord) => {
      const date = parseDate(expense.expenseDate);
      return date && date.getFullYear() === currentYear && date.getMonth() === currentMonth;
    })
    .reduce((sum: number, expense: DashboardRecord) => sum + Number(expense.amount || 0), 0);
  const pendingExpenses = expenses
    .filter((expense: DashboardRecord) => ["Pending", "OnHold", "InProcess"].includes(String(expense.status)))
    .reduce((sum: number, expense: DashboardRecord) => sum + Number(expense.amount || 0), 0);
  const recentExpenses = [...expenses]
    .sort((a: DashboardRecord, b: DashboardRecord) =>
      new Date(b.expenseDate || b.createdAt || 0).getTime() - new Date(a.expenseDate || a.createdAt || 0).getTime(),
    )
    .slice(0, 5);

  const dailyTrend: TrendPoint[] = getDateKeys(7).map((date) => ({
    label: formatDayLabel(date),
    customers: customers.filter((customer: DashboardRecord) => isSameDay(customer.createdAt, date)).length,
    revenue: sumPayment(payments.filter((payment: DashboardRecord) => isSameDay(payment.createdAt, date))),
    subscriptions: subscriptions.filter(
      (subscription: DashboardRecord) => subscription.isActive && isSameDay(subscription.startDate, date),
    ).length,
  }));

  const monthlyTrend: TrendPoint[] = getMonthKeys(6).map((date) => ({
    label: formatMonthLabel(date),
    customers: customers.filter((customer: DashboardRecord) => {
      const created = parseDate(customer.createdAt);
      return created && created.getFullYear() === date.getFullYear() && created.getMonth() === date.getMonth();
    }).length,
    revenue: sumPayment(
      payments.filter(
        (payment: DashboardRecord) => Number(payment.billingMonth) - 1 === date.getMonth() && Number(payment.billingYear) === date.getFullYear(),
      ),
    ),
    subscriptions: subscriptions.filter((subscription: DashboardRecord) => {
      const start = parseDate(subscription.startDate);
      return subscription.isActive && start && start.getFullYear() === date.getFullYear() && start.getMonth() === date.getMonth();
    }).length,
  }));

  const yearlyTrend: TrendPoint[] = getYearKeys(5).map((date) => ({
    label: String(date.getFullYear()),
    customers: customers.filter((customer: DashboardRecord) => parseDate(customer.createdAt)?.getFullYear() === date.getFullYear()).length,
    revenue: sumPayment(payments.filter((payment: DashboardRecord) => Number(payment.billingYear) === date.getFullYear())),
    subscriptions: subscriptions.filter(
      (subscription: DashboardRecord) => subscription.isActive && parseDate(subscription.startDate)?.getFullYear() === date.getFullYear(),
    ).length,
  }));

  const metrics = {
    day: { customers: dailyCustomers, revenue: dailyRevenue, subscriptions: dailySubscriptions },
    month: { customers: monthlyCustomers, revenue: monthlyRevenue, subscriptions: monthlySubscriptions },
    year: { customers: yearlyCustomers, revenue: yearlyRevenue, subscriptions: yearlySubscriptions },
  }[period];
  const trendData = { day: dailyTrend, month: monthlyTrend, year: yearlyTrend }[period];
  const periodTitle = { day: "Today", month: "This month", year: "This year" }[period];
  const periodDescription = {
    day: "Activity recorded today",
    month: today.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    year: String(currentYear),
  }[period];
  const trendDescription = { day: "Last 7 days", month: "Last 6 months", year: "Last 5 years" }[period];

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const renewalLists = {
    yesterday: subscriptions.filter((subscription: DashboardRecord) => isRenewalOn(subscription.renewalDate, yesterday)),
    today: subscriptions.filter((subscription: DashboardRecord) => isRenewalOn(subscription.renewalDate, today)),
    tomorrow: subscriptions.filter((subscription: DashboardRecord) => isRenewalOn(subscription.renewalDate, tomorrow)),
  };
  const currentRenewals = renewalLists[renewalTab];

  const getCustomerDetails = (subscription: DashboardRecord) => {
    const customer =
      subscription?.customer ||
      customers.find((item: DashboardRecord) => item.customerid === subscription.customerId || item.id === subscription.customerId) ||
      {};
    return {
      name: customer.name || "N/A",
      cnic: customer.cnic || customer.cnic_no || customer.cnicNo || "N/A",
      phone: customer.phone || customer.mobile || "N/A",
    };
  };

  const query = renewalSearch.trim().toLowerCase();
  const filteredRenewals = currentRenewals.filter((subscription: DashboardRecord) => {
    if (!query) return true;
    const customer = getCustomerDetails(subscription);
    return [customer.name, customer.cnic, customer.phone, subscription.product?.name || ""].some((value) =>
      String(value).toLowerCase().includes(query),
    );
  });
  const pageSize = 5;
  const totalRenewalPages = Math.max(1, Math.ceil(filteredRenewals.length / pageSize));
  const safeRenewalPage = Math.min(renewalPage, totalRenewalPages);
  const pagedRenewals = filteredRenewals.slice((safeRenewalPage - 1) * pageSize, safeRenewalPage * pageSize);

  const periodOptions: { key: Period; label: string }[] = [
    { key: "day", label: "Today" },
    { key: "month", label: "This month" },
    { key: "year", label: "This year" },
  ];
  const metricOptions: { key: TrendMetric; label: string }[] = [
    { key: "revenue", label: "Revenue" },
    { key: "customers", label: "Customers" },
    { key: "subscriptions", label: "Starts" },
  ];
  const renewalOptions: { key: typeof renewalTab; label: string; count: number }[] = [
    { key: "yesterday", label: "Yesterday", count: renewalLists.yesterday.length },
    { key: "today", label: "Today", count: renewalLists.today.length },
    { key: "tomorrow", label: "Tomorrow", count: renewalLists.tomorrow.length },
  ];

  return (
    <div className="dashboard-page mx-auto max-w-[1440px] space-y-6 pb-24 text-slate-800 sm:space-y-8 md:pb-4">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="dashboard-link mb-2 text-xs font-semibold uppercase tracking-[0.12em]">M3-Solution · Operations</p>
          <h1 className="dashboard-ink text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">A clear view of customers, revenue and daily operations.</p>
        </div>
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays size={15} aria-hidden="true" />
            <span>{today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
          <Link
            href="/reports"
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#142e5c] px-3 text-xs font-semibold text-white transition hover:bg-[#1d447d]"
          >
            All reports <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-full rounded-lg bg-[#e8edf5] p-1 sm:w-auto" role="group" aria-label="Dashboard period">
          {periodOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              aria-pressed={period === option.key}
              onClick={() => setPeriod(option.key)}
              className={`min-h-9 flex-1 rounded-md px-3 text-xs font-semibold transition sm:flex-none ${
                period === option.key ? "bg-white dashboard-ink shadow-sm" : "text-slate-500 hover:opacity-80"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500">Showing {periodDescription.toLowerCase()}</p>
      </div>

      <section aria-label={`${periodTitle} key metrics`} className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
        <MetricCard label="New customers" value={metrics.customers.toLocaleString()} description={periodDescription} icon={Users} tone="blue" />
        <MetricCard label="Revenue" value={formatCurrency(metrics.revenue)} description={periodDescription} icon={CreditCard} tone="navy" />
        <MetricCard
          label="Subscription starts"
          value={metrics.subscriptions.toLocaleString()}
          description={`Active subscriptions started ${period === "day" ? "today" : period === "month" ? "this month" : "this year"}`}
          icon={Activity}
          tone="orange"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(330px,0.9fr)]">
        <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="dashboard-ink text-base font-bold">Performance trend</h2>
              <p className="mt-1 text-xs text-slate-500">{trendDescription} · select a metric</p>
            </div>
            <div className="flex w-full rounded-md bg-slate-100 p-1 sm:w-auto" role="group" aria-label="Trend metric">
              {metricOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={trendMetric === option.key}
                  onClick={() => setTrendMetric(option.key)}
                  className={`min-h-8 flex-1 rounded px-2 text-[11px] font-semibold transition sm:flex-none ${
                    trendMetric === option.key ? "bg-white dashboard-ink shadow-sm" : "text-slate-500 hover:opacity-80"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <TrendChart data={trendData} metric={trendMetric} />
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="dashboard-ink text-base font-bold">Renewals today</h2>
              <p className="mt-1 text-xs text-slate-500">Customers due for renewal</p>
            </div>
            <span className="dashboard-orange-surface dashboard-orange rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold">{renewalLists.today.length}</span>
          </div>
          <div className="mt-3 divide-y divide-slate-100">
            {renewalLists.today.slice(0, 3).map((subscription: DashboardRecord, index: number) => {
              const customer = getCustomerDetails(subscription);
              return (
                <div key={subscription.subscriptionid || subscription.id || index} className="flex min-w-0 items-center gap-3 py-3">
                  <span className="dashboard-blue-surface dashboard-link grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e5edf9] text-[11px] font-bold">
                    {customer.name.split(/\s+/).map((part: string) => part[0]).slice(0, 2).join("").toUpperCase() || "NA"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-slate-800">{customer.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{subscription.product?.name || "No product"}</p>
                  </div>
                  <span className="dashboard-orange-surface dashboard-orange shrink-0 rounded-full bg-orange-50 px-2 py-1 text-[9px] font-bold uppercase">Today</span>
                </div>
              );
            })}
            {renewalLists.today.length === 0 && <p className="py-5 text-sm text-slate-500">No renewals due today.</p>}
          </div>
          <button
            type="button"
            onClick={() => {
              setRenewalTab("today");
              document.getElementById("renewal-schedule")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="dashboard-link mt-2 inline-flex min-h-9 items-center gap-1 text-xs font-bold hover:opacity-80"
          >
            View today&apos;s renewals <ArrowRight size={14} aria-hidden="true" />
          </button>
        </article>
      </section>

      <section id="renewal-schedule" className="scroll-mt-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="dashboard-ink text-base font-bold">Renewal schedule</h2>
            <p className="mt-1 text-xs text-slate-500">Search customer details across upcoming renewals.</p>
          </div>
          <label className="relative block w-full lg:max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              aria-label="Search renewals by name, CNIC, phone or product"
              placeholder="Search renewals"
              value={renewalSearch}
              onChange={(event) => {
                setRenewalSearch(event.target.value);
                setRenewalPage(1);
              }}
              className="min-h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2468bd] focus:ring-2 focus:ring-blue-100"
            />
          </label>
        </div>

        <div className="mt-4 flex gap-1 overflow-x-auto rounded-md bg-slate-100 p-1" role="tablist" aria-label="Renewal date">
          {renewalOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              role="tab"
              aria-selected={renewalTab === option.key}
              onClick={() => {
                setRenewalTab(option.key);
                setRenewalPage(1);
              }}
              className={`min-h-9 shrink-0 rounded px-3 text-xs font-semibold transition ${
                renewalTab === option.key ? "bg-white dashboard-ink shadow-sm" : "text-slate-500 hover:opacity-80"
              }`}
            >
              {option.label} <span className="ml-1 text-[10px] opacity-70">{option.count}</span>
            </button>
          ))}
        </div>

        <div className="mt-3 hidden overflow-x-auto md:block">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3">Customer</th><th className="px-3 py-3">Product</th><th className="px-3 py-3">Phone</th><th className="px-3 py-3">CNIC</th><th className="px-3 py-3">Renewal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pagedRenewals.map((subscription: DashboardRecord, index: number) => {
                const customer = getCustomerDetails(subscription);
                return (
                  <tr key={subscription.subscriptionid || subscription.id || index} className="text-xs">
                    <td className="px-3 py-3 font-semibold text-slate-800">{customer.name}</td>
                    <td className="px-3 py-3 text-slate-500">{subscription.product?.name || "N/A"}</td>
                    <td className="px-3 py-3 text-slate-500">{customer.phone}</td>
                    <td className="px-3 py-3 text-slate-500">{customer.cnic}</td>
                    <td className="dashboard-orange px-3 py-3 font-semibold">{formatDate(subscription.renewalDate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 space-y-2 md:hidden">
          {pagedRenewals.map((subscription: DashboardRecord, index: number) => {
            const customer = getCustomerDetails(subscription);
            return (
              <article key={subscription.subscriptionid || subscription.id || index} className="rounded-md border border-slate-100 px-3 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-800">{customer.name}</p>
                    <p className="mt-1 truncate text-[11px] text-slate-500">{subscription.product?.name || "N/A"}</p>
                  </div>
                  <span className="dashboard-orange shrink-0 text-[10px] font-semibold">{formatDate(subscription.renewalDate)}</span>
                </div>
                <p className="mt-2 break-words text-[10px] text-slate-500">{customer.phone} <span className="px-1 text-slate-300">·</span> {customer.cnic}</p>
              </article>
            );
          })}
        </div>

        {filteredRenewals.length === 0 && <p className="py-8 text-center text-sm text-slate-500">No renewals match this view.</p>}
        {filteredRenewals.length > 0 && (
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <p className="text-[11px] text-slate-500">{filteredRenewals.length} {filteredRenewals.length === 1 ? "customer" : "customers"}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safeRenewalPage <= 1}
                onClick={() => setRenewalPage((page) => Math.max(1, page - 1))}
                className="grid h-8 w-8 place-items-center rounded border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous renewals page"
              >
                <ArrowDownRight className="rotate-45" size={14} />
              </button>
              <span className="min-w-12 text-center text-[11px] text-slate-600">{safeRenewalPage} / {totalRenewalPages}</span>
              <button
                type="button"
                disabled={safeRenewalPage >= totalRenewalPages}
                onClick={() => setRenewalPage((page) => Math.min(totalRenewalPages, page + 1))}
                className="grid h-8 w-8 place-items-center rounded border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next renewals page"
              >
                <ArrowUpRight className="rotate-45" size={14} />
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="dashboard-ink text-base font-bold">Expenses</h2>
            <p className="mt-1 text-xs text-slate-500">Monthly spend and recent entries</p>
          </div>
          <Link href="/expense" aria-label="View expenses" className="dashboard-orange-surface dashboard-orange grid h-9 w-9 place-items-center rounded-md bg-orange-50 transition hover:bg-orange-100 dark:hover:bg-orange-950">
            <Wallet size={17} />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          <div className="rounded-md bg-slate-50 p-3 sm:p-4">
            <p className="text-[10px] font-semibold uppercase text-slate-500">This month</p>
            <p className="dashboard-ink mt-2 break-words text-base font-bold sm:text-lg">{formatCurrency(monthlyExpenses)}</p>
          </div>
          <div className="dashboard-orange-surface rounded-md bg-orange-50/70 p-3 sm:p-4">
            <p className="dashboard-orange text-[10px] font-semibold uppercase">Pending</p>
            <p className="dashboard-ink mt-2 break-words text-base font-bold sm:text-lg">{formatCurrency(pendingExpenses)}</p>
          </div>
          <div className="col-span-2 rounded-md bg-slate-50 p-3 sm:p-4 lg:col-span-1">
            <p className="text-[10px] font-semibold uppercase text-slate-500">Recent records</p>
            <p className="dashboard-ink mt-2 text-base font-bold sm:text-lg">{recentExpenses.length}</p>
          </div>
        </div>
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700">Recent entries</h3>
            <Link href="/expense" className="dashboard-link text-[11px] font-semibold hover:opacity-80">All expenses</Link>
          </div>
          {recentExpenses.length === 0 ? (
            <p className="rounded-md bg-slate-50 px-3 py-4 text-xs text-slate-500">No expense records available yet.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentExpenses.map((expense: DashboardRecord, index: number) => (
                <div key={expense.id || index} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-800">{String(expense.title || "Expense")}</p>
                    <p className="mt-1 truncate text-[10px] text-slate-500">{String(expense.category || "Uncategorized")} · {String(expense.status || "Unspecified")} · {formatDate(expense.expenseDate || expense.createdAt)}</p>
                  </div>
                  <p className="dashboard-ink shrink-0 text-xs font-bold">{formatCurrency(Number(expense.amount || 0))}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-4 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-4px_16px_rgba(20,46,92,0.06)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 md:hidden">
        <Link href="/dashboard" className="dashboard-link flex min-h-12 flex-col items-center justify-center gap-1" aria-current="page">
          <Activity size={17} /><span className="text-[9px] font-bold">Home</span>
        </Link>
        <Link href="/customer" className="flex min-h-12 flex-col items-center justify-center gap-1 text-slate-500 hover:opacity-80">
          <Users size={17} /><span className="text-[9px] font-medium">Customers</span>
        </Link>
        <Link href="/payment" className="flex min-h-12 flex-col items-center justify-center gap-1 text-slate-500 hover:opacity-80">
          <CreditCard size={17} /><span className="text-[9px] font-medium">Payments</span>
        </Link>
        <Link href="/reports" className="flex min-h-12 flex-col items-center justify-center gap-1 text-slate-500 hover:opacity-80">
          <ArrowRight size={17} /><span className="text-[9px] font-medium">Reports</span>
        </Link>
      </nav>
    </div>
  );
}