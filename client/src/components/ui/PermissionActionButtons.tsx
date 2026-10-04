"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useAuthStore } from "@/core/store/auth.store";
import { canPerformAction } from "@/utils/auth";

type PermissionActionButtonsProps = {
  pagePermission: string;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  viewLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  className?: string;
};

export default function PermissionActionButtons({
  pagePermission,
  onView,
  onEdit,
  onDelete,
  viewLabel = "View",
  editLabel = "Edit",
  deleteLabel = "Delete",
  className = "flex flex-wrap items-center gap-1",
}: PermissionActionButtonsProps) {
  const user = useAuthStore((s) => s.user);

  const canView = !!onView && canPerformAction(user, pagePermission, "view");
  const canEdit = !!onEdit && canPerformAction(user, pagePermission, "edit");
  const canDelete = !!onDelete && canPerformAction(user, pagePermission, "delete");

  if (!canView && !canEdit && !canDelete) {
    return null;
  }

  return (
    <div className={className}>
      {canView ? (
        <button
          type="button"
          onClick={onView}
          className="grid h-9 w-9 place-items-center rounded-md text-[#245fae] transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:text-blue-300 dark:hover:bg-blue-950"
          aria-label={viewLabel}
          title={viewLabel}
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{viewLabel}</span>
        </button>
      ) : null}

      {canEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="grid h-9 w-9 place-items-center rounded-md text-amber-700 transition hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:text-amber-300 dark:hover:bg-amber-950"
          aria-label={editLabel}
          title={editLabel}
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{editLabel}</span>
        </button>
      ) : null}

      {canDelete ? (
        <button
          type="button"
          onClick={onDelete}
          className="grid h-9 w-9 place-items-center rounded-md text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 dark:text-red-400 dark:hover:bg-red-950"
          aria-label={deleteLabel}
          title={deleteLabel}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{deleteLabel}</span>
        </button>
      ) : null}
    </div>
  );
}
