"use client";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
};

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-sm p-6">

        {/* TITLE */}
        <h2 className="text-lg font-semibold">{title}</h2>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-2">
          {description}
        </p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-6">

          <button
            onClick={onClose}
            disabled={loading}
            className="px-3 py-1 border rounded"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            {loading ? "Processing..." : confirmText}
          </button>

        </div>
      </div>
    </div>
  );
}