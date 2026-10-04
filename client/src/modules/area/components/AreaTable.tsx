"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import PermissionActionButtons from "@/components/ui/PermissionActionButtons";
import { ColumnDef } from "@tanstack/react-table";
import { useArea, useDeleteArea } from "../hooks/useArea";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";

type Area = {
  areaid: number;
  name: string;  
};

export default function AreaTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error, refetch } = useArea();
  const { mutate: deleteArea, isPending } = useDeleteArea();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);
  const pagePermission = "area";

  const columns: ColumnDef<Area>[] = [
    {
      accessorKey: "name",
      header: "Area Name",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <PermissionActionButtons
          pagePermission={pagePermission}
          onView={() => {
            setViewData(row.original);
            setOpenView(true);
          }}
          onEdit={() => onEdit(row.original)}
          onDelete={() => {
            setSelectedId(row.original.areaid);
            setOpenConfirm(true);
          }}
        />
      ),
    },
  ];


  const handleDelete = () => {
    if (!selectedId) return;

    deleteArea(selectedId, {
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
        error={isError ? error : undefined}
        onRetry={refetch}
      />

        <ViewModal
            open={openView}
            onClose={() => setOpenView(false)}
            title="Area Details"
        >       
        {viewData && (
            <div className="grid grid-cols-2 gap-4">
                {/* NAME */}
                <div>
                    <p className="text-sm text-gray-500">Area Name</p>
                    <p className="font-semibold">{viewData.name}</p>
                </div>

                {/* ID (optional) */}
                <div>
                    <p className="text-sm text-gray-500">Area ID</p>
                    <p className="font-semibold">{viewData.areaid}</p>
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