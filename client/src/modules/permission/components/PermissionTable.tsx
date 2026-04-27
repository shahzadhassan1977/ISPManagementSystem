"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { usePermission, useDeletePermission } from "../hooks/usePermission";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";

type Permission = {
  permissionid: number;
  name: string;  
};

export default function PermissionTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error } = usePermission();
  const { mutate: deletePermission, isPending } = useDeletePermission();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);

  console.log("viewData ---", viewData);

  const columns: ColumnDef<Permission>[] = [
    {
      accessorKey: "name",
      header: "Permission Name",
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
              setSelectedId(row.original.permissionid);
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

    deletePermission(selectedId, {
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
            title="Permission Details"
        >       
        {viewData && (
            <div className="grid grid-cols-2 gap-4">
                {/* NAME */}
                <div>
                    <p className="text-sm text-gray-500">Permission Name</p>
                    <p className="font-semibold">{viewData.name}</p>
                </div>

                {/* ID (optional) */}
                <div>
                    <p className="text-sm text-gray-500">Permission ID</p>
                    <p className="font-semibold">{viewData.permissionid}</p>
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