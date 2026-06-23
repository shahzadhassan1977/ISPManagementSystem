"use client";

import { usePathname } from "next/navigation";
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

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-gray-500 text-sm">
              {description}
            </p>
          )}
        </div>

        {showAction ? action : null}
      </div>

      {/* CONTENT CARD */}
      <div className="bg-white rounded-xl shadow p-4">
        {!authorized ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            You do not have permission to view this page.
          </div>
        ) : (
          children
        )}
      </div>

    </div>
  );
}