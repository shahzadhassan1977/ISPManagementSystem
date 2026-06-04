"use client";

import ViewModal from "@/components/ui/ViewModal";
import DataTable from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  useSubscriptions,
  useDeleteSubscription,
} from "../hooks/useSubscription";
import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { toast } from "sonner";
import { isAborted } from "zod/v3";

type Subscription = {
  subscriptionid: number;
  startDate: Date;
  renewalDate: Date;
  billingCycle: string;
  status: string;
  customerId: number;
  productId: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type SubscriptionDetail = {
  id: number;
  installationDate: Date;
  installationCharges: number;
  wireCharges: number;
  deviceCharges: number;
  splitterCharges: number;
  fee: number;
  otherCharges: number;
  paid: number;
  remainingBalance: number;
  deviceMac: string;
  userId: number;
  password: string;
  staticIP: string;
  olt: string;
  oltPort: string;
  splitter: string;
  splitterPort: string;
  subscriptionId: number;
  linemanId: number;
  areaRecoveryOfficerId: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function SubscriptionTable({ onEdit }: any) {
  const { data = [], isLoading, isError, error } = useSubscriptions();
  const { mutate: deleteSubscription, isPending } = useDeleteSubscription();

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [viewData, setViewData] = useState<any>(null);
  const [openView, setOpenView] = useState(false);

  const columns: ColumnDef<Subscription>[] = [
    {
      accessorKey: "customer.name",
      header: "Customer Name",
    },
    {
      accessorKey: "product.name",
      header: "Product Name",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) =>  row.original.startDate? formatDate(row.original.startDate.toString()) : "N/A",
    },
    {
      accessorKey: "renewalDate",
      header: "Renewal Date",
      cell: ({ row }) => row.original.renewalDate ? formatDate(row.original.renewalDate.toString()) : "N/A",
    },
    {
      accessorKey: "billingCycle",
      header: "Billing Cycle",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="space-x-2">
          <button
            onClick={() => {
              setViewData(row.original);
              setOpenView(true);
            }}
            className="text-blue-500"
          >
            View
          </button>

          <button
            onClick={() => onEdit(row.original)}
            className="text-green-500"
          >
            Edit
          </button>

          <button
            onClick={() => {
              setSelectedId(row.original.subscriptionid);
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

    deleteSubscription(selectedId, {
      onSuccess: () => {
        toast.success("Deleted successfully");
        setOpenConfirm(false);
      },
    });
  };

  function formatDate(dateString: string) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  }

  return (
    <>
      <DataTable data={data} columns={columns} loading={isLoading} />

      <ViewModal
        open={openView}
        onClose={() => setOpenView(false)}
        title="Subscription Details"
      >
        {viewData && (
          <div className="max-h-[80vh] overflow-y-auto pr-3">
            <div className="grid grid-cols-2 gap-4">
              {/* Subscription Id */}
              <div>
                <p className="text-sm text-gray-500">Subscription Id</p>
                <p className="font-semibold">{viewData.subscriptionid? viewData.subscriptionid : "N/A"}</p>
              </div>
              {/* Start Date */}
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-semibold">{viewData.startDate? formatDate(viewData.startDate) : "N/A"}</p>
              </div>
              {/* Renewal Date */}
              <div>
                <p className="text-sm text-gray-500">Renewal Date</p>
                <p className="font-semibold">{viewData.renewalDate? formatDate(viewData.renewalDate) : "N/A"}</p>
              </div>
              {/* Billing Cycle */}
              <div>
                <p className="text-sm text-gray-500">Billing Cycle</p>
                <p className="font-semibold">{viewData.billingCycle? viewData.billingCycle : "N/A"}</p>
              </div>
              {/* Status */}
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-semibold">{viewData.status? viewData.status : "N/A"}</p>
              </div>
              {/* Customer Id */}
              <div>
                <p className="text-sm text-gray-500">Customer Name</p>
                <p className="font-semibold">{viewData.customer.name? viewData.customer.name : "N/A"}</p>
              </div>
              {/* Product Id */}
              <div>
                <p className="text-sm text-gray-500">Product Name</p>
                <p className="font-semibold">{viewData.product.name?viewData.product.name : "N/A"}</p>
              </div>
              {/* Installation Date */}
              <div>
                <p className="text-sm text-gray-500">Installation Date</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.installationDate? formatDate(viewData.subscriptiondetails.installationDate) : "N/A"}
                </p>
              </div>
              {/* Installation Charges */}
              <div>
                <p className="text-sm text-gray-500">Installation Charges</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.installationCharges? viewData.subscriptiondetails.installationCharges : "N/A"}
                </p>
              </div>
              {/* Wire Charges */}
              <div>
                <p className="text-sm text-gray-500">Wire Charges</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.wireCharges? viewData.subscriptiondetails.wireCharges : "N/A"}
                </p>
              </div>
              {/* Device Charges */}
              <div>
                <p className="text-sm text-gray-500">Device Charges</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.deviceCharges? viewData.subscriptiondetails.deviceCharges : "N/A"}
                </p>
              </div>
              {/* Splitter Charges */}
              <div>
                <p className="text-sm text-gray-500">Splitter Charges</p>
                <p className="font-semibold">{viewData.subscriptiondetails.splitterCharges? viewData.subscriptiondetails.splitterCharges : "N/A"}</p>
              </div>
              {/* Fee */}
              <div>
                <p className="text-sm text-gray-500">Fee</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.fee? viewData.subscriptiondetails.fee : "N/A"}
                </p>
              </div>
              {/* Other Charges */}
              <div>
                <p className="text-sm text-gray-500">Other Charges</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.otherCharges? viewData.subscriptiondetails.otherCharges : "N/A"}
                </p>
              </div>
              {/* Paid */}
              <div>
                <p className="text-sm text-gray-500">Paid</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.paid? viewData.subscriptiondetails.paid : "N/A"}
                </p>
              </div>
              {/* Remaining Balance */}
              <div>
                <p className="text-sm text-gray-500">Remaining Balance</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.remainingBalance? viewData.subscriptiondetails.remainingBalance : "N/A"}
                </p>
              </div>
              {/* Device MAC */}
              <div>
                <p className="text-sm text-gray-500">Device MAC</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.deviceMac? viewData.subscriptiondetails.deviceMac : "N/A"}
                </p>
              </div>
              {/* User ID */}
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.userId? viewData.subscriptiondetails.userId : "N/A"}
                </p>
              </div>
              {/* Password */}
              <div>
                <p className="text-sm text-gray-500">Password</p>
                <p className="font-semibold">{viewData.password? viewData.password : "N/A"}</p>
              </div>
              {/* Static IP */}
              <div>
                <p className="text-sm text-gray-500">Static IP</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.staticIP? viewData.subscriptiondetails.staticIP : "N/A"}
                </p>
              </div>
              {/* OLT */}
              <div>
                <p className="text-sm text-gray-500">OLT</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.olt? viewData.subscriptiondetails.olt : "N/A"}
                </p>
              </div>
              {/* OLT Port */}
              <div>
                <p className="text-sm text-gray-500">OLT Port</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.oltPort? viewData.subscriptiondetails.oltPort : "N/A"}
                </p>
              </div>
              {/* Splitter */}
              <div>
                <p className="text-sm text-gray-500">Splitter</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.splitter? viewData.subscriptiondetails.splitter : "N/A"}
                </p>
              </div>
              {/* Splitter Port */}
              <div>
                <p className="text-sm text-gray-500">Splitter Port</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.splitterPort? viewData.subscriptiondetails.splitterPort : "N/A"}
                </p>
              </div>
              {/* Lineman Id */}
              <div>
                <p className="text-sm text-gray-500">Lineman Id</p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.linemanId? viewData.subscriptiondetails.linemanId : "N/A"}
                </p>
              </div>
              {/* Area Recovery Officer Id */}
              <div>
                <p className="text-sm text-gray-500">
                  Area Recovery Officer Id
                </p>
                <p className="font-semibold">
                  {viewData.subscriptiondetails.areaRecoveryOfficerId? viewData.subscriptiondetails.areaRecoveryOfficerId : "N/A"}
                </p>
              </div>
              {/* Is Active */}
              <div>
                <p className="text-sm text-gray-500">Is Active</p>
                <p className="font-semibold">
                  {viewData.isActive ? "Yes" : "No"}
                </p>
              </div>
              {/* Is Deleted */}
              <div>
                <p className="text-sm text-gray-500">Is Deleted</p>
                <p className="font-semibold">
                  {viewData.isDeleted ? "Yes" : "No"}
                </p>
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
