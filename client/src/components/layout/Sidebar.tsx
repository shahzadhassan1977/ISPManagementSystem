"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  ChevronDown,
  FileBadge,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [openAdmin, setOpenAdmin] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-slate-900 text-white h-full">

      {/* HEADER */}
      <div className="p-4 font-bold text-lg border-b border-white/10">
        ISP Panel
      </div>

      <nav className="p-2 space-y-1">

        {/* DASHBOARD */}
        <Link
          href="/dashboard"
          className={`flex items-center gap-2 p-2 rounded hover:bg-white/10 ${
            isActive("/dashboard") ? "bg-blue-600" : ""
          }`}
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        {/* ADMIN */}
        <div>
          <button
            onClick={() => setOpenAdmin(!openAdmin)}
            className="flex items-center justify-between w-full p-2 hover:bg-white/10 rounded"
          >
            <span className="flex items-center gap-2">
              <Users size={18} />
              Admin
            </span>
            <ChevronDown size={16} />
          </button>

          {openAdmin && (
            <div className="ml-6 space-y-1 mt-1">

              <Link href="/company" className="block p-2 hover:bg-white/10 rounded">
                Company
              </Link>              

              <Link href="/permission" className="block p-2 hover:bg-white/10 rounded">
                Application Permission
              </Link>

              <Link href="/role" className="block p-2 hover:bg-white/10 rounded">
                Application Role
              </Link>

              <Link href="/user" className="block p-2 hover:bg-white/10 rounded">
                Application User
              </Link>              

              <Link href="/employee" className="block p-2 hover:bg-white/10 rounded">
                Employees
              </Link>

              <Link href="/area" className="block p-2 hover:bg-white/10 rounded">
                Area
              </Link>

              <Link href="/subarea" className="block p-2 hover:bg-white/10 rounded">
                SubArea
              </Link>

            </div>
          )}
        </div>

        {/* SALES */}
        <div>
          <button
            onClick={() => setOpenSales(!openSales)}
            className="flex items-center justify-between w-full p-2 hover:bg-white/10 rounded"
          >
            <span className="flex items-center gap-2">
              <CreditCard size={18} />
              Sales & Billing
            </span>
            <ChevronDown size={16} />
          </button>

          {openSales && (
            <div className="ml-6 space-y-1 mt-1">

              <Link href="/customer" className="block p-2 hover:bg-white/10 rounded">
                Customers
              </Link>

              <Link href="/product" className="block p-2 hover:bg-white/10 rounded">
                Products & Detail
              </Link>

              <Link href="/subscription" className="block p-2 hover:bg-white/10 rounded">
                Subscriptions
              </Link>

              <Link href="/payment" className="block p-2 hover:bg-white/10 rounded">
                Payments & Billing
              </Link>

            </div>
          )}
        </div>

        {/* Reports */}
        <div>
          <button
            onClick={() => setOpenReports(!openReports)}
            className="flex items-center justify-between w-full p-2 hover:bg-white/10 rounded"
          >
            <span className="flex items-center gap-2">              
              <FileBadge size={18} />
              Reports
            </span>
            <ChevronDown size={16} />
          </button>

          {openReports && (
            <div className="ml-6 space-y-1 mt-1">

              <Link href="/repCustomerInvoice" className="block p-2 hover:bg-white/10 rounded">
                Customers Invoice
              </Link>

              <Link href="/reports" className="block p-2 hover:bg-white/10 rounded">
                Reports Home
              </Link>

              <Link href="/reports/daily" className="block p-2 hover:bg-white/10 rounded">
                Daily Reports
              </Link>

              <Link href="/reports/monthly" className="block p-2 hover:bg-white/10 rounded">
                Monthly Reports
              </Link>

              <Link href="/reports/yearly" className="block p-2 hover:bg-white/10 rounded">
                Yearly Reports
              </Link>

              <Link href="/reports/employee-wise" className="block p-2 hover:bg-white/10 rounded">
                Employee Wise Report
              </Link>

              <Link href="/reports/product-wise" className="block p-2 hover:bg-white/10 rounded">
                Product Wise Report
              </Link>
            </div>
          )}

        </div>

        {/* SETTINGS */}
        <Link
          href="/setting"
          className="flex items-center gap-2 p-2 rounded hover:bg-white/10"
        >
          <Settings size={18} />
          Settings
        </Link>

      </nav>
    </aside>
  );
}