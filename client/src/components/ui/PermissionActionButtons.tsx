"use client";

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
        <button type="button" onClick={onView} className="text-blue-500">
          {viewLabel}
        </button>
      ) : null}

      {canEdit ? (
        <button type="button" onClick={onEdit} className="text-green-500">
          {editLabel}
        </button>
      ) : null}

      {canDelete ? (
        <button type="button" onClick={onDelete} className="text-red-500">
          {deleteLabel}
        </button>
      ) : null}
    </div>
  );
}
