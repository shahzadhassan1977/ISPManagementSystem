"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";
import { extractRoles } from "@/utils/user";
import { useDeleteUser, useUsers } from "../hooks/useUser";


type User = {
  userid: number;
  name: string;
  email: string;
  password: string;
  isactive: boolean;
  isdeleted: boolean;  
};

export default function UserTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error } = useUsers();
  const { mutate: deleteUser, isPending } = useDeleteUser();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);

  //console.log("viewData ---", viewData);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "User Name",
    },
    {
      accessorKey: "email",
      header: "User Email",
    },
    {
      accessorKey: "isactive",
      header: "Is Active",
    },
    {
      accessorKey: "isdeleted",
      header: "Is Deleted",
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
              setSelectedId(row.original.userid);
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

    deleteUser(selectedId, {
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
            title="User Details"
            >
            {viewData && (
                <div className="grid grid-cols-3 gap-4">

                {/* USER INFO */}
                <div>
                    <p className="text-sm text-gray-500">User Name</p>
                    <p className="font-semibold">{viewData.name}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">User Email</p>
                    <p className="font-semibold">{viewData.email}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Is Active</p>
                    <p className="font-semibold">{viewData.isActive ? "Yes" : "No"}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Is Deleted</p>
                    <p className="font-semibold">{viewData.isDeleted ? "Yes" : "No"}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">User Id</p>
                    <p className="font-semibold">{viewData.userid}</p>
                </div>

                {/* ROLES */}
                <div className="col-span-3">
                    <p className="text-sm text-gray-500 mb-2">Roles</p>

                    <div className="flex flex-wrap gap-2">
                    {extractRoles(viewData).length > 0 ? (
                        extractRoles(viewData).map((perm: any) => (
                        <span
                            key={perm.value}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                            {perm.label}
                        </span>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">No roles</p>
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