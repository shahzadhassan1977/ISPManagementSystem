"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";
import { useDeleteSubarea, useSubareas } from "../hooks/useSubarea";

type Subarea = {
  subareaid: number;
  name: string;
  areaid: number;  
};

export default function SubareaTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error } = useSubareas();
  const { mutate: deleteSubarea, isPending } = useDeleteSubarea();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);

  //console.log("viewData ---", viewData);

  const columns: ColumnDef<Subarea>[] = [
    {
      accessorKey: "name",
      header: "Subarea Name",
    },   
    {
        accessorKey: "area.name",
        header: "Area",        
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
              setSelectedId(row.original.subareaid);
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

    deleteSubarea(selectedId, {
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
            title="Subarea Details"
            >
            {viewData && (
                <div className="space-y-4">

                {/* SUBAREA INFO */}
                <div>
                    <p className="text-sm text-gray-500">Subarea Name</p>
                    <p className="font-semibold">{viewData.name}</p>
                </div>

                {/* AREA */}
                <div>
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-semibold">
                        {viewData?.area?.name || "N/A"}
                    </p>
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