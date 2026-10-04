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
import { useAuthStore } from "@/core/store/auth.store";
import { canAccessPage } from "@/utils/auth";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  const [openAdmin, setOpenAdmin] = useState(false);
  const [openSales, setOpenSales] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  const isActive = (path: string) => pathname === path;

  const showDashboard = canAccessPage(user, "/dashboard");
  const showCompany = canAccessPage(user, "/company");
  const showPermission = canAccessPage(user, "/permission");
  const showRole = canAccessPage(user, "/role");
  const showUser = canAccessPage(user, "/user");
  const showEmployee = canAccessPage(user, "/employee");
  const showArea = canAccessPage(user, "/area");
  const showSubarea = canAccessPage(user, "/subarea");
  const showCustomer = canAccessPage(user, "/customer");
  const showProduct = canAccessPage(user, "/product");
  const showSubscription = canAccessPage(user, "/subscription");
  const showPayment = canAccessPage(user, "/payment");
  const showExpense = canAccessPage(user, "/expense");
  const showRepCustomerInvoice = canAccessPage(user, "/repCustomerInvoice");
  const showCustomerReport = canAccessPage(user, "/reports/customer");
  const showReportsHome = canAccessPage(user, "/reports");
  const showDailyReports = canAccessPage(user, "/reports/daily");
  const showRevenueReports = canAccessPage(user, "/reports/revenue");
  const showMonthlyReports = canAccessPage(user, "/reports/monthly");
  const showYearlyReports = canAccessPage(user, "/reports/yearly");
  const showEmployeeWiseReports = canAccessPage(user, "/reports/employee-wise");
  const showProductWiseReports = canAccessPage(user, "/reports/product-wise");
  const showExpenseReports = canAccessPage(user, "/reports/expenses");
  const showSetting = canAccessPage(user, "/setting");

  const showAdminSection =
    showCompany ||
    showPermission ||
    showRole ||
    showUser ||
    showEmployee ||
    showArea ||
    showSubarea;

  const showSalesSection =
    showCustomer || showProduct || showSubscription || showPayment || showExpense;

  const showReportsSection =
    showRepCustomerInvoice ||
    showReportsHome ||
    showDailyReports ||
    showRevenueReports ||
    showMonthlyReports ||
    showYearlyReports ||
    showEmployeeWiseReports ||
    showProductWiseReports ||
    showExpenseReports;

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto bg-[#102f66] text-white transition duration-300 md:static md:translate-x-0 md:w-64 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0b2149] p-4 md:justify-center">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0" role="img" aria-label="M3-Solution">
              <rect width="48" height="48" rx="9" fill="#ffffff" />
              <path d="M6 37V11l13 13 12-13v26h-9V28l-4 4-5-4v9z" fill="#1768bd" />
              <path d="M31 12h15L37 24c8-1 11 3 11 7 0 6-5 9-12 9-5 0-9-1-12-4l5-6c2 2 4 3 7 3 2 0 3-1 3-2s-2-2-5-2h-4l5-9h-9z" fill="#f28a16" />
            </svg>
            <div className="leading-tight">
              <span className="block text-sm font-bold tracking-normal text-white">M3-Solution</span>
              <span className="mt-1 block text-[9px] font-medium tracking-[0.12em] text-blue-200">ISP MANAGEMENT</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-white/10 p-2 transition hover:bg-white/20 md:hidden"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="p-2 space-y-1">
        {showDashboard && (
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 rounded-md p-2 transition hover:bg-white/10 ${
              isActive("/dashboard") ? "bg-[#1f447f] shadow-[inset_3px_0_0_#f28a16]" : ""
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
        )}

        {showAdminSection && (
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
                {showCompany && (
                  <Link
                    href="/company"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Company
                  </Link>
                )}
                {showPermission && (
                  <Link
                    href="/permission"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Application Permission
                  </Link>
                )}
                {showRole && (
                  <Link
                    href="/role"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Application Role
                  </Link>
                )}
                {showUser && (
                  <Link
                    href="/user"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Application User
                  </Link>
                )}
                {showEmployee && (
                  <Link
                    href="/employee"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Employees
                  </Link>
                )}
                {showArea && (
                  <Link
                    href="/area"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Area
                  </Link>
                )}
                {showSubarea && (
                  <Link
                    href="/subarea"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    SubArea
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {showSalesSection && (
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
                {showCustomer && (
                  <Link
                    href="/customer"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Customers
                  </Link>
                )}
                {showProduct && (
                  <Link
                    href="/product"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Products & Detail
                  </Link>
                )}
                {showSubscription && (
                  <Link
                    href="/subscription"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Subscriptions
                  </Link>
                )}
                {showPayment && (
                  <Link
                    href="/payment"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Payments & Billing
                  </Link>
                )}
                {showExpense && (
                  <Link
                    href="/expense"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Expenses
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {showReportsSection && (
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
                {showReportsHome && (
                  <Link
                    href="/reports"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Reports Home
                  </Link>
                )}                                
                {showDailyReports && (
                  <Link
                    href="/reports/daily"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Daily Reports
                  </Link>
                )}
                {showMonthlyReports && (
                  <Link
                    href="/reports/monthly"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Monthly Reports
                  </Link>
                )}
                {showYearlyReports && (
                  <Link
                    href="/reports/yearly"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Yearly Reports
                  </Link>
                )}
                {showRepCustomerInvoice && (
                  <Link
                    href="/repCustomerInvoice"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Customers Invoice
                  </Link>
                )}
                {showCustomerReport && (
                  <Link
                    href="/reports/customer"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Customer Report
                  </Link>
                )}
                {showRevenueReports && (
                  <Link
                    href="/reports/revenue"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Revenue Report
                  </Link>
                )}                
                {showEmployeeWiseReports && (
                  <Link
                    href="/reports/employee-wise"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Employee Report
                  </Link>
                )}
                {showProductWiseReports && (
                  <Link
                    href="/reports/product-wise"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Product Report
                  </Link>
                )}
                {showExpenseReports && (
                  <Link
                    href="/reports/expenses"
                    className="block p-2 hover:bg-white/10 rounded"
                  >
                    Expense Report
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {/* SETTINGS */}
        {showSetting && (
          <Link
            href="/setting"
            className="flex items-center gap-2 p-2 rounded hover:bg-white/10"
          >
            <Settings size={18} />
            Settings
          </Link>
        )}

      </nav>
    </aside>
    </>
  );
}