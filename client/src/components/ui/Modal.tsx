"use client";

import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string; // optional custom width
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = "max-w-md",
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`relative bg-white rounded-xl shadow-lg w-full ${width} p-6`}
      >
        {/* HEADER */}
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">{title}</h2>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        )}

        {/* BODY */}
        <div>{children}</div>

        {/* FOOTER */}
        {footer && (
          <div className="mt-4 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}