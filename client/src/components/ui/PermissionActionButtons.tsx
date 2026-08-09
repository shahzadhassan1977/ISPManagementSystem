"use client";

import { Eye, Edit3, Trash2 } from "lucide-react";
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
  className = "flex flex-wrap gap-2",
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
          className="text-blue-500 hover:text-blue-700"
          aria-label={viewLabel}
          title={viewLabel}
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">{viewLabel}</span>
        </button>
      ) : null}

      {canEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="text-green-500 hover:text-green-700"
          aria-label={editLabel}
          title={editLabel}
        >
          <Edit3 className="h-4 w-4" />
          <span className="sr-only">{editLabel}</span>
        </button>
      ) : null}

      {canDelete ? (
        <button
          type="button"
          onClick={onDelete}
          className="text-red-500 hover:text-red-700"
          aria-label={deleteLabel}
          title={deleteLabel}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">{deleteLabel}</span>
        </button>
      ) : null}
    </div>
  );
}
