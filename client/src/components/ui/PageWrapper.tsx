"use client";

import { usePathname } from "next/navigation";
import { cloneElement, isValidElement, type ReactElement } from "react";
import { useAuthStore } from "@/core/store/auth.store";
import {
  canAccessPage,
  canPerformAction,
  getPagePermissionFromPathname,
} from "@/utils/auth";

export default function PageWrapper({
  title,
  description,
  action,
  pagePermission,
  actionPermission,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  pagePermission?: string;
  actionPermission?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const permissionKey = pagePermission ?? getPagePermissionFromPathname(pathname);
  const authorized = canAccessPage(user, permissionKey);
  const showAction = action && canPerformAction(user, permissionKey, actionPermission);
  const actionElement = isValidElement(action)
    ? (action as ReactElement<{ className?: string }>)
    : null;
  const pageAction = actionElement
    ? cloneElement(actionElement, {
        className: [
          actionElement.props.className,
          "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-transparent bg-[#142e5c] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d447d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus-visible:ring-blue-900",
        ]
          .filter(Boolean)
          .join(" "),
      })
    : action;

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-5 sm:space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#245fae] dark:text-blue-300">M3-Solution · Management</p>
          <h1 className="text-xl font-bold text-[#142e5c] dark:text-blue-100 sm:text-2xl">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        {showAction ? <div className="shrink-0">{pageAction}</div> : null}
      </header>

      <div>
        {!authorized ? (
          <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            You do not have permission to view this page. Contact an administrator if you believe you should have access.
          </div>
        ) : (
          children
        )}
      </div>

    </div>
  );
}