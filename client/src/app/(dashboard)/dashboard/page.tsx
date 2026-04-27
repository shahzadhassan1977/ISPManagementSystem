"use client";

import {
  Users,
  Wifi,
  CreditCard,
  AlertCircle,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Customers", value: "1,240", icon: Users },
    { label: "Active Connections", value: "1,102", icon: Wifi },
    { label: "Monthly Revenue", value: "$12,400", icon: CreditCard },
    { label: "Open Tickets", value: "23", icon: AlertCircle },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Welcome to ISP Management System
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 flex items-center gap-4"
          >
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <s.icon />
            </div>

            <div>
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CHART PLACEHOLDER */}
      <div className="bg-white rounded-xl shadow p-6 h-64">
        <h2 className="font-semibold mb-2">Network Usage</h2>
        <div className="text-gray-400">Chart will be integrated here</div>
      </div>
    </div>
  );
}