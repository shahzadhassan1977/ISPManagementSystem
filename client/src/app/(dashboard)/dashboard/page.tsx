"use client";

import Link from "next/link";
import { useCustomers } from "@/modules/customer/hooks/useCustomers";
import { usePayments } from "@/modules/payment/hooks/usePayments";
import { useSubscriptions } from "@/modules/subscription/hooks/useSubscription";
import { useExpenses } from "@/modules/expense/hooks/useExpenses";
import { Users, CreditCard, Activity, Wallet } from "lucide-react";

const parseDate = (value: any) => (value ? new Date(value) : null);

const isSameDay = (value: any, compare: Date) => {
  const date = parseDate(value);
  return (
    date &&
    date.getFullYear() === compare.getFullYear() &&
    date.getMonth() === compare.getMonth() &&
    date.getDate() === compare.getDate()
  );
};

const getDateKeys = (days: number) => {
  const today = new Date();
  return Array.from({ length: days }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - 1 - index));
    return date;
  });
};

const getMonthKeys = (months: number) => {
  const today = new Date();
  return Array.from({ length: months }).map((_, index) => {
    const date = new Date(today);
    date.setMonth(today.getMonth() - (months - 1 - index));
    return date;
  });
};

const getYearKeys = (years: number) => {
  const today = new Date();
  return Array.from({ length: years }).map((_, index) => {
    const date = new Date(today);
    date.setFullYear(today.getFullYear() - (years - 1 - index));
    return date;
  });
};

const formatDayLabel = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

const formatMonthLabel = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", year: "numeric" });

const formatDate = (value: any) => {
  if (!value) return "N/A";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString("en-GB");
};

const formatCurrency = (value: number) => `Rs.${value.toFixed(2)}`;

type MetricChartType = "bar" | "line" | "pie";

type MetricChartCardProps = {
  title: string;
  type: MetricChartType;
  data: number[];
  labels: string[];
  color: string;
};

const MetricChartCard = ({ title, type, data, labels, color }: MetricChartCardProps) => {
  const safeData = data.length > 0 ? data : [0];
  const maxValue = Math.max(...safeData, 1);
  const total = safeData.reduce((sum, value) => sum + value, 0);

  const renderBarChart = () => (
    <div className="mt-4">
      <svg viewBox="0 0 260 120" className="h-32 w-full">
        {[0, 0.25, 0.5, 0.75, 1].map((value) => (
          <line
            key={value}
            x1="16"
            x2="244"
            y1={18 + value * 84}
            y2={18 + value * 84}
            stroke="#e2e8f0"
            strokeDasharray="4 4"
          />
        ))}
        {safeData.map((value, index) => {
          const barHeight = maxValue === 0 ? 0 : (value / maxValue) * 70;
          const x = 24 + index * 36;
          const y = 90 - barHeight;
          return (
            <g key={`${title}-${labels[index]}`}>
              <rect x={x} y={y} width="24" height={barHeight} rx="6" fill={color} opacity="0.9" />
              <text x={x + 12} y="108" textAnchor="middle" fontSize="10" fill="#64748b">
                {labels[index]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );

  const renderLineChart = () => {
    const width = 240;
    const height = 120;
    const padding = 20;
    const innerWidth = width - padding * 2;
    const innerHeight = height - padding * 2;
    const points = safeData.map((value, index) => {
      const x = padding + (index / Math.max(safeData.length - 1, 1)) * innerWidth;
      const y = padding + innerHeight - (value / maxValue) * innerHeight;
      return `${x},${y}`;
    });

    return (
      <div className="mt-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-32 w-full">
          {[0, 0.25, 0.5, 0.75, 1].map((value) => (
            <line
              key={value}
              x1={padding}
              x2={width - padding}
              y1={padding + value * innerHeight}
              y2={padding + value * innerHeight}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
          ))}
          <polyline points={points.join(" ")} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
          {safeData.map((value, index) => {
            const x = padding + (index / Math.max(safeData.length - 1, 1)) * innerWidth;
            const y = padding + innerHeight - (value / maxValue) * innerHeight;
            return <circle key={`${title}-${labels[index]}`} cx={x} cy={y} r="4" fill={color} />;
          })}
        </svg>
      </div>
    );
  };

  const renderPieChart = () => {
    const size = 140;
    const radius = 44;
    const center = size / 2;
    let currentAngle = -Math.PI / 2;
    const totalValue = safeData.reduce((sum, value) => sum + value, 0);

    const createSlicePath = (start: number, end: number) => {
      const startX = center + radius * Math.cos(start);
      const startY = center + radius * Math.sin(start);
      const endX = center + radius * Math.cos(end);
      const endY = center + radius * Math.sin(end);
      const largeArc = end - start > Math.PI ? 1 : 0;
      return `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} Z`;
    };

    return (
      <div className="mt-4 flex flex-col items-center gap-3">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-36 w-36">
          {safeData.map((value, index) => {
            if (value <= 0) return null;
            const sliceAngle = (value / Math.max(totalValue, 1)) * Math.PI * 2;
            const startAngle = currentAngle;
            const endAngle = currentAngle + sliceAngle;
            currentAngle = endAngle;
            return <path key={`${title}-${labels[index]}`} d={createSlicePath(startAngle, endAngle)} fill={color} opacity="0.8" />;
          })}
          <circle cx={center} cy={center} r="24" fill="#fff" />
        </svg>
        <div className="flex flex-wrap justify-center gap-2 text-[11px] text-gray-500">
          {labels.map((label, index) => (
            <span key={`${label}-${index}`} className="rounded-full bg-slate-100 px-2 py-1">
              {label}: {safeData[index]}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-semibold">{total}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">{type}</div>
      </div>
      {type === "bar" && renderBarChart()}
      {type === "line" && renderLineChart()}
      {type === "pie" && renderPieChart()}
    </div>
  );
};

export default function DashboardPage() {
  const { data: customers = [] } = useCustomers();
  const { data: payments = [] } = usePayments();
  const { data: subscriptions = [] } = useSubscriptions();
  const { data: expenses = [] } = useExpenses();

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const dailyCustomers = customers.filter((customer: any) => isSameDay(customer.createdAt, today)).length;
  const dailyRevenue = payments
    .filter((payment: any) => isSameDay(payment.createdAt, today))
    .reduce(
      (sum: number, payment: any) =>
        sum + Number(payment.amount || 0) + Number(payment.otherAmount || 0),
      0
    );
  const dailySubscriptions = subscriptions.filter(
    (subscription: any) => subscription.isActive && isSameDay(subscription.startDate, today)
  ).length;

  const monthlyCustomers = customers.filter((customer: any) => {
    const date = parseDate(customer.createdAt);
    return date && date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  }).length;
  const monthlyRevenue = payments
    .filter(
      (payment: any) =>
        Number(payment.billingMonth) - 1 === currentMonth && Number(payment.billingYear) === currentYear
    )
    .reduce(
      (sum: number, payment: any) =>
        sum + Number(payment.amount || 0) + Number(payment.otherAmount || 0),
      0
    );
  const monthlySubscriptions = subscriptions.filter((subscription: any) => {
    const date = parseDate(subscription.startDate);
    return subscription.isActive && date && date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  }).length;

  const yearlyCustomers = customers.filter((customer: any) => {
    const date = parseDate(customer.createdAt);
    return date && date.getFullYear() === currentYear;
  }).length;
  const yearlyRevenue = payments
    .filter((payment: any) => Number(payment.billingYear) === currentYear)
    .reduce(
      (sum: number, payment: any) =>
        sum + Number(payment.amount || 0) + Number(payment.otherAmount || 0),
      0
    );
  const yearlySubscriptions = subscriptions.filter((subscription: any) => {
    const date = parseDate(subscription.startDate);
    return subscription.isActive && date && date.getFullYear() === currentYear;
  }).length;

  const monthlyExpenses = expenses
    .filter((expense: any) => {
      const date = parseDate(expense.expenseDate);
      return date && date.getFullYear() === currentYear && date.getMonth() === currentMonth;
    })
    .reduce((sum: number, expense: any) => sum + Number(expense.amount || 0), 0);

  const pendingExpenses = expenses
    .filter((expense: any) => ["Pending", "OnHold", "InProcess"].includes(expense.status))
    .reduce((sum: number, expense: any) => sum + Number(expense.amount || 0), 0);

  const recentExpenses = [...expenses]
    .sort((a: any, b: any) => new Date(b.expenseDate || b.createdAt).getTime() - new Date(a.expenseDate || a.createdAt).getTime())
    .slice(0, 5);

  const dailyTrend = getDateKeys(7).map((date) => ({
    label: formatDayLabel(date),
    customers: customers.filter((customer: any) => isSameDay(customer.createdAt, date)).length,
    revenue: payments
      .filter((payment: any) => isSameDay(payment.createdAt, date))
      .reduce(
        (sum: number, payment: any) =>
          sum + Number(payment.amount || 0) + Number(payment.otherAmount || 0),
        0
      ),
    subscriptions: subscriptions.filter(
      (subscription: any) => subscription.isActive && isSameDay(subscription.startDate, date)
    ).length,
  }));

  const monthlyTrend = getMonthKeys(6).map((date) => ({
    label: formatMonthLabel(date),
    customers: customers.filter((customer: any) => {
      const created = parseDate(customer.createdAt);
      return created && created.getFullYear() === date.getFullYear() && created.getMonth() === date.getMonth();
    }).length,
    revenue: payments
      .filter(
        (payment: any) =>
          Number(payment.billingMonth) - 1 === date.getMonth() && Number(payment.billingYear) === date.getFullYear()
      )
      .reduce(
        (sum: number, payment: any) =>
          sum + Number(payment.amount || 0) + Number(payment.otherAmount || 0),
        0
      ),
    subscriptions: subscriptions.filter((subscription: any) => {
      const start = parseDate(subscription.startDate);
      return (
        subscription.isActive &&
        start &&
        start.getFullYear() === date.getFullYear() &&
        start.getMonth() === date.getMonth()
      );
    }).length,
  }));

  const yearlyTrend = getYearKeys(5).map((date) => ({
    label: String(date.getFullYear()),
    customers: customers.filter((customer: any) => {
      const created = parseDate(customer.createdAt);
      return created && created.getFullYear() === date.getFullYear();
    }).length,
    revenue: payments
      .filter((payment: any) => Number(payment.billingYear) === date.getFullYear())
      .reduce(
        (sum: number, payment: any) =>
          sum + Number(payment.amount || 0) + Number(payment.otherAmount || 0),
        0
      ),
    subscriptions: subscriptions.filter((subscription: any) => {
      const start = parseDate(subscription.startDate);
      return subscription.isActive && start && start.getFullYear() === date.getFullYear();
    }).length,
  }));

  const renderMetricCards = (metrics: MetricChartCardProps[]) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <MetricChartCard key={metric.title} {...metric} />
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Daily, monthly, and yearly customer, revenue, and subscription analytics.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Reports Home", href: "/reports", label: "All reports" },
          { title: "Daily Reports", href: "/reports/daily", label: "Today’s metrics" },
          { title: "Monthly Reports", href: "/reports/monthly", label: "This month" },
          { title: "Yearly Reports", href: "/reports/yearly", label: "This year" },
        ].map((report) => (
          <Link
            key={report.href}
            href={report.href}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm text-gray-500">{report.label}</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{report.title}</p>
          </Link>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Daily Overview</p>
            <h2 className="text-2xl font-semibold">Today&apos;s Metrics</h2>
          </div>
          <div className="text-sm text-gray-600">
            {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl shadow p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">New Customers</p>
                <p className="text-3xl font-semibold">{dailyCustomers}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">New customers registered today.</p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-3xl font-semibold">{formatCurrency(dailyRevenue)}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Revenue collected from today&apos;s payments.</p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-sky-100 text-sky-600 rounded-2xl">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Subscriptions</p>
                <p className="text-3xl font-semibold">{dailySubscriptions}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Active subscriptions started today.</p>
          </div>
        </div>

        {renderMetricCards([
          {
            title: "Customer Growth",
            type: "bar",
            data: dailyTrend.map((item) => item.customers),
            labels: dailyTrend.map((item) => item.label),
            color: "#2563eb",
          },
          {
            title: "Revenue Trend",
            type: "line",
            data: dailyTrend.map((item) => item.revenue),
            labels: dailyTrend.map((item) => item.label),
            color: "#10b981",
          },
          {
            title: "Subscription Starts",
            type: "pie",
            data: dailyTrend.map((item) => item.subscriptions),
            labels: dailyTrend.map((item) => item.label),
            color: "#38bdf8",
          },
        ])}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Monthly Overview</p>
            <h2 className="text-2xl font-semibold">This Month</h2>
          </div>
          <div className="text-sm text-gray-600">{formatMonthLabel(today)}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl shadow p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">New Customers</p>
                <p className="text-3xl font-semibold">{monthlyCustomers}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Metric for current month.</p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-3xl font-semibold">{formatCurrency(monthlyRevenue)}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Metric for current month.</p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-sky-100 text-sky-600 rounded-2xl">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Subscriptions</p>
                <p className="text-3xl font-semibold">{monthlySubscriptions}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Metric for current month.</p>
          </div>
        </div>

        {renderMetricCards([
          {
            title: "Customer Growth",
            type: "bar",
            data: monthlyTrend.map((item) => item.customers),
            labels: monthlyTrend.map((item) => item.label),
            color: "#2563eb",
          },
          {
            title: "Revenue Trend",
            type: "line",
            data: monthlyTrend.map((item) => item.revenue),
            labels: monthlyTrend.map((item) => item.label),
            color: "#10b981",
          },
          {
            title: "Subscription Starts",
            type: "pie",
            data: monthlyTrend.map((item) => item.subscriptions),
            labels: monthlyTrend.map((item) => item.label),
            color: "#38bdf8",
          },
        ])}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Yearly Overview</p>
            <h2 className="text-2xl font-semibold">This Year</h2>
          </div>
          <div className="text-sm text-gray-600">{today.getFullYear()}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl shadow p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                <Users size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">New Customers</p>
                <p className="text-3xl font-semibold">{yearlyCustomers}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Metric for the current year.</p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-3xl font-semibold">{formatCurrency(yearlyRevenue)}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Metric for the current year.</p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6 border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-sky-100 text-sky-600 rounded-2xl">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Subscriptions</p>
                <p className="text-3xl font-semibold">{yearlySubscriptions}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Metric for the current year.</p>
          </div>
        </div>

        {renderMetricCards([
          {
            title: "Customer Growth",
            type: "bar",
            data: yearlyTrend.map((item) => item.customers),
            labels: yearlyTrend.map((item) => item.label),
            color: "#2563eb",
          },
          {
            title: "Revenue Trend",
            type: "line",
            data: yearlyTrend.map((item) => item.revenue),
            labels: yearlyTrend.map((item) => item.label),
            color: "#10b981",
          },
          {
            title: "Subscription Starts",
            type: "pie",
            data: yearlyTrend.map((item) => item.subscriptions),
            labels: yearlyTrend.map((item) => item.label),
            color: "#38bdf8",
          },
        ])}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Expense Overview</p>
            <h2 className="text-2xl font-semibold">Business spend this month</h2>
          </div>
          <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
            <Wallet size={20} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">This month</p>
            <p className="mt-2 text-2xl font-semibold">{formatCurrency(monthlyExpenses)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="mt-2 text-2xl font-semibold">{formatCurrency(pendingExpenses)}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">Recent entries</p>
            <p className="mt-2 text-2xl font-semibold">{recentExpenses.length}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">Recent expenses</h3>
          <div className="mt-3 space-y-2">
            {recentExpenses.length === 0 ? (
              <p className="text-sm text-gray-500">No expense records available yet.</p>
            ) : (
              recentExpenses.map((expense: any) => (
                <div key={expense.id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-sm text-gray-500">{expense.category} • {expense.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(Number(expense.amount || 0))}</p>
                    <p className="text-sm text-gray-500">{formatDate(expense.expenseDate || expense.createdAt)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
