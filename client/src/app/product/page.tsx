"use client";

import { useState } from "react";
import PageWrapper from "@/components/ui/PageWrapper";
import ProductTable from "@/modules/product/components/ProductTable";
import ProductFormModal from "@/modules/product/components/ProductFormModal";

export default function ProductPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  return (
    <PageWrapper
      title="Product Management"
      description="Manage ISP product details"
      action={
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      }
    >
      <ProductTable
        onEdit={(row: any) => {
          setEditData(row);
          setOpen(true);
        }}
      />

      {open && (
        <ProductFormModal
          open={open}
          data={editData}
          onClose={() => setOpen(false)}
        />
      )}
    </PageWrapper>
  );
}