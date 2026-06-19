"use client";

import Link from "next/link";
import { useCustomers } from "@/modules/customer/hooks/useCustomers";
import { usePayments } from "@/modules/payment/hooks/usePayments";
import { useSubscriptions } from "@/modules/subscription/hooks/useSubscription";
import { Users, CreditCard, Activity, BarChart3 } from "lucide-react";

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

const formatCurrency = (value: number) => `Rs.${value.toFixed(2)}`;

const barPercentage = (value: number, max: number) => {
  if (max === 0) return "10%";
  return `${Math.max(10, Math.round((value / max) * 100))}%`;
};

export default function DashboardPage() {
  const { data: customers = [] } = useCustomers();
  const { data: payments = [] } = usePayments();
  const { data: subscriptions = [] } = useSubscriptions();

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

  const chartMax = Math.max(
    ...dailyTrend.map((item) => Math.max(item.customers, item.revenue, item.subscriptions)),
    10
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { title: "Customer Growth", data: dailyTrend.map((item) => item.customers), color: "bg-blue-600" },
            { title: "Revenue Trend", data: dailyTrend.map((item) => item.revenue), color: "bg-emerald-600" },
            { title: "Subscription Starts", data: dailyTrend.map((item) => item.subscriptions), color: "bg-sky-600" },
          ].map((metric) => (
            <div key={metric.title} className="bg-white rounded-3xl shadow p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <p className="text-lg font-semibold">{metric.data.reduce((sum, value) => sum + value, 0)}</p>
                </div>
                <BarChart3 className="text-slate-400" size={24} />
              </div>

              <div className="space-y-3">
                {dailyTrend.map((item, index) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{item.label}</span>
                      <span>{metric.data[index]}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`${metric.color} h-full rounded-full`}
                        style={{ width: barPercentage(metric.data[index], chartMax) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { title: "Customer Growth", data: monthlyTrend.map((item) => item.customers), color: "bg-blue-600" },
            { title: "Revenue Trend", data: monthlyTrend.map((item) => item.revenue), color: "bg-emerald-600" },
            { title: "Subscription Starts", data: monthlyTrend.map((item) => item.subscriptions), color: "bg-sky-600" },
          ].map((metric) => (
            <div key={metric.title} className="bg-white rounded-3xl shadow p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <p className="text-lg font-semibold">{metric.data.reduce((sum, value) => sum + value, 0)}</p>
                </div>
                <BarChart3 className="text-slate-400" size={24} />
              </div>

              <div className="space-y-3">
                {monthlyTrend.map((item, index) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{item.label}</span>
                      <span>{metric.data[index]}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`${metric.color} h-full rounded-full`}
                        style={{ width: barPercentage(metric.data[index], chartMax) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            { title: "Customer Growth", data: yearlyTrend.map((item) => item.customers), color: "bg-blue-600" },
            { title: "Revenue Trend", data: yearlyTrend.map((item) => item.revenue), color: "bg-emerald-600" },
            { title: "Subscription Starts", data: yearlyTrend.map((item) => item.subscriptions), color: "bg-sky-600" },
          ].map((metric) => (
            <div key={metric.title} className="bg-white rounded-3xl shadow p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <p className="text-lg font-semibold">{metric.data.reduce((sum, value) => sum + value, 0)}</p>
                </div>
                <BarChart3 className="text-slate-400" size={24} />
              </div>

              <div className="space-y-3">
                {yearlyTrend.map((item, index) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{item.label}</span>
                      <span>{metric.data[index]}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`${metric.color} h-full rounded-full`}
                        style={{ width: barPercentage(metric.data[index], chartMax) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
