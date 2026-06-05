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
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [openAdmin, setOpenAdmin] = useState(false);
  const [openSales, setOpenSales] = useState(false);

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

              <Link href="/user" className="block p-2 hover:bg-white/10 rounded">
                Application Users & Roles
              </Link>

              <Link href="/employee" className="block p-2 hover:bg-white/10 rounded">
                Employees & Subarea
              </Link>

              <Link href="/area" className="block p-2 hover:bg-white/10 rounded">
                Area & SubArea
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