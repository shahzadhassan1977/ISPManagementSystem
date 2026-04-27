"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useProducts, useDeleteProduct } from "../hooks/useProducts";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";

type Product = {
  productid: number;
  name: string;
  salePrice: string;
  purchasePrice: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function ProductTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error } = useProducts();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);

  //console.log("viewData ---", viewData);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "salePrice",
      header: "Sale Price",
    },
    {
      accessorKey: "purchasePrice",
      header: "Purchase Price",
    },
    {
        accessorKey: "isActive",
        header: "Is Active",
        cell: ({ row }) => (row.original.isActive ? "Yes" : "No"),
    },
    {
        accessorKey: "isDeleted",
        header: "Is Deleted",
        cell: ({ row }) => (row.original.isDeleted ? "Yes" : "No"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="space-x-2">
          <button onClick={() => {            
          setViewData(row.original);
          setOpenView(true);
          }}
          className="text-blue-500">View</button>

          <button
            onClick={() => onEdit(row.original)}
            className="text-green-500"
          >
            Edit
          </button>

          <button
            onClick={() => {
              setSelectedId(row.original.productid);
              setOpenConfirm(true);
            }}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];


  const handleDelete = () => {
    if (!selectedId) return;

    deleteProduct(selectedId, {
      onSuccess: () => {
        toast.success("Deleted successfully");
        setOpenConfirm(false);
      },
    });
  };

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        loading={isLoading}
      />

        <ViewModal
            open={openView}
            onClose={() => setOpenView(false)}
            title="Product Details"
        >       
        {viewData && (
            <div className="grid grid-cols-3 gap-4">
                {/* NAME */}
                <div>
                    <p className="text-sm text-gray-500">Product Name</p>
                    <p className="font-semibold">{viewData.name}</p>
                </div>

                {/* SALE PRICE */}
                <div>
                    <p className="text-sm text-gray-500">Sale Price</p>
                    <p className="font-semibold">{viewData.salePrice}</p>
                </div>

                {/* PURCHASE PRICE */}
                <div>
                    <p className="text-sm text-gray-500">Purchase Price</p>
                    <p className="font-semibold">{viewData.purchasePrice}</p>
                </div>
                
                {/* IS ACTIVE */}
                <div>
                    <p className="text-sm text-gray-500">Is Active</p>
                    <p className="font-semibold">{viewData.isActive ? "Yes" : "No"}</p>
                </div>
                
                {/* IS DELETED */}
                <div>
                    <p className="text-sm text-gray-500">Is Deleted</p>
                    <p className="font-semibold">{viewData.isDeleted ? "Yes" : "No"}</p>
                </div>
                
                {/* ID (optional) */}
                <div>
                    <p className="text-sm text-gray-500">Product ID</p>
                    <p className="font-semibold">{viewData.productid}</p>
                </div>

            </div>
        )}
        </ViewModal>
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDelete}
        loading={isPending}
      />
    </>
  );
}