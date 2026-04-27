"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRoles, useDeleteRole } from "../hooks/useRole";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";
import { extractPermissions } from "@/utils/role";

type Role = {
  roleid: number;
  name: string;  
};

export default function RoleTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error } = useRoles();
  const { mutate: deleteRole, isPending } = useDeleteRole();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);

  //console.log("viewData ---", viewData);

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: "Role Name",
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
              setSelectedId(row.original.roleid);
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

    deleteRole(selectedId, {
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
            title="Role Details"
            >
            {viewData && (
                <div className="space-y-4">

                {/* ROLE INFO */}
                <div>
                    <p className="text-sm text-gray-500">Role Name</p>
                    <p className="font-semibold">{viewData.name}</p>
                </div>

                {/* PERMISSIONS */}
                <div>
                    <p className="text-sm text-gray-500 mb-2">Permissions</p>

                    <div className="flex flex-wrap gap-2">
                    {extractPermissions(viewData).length > 0 ? (
                        extractPermissions(viewData).map((perm: any) => (
                        <span
                            key={perm.value}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                            {perm.label}
                        </span>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">No permissions</p>
                    )}
                    </div>
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