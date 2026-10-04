"use client";

import Modal from "@/components/ui/Modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useCreateSubscription,
  useUpdateSubscription,
} from "../hooks/useSubscription";
import { toast } from "sonner";
import { useEffect } from "react";
import { is } from "zod/locales";
import { useCustomers } from "@/modules/customer/hooks/useCustomers";
import { useProducts } from "@/modules/product/hooks/useProducts";
import Select from "react-select";
import { useEmployees } from "@/modules/employee/hooks/useEmployee";

const schema = z.object({
  subscriptionid: z.number(),
  startDate: z.date(),
  renewalDate: z.date(),
  billingCycle: z.string().min(2, "min legnth > 2"),
  status: z.string().min(2, "min legnth > 2"),
  customerId: z.number(),
  productId: z.number(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  id: z.number(),
  installationDate: z.date(),
  installationCharges: z.number(),
  wireCharges: z.number(),
  deviceCharges: z.number(),
  splitterCharges: z.number(),
  fee: z.number(),
  otherCharges: z.number(),
  paid: z.number(),
  remainingBalance: z.number(),
  deviceMac: z.string().max(17, "max length = 17"),
  userId: z.string().min(2, "min legnth > 2").max(100, "max length = 100"),
  password: z.string().min(6, "min length = 6").max(100, "max length = 100"),
  staticIP: z.string().max(15, "max length = 15"),
  olt: z.string().max(100, "max length = 100"),
  oltPort: z.string().max(100, "max length = 100"),
  splitter: z.string().max(100, "max length = 100"),
  splitterPort: z.string().max(100, "max length = 100"),
  subscriptionId: z.number(),
  linemanId: z.number(),
  areaRecoveryOfficerId: z.number(),
});
const formatDateForInput = (date: string | Date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};
export default function SubscriptionFormModal({ open, onClose, data }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      subscriptionid: 0,
      startDate: new Date(),
      renewalDate: new Date(),
      billingCycle: "",
      status: "",
      customerId: undefined,
      productId: undefined,
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 0,
      installationDate: new Date(),
      installationCharges: 0.0,
      wireCharges: 0.0,
      deviceCharges: 0.0,
      splitterCharges: 0.0,
      fee: 0.0,
      otherCharges: 0.0,
      paid: 0.0,
      remainingBalance: 0.0,
      deviceMac: "",
      userId: "",
      password: "",
      staticIP: "",
      olt: "",
      oltPort: "",
      splitter: "",
      splitterPort: "",
      subscriptionId: 0,
      linemanId: 0,
      areaRecoveryOfficerId: 0,
    },
  });
  const installationCharges = watch("installationCharges");
  const wireCharges = watch("wireCharges");
  const deviceCharges = watch("deviceCharges");
  const fee = watch("fee");
  const otherCharges = watch("otherCharges");
  const splitterCharges = watch("splitterCharges");
  const remainingBalance = watch("remainingBalance");

  useEffect(() => {
    if (data) {
      const detail = Array.isArray(data.subscriptiondetails)
        ? data.subscriptiondetails[0]
        : data.subscriptiondetails || {};

      reset({
        ...data,
        subscriptionid: data.subscriptionid ? data.subscriptionid : 0,
        startDate: data.startDate ? formatDateForInput(data.startDate) : formatDateForInput(new Date()),
        renewalDate: data.renewalDate ? formatDateForInput(data.renewalDate) : formatDateForInput(new Date()),
        billingCycle: data.billingCycle ? data.billingCycle : "",
        customerId: data.customerId ? Number(data.customerId) : undefined,
        productId: data.productId ? Number(data.productId) : undefined,
        deviceCharges: detail.deviceCharges ? detail.deviceCharges : 0,
        deviceMac: detail.deviceMac ? detail.deviceMac : "",
        fee: detail.fee ? detail.fee : 0,
        installationCharges: detail.installationCharges ? detail.installationCharges : 0,
        installationDate: detail.installationDate ? formatDateForInput(detail.installationDate) : formatDateForInput(new Date()),
        otherCharges: detail.otherCharges ? detail.otherCharges : 0,
        splitterCharges: detail.splitterCharges ? detail.splitterCharges : 0,
        remainingBalance: detail.remainingBalance ? detail.remainingBalance : 0,
        paid: detail.paid ? detail.paid : 0,
        password: detail.password ? detail.password : "",
        staticIP: detail.staticIP ? detail.staticIP : "",
        olt: detail.olt ? detail.olt : "",
        oltPort: detail.oltPort ? detail.oltPort : "",
        splitter: detail.splitter ? detail.splitter : "",
        splitterPort: detail.splitterPort ? detail.splitterPort : "",
        subscriptionId: detail.subscriptionId ? detail.subscriptionId : 0,
        id: detail.id ? detail.id : 0,
        userId: detail.userId ? detail.userId : "",
        linemanId: detail.linemanId ? Number(detail.linemanId) : undefined,
        areaRecoveryOfficerId: detail.areaRecoveryOfficerId ? Number(detail.areaRecoveryOfficerId) : undefined,
        isActive: !!data.isActive,
        isDeleted: !!data.isDeleted,
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      });
    }
  }, [
    data,
    reset,
  ]);

  useEffect(() => {
    const totalCharges =
      Number(installationCharges || 0) +
      Number(wireCharges || 0) +
      Number(deviceCharges || 0) +
      Number(fee || 0) +
      Number(otherCharges || 0) +
      Number(splitterCharges || 0);

    const total = totalCharges - Number(remainingBalance || 0);

    setValue("paid", total, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [installationCharges,
  wireCharges,
  deviceCharges,
  fee,
  otherCharges,
  splitterCharges,
  remainingBalance,
  setValue,]);

  const { mutate: createSubscription } = useCreateSubscription();
  const { mutate: updateSubscription } = useUpdateSubscription();
  const { data: customers = [] } = useCustomers();
  const { data: products = [] } = useProducts();
  const { data: employees = [] } = useEmployees();

  // 🔥 CUSTOMER OPTIONS
  const customerOptions = customers.map((c: any) => ({
    value: c.customerid,
    label: c.name,
  }));

  // 🔥 PORDUCT OPTIONS
  const productOptions = products.map((c: any) => ({
    value: c.productid,
    label: c.name,
  }));

  // 🔥 EMPLOYEE OPTIONS
  const employeeOptions = employees.map((e: any) => ({
    value: e.employeeid,
    label: e.name,
  }));

  // 🔥 BILLING CYCLE OPTIONS
  const billingCycleOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  // 🔥 STATUS OPTIONS
  const statusOptions = [
    { value: "registration", label: "Registration" },
    { value: "installation", label: "Installation" },
    { value: "configuration", label: "Configuration" },
    { value: "activated", label: "Activated" },
    { value: "Completed", label: "Completed" },
    { value: "Deactivated", label: "Deactivated" },
    { value: "onHold", label: "on Hold" },
    { value: "canceled", label: "Canceled" },
    { value: "suspended", label: "Suspended" },
    { value: "terminated", label: "Terminated" },
    { value: "pending", label: "Pending" },
    { value: "inProgress", label: "In Progress" },
    { value: "complaint", label: "Complaint" },
    { value: "other", label: "Other" },
    { value: "unknown", label: "Unknown" },
    { value: "disconnected", label: "Disconnected" },
    { value: "reconnected", label: "Reconnected" },
    { value: "moved", label: "Moved" },
    { value: "upgraded", label: "Upgraded" },
    { value: "downgraded", label: "Downgraded" },
    { value: "trial", label: "Trial" },
    { value: "expired", label: "Expired" },
    { value: "renewed", label: "Renewed" },
    { value: "cancellationRequested", label: "Cancellation Requested" },
    { value: "cancellationApproved", label: "Cancellation Approved" },
    { value: "cancellationDenied", label: "Cancellation Denied" },
    { value: "suspensionRequested", label: "Suspension Requested" },
    { value: "suspensionApproved", label: "Suspension Approved" },
    { value: "suspensionDenied", label: "Suspension Denied" },
    { value: "reactivationRequested", label: "Reactivation Requested" },
    { value: "reactivationApproved", label: "Reactivation Approved" },
    { value: "reactivationDenied", label: "Reactivation Denied" },
  ];

  const onError = (error: any) => {
    console.error("Error creating/updating subscription:", error);
    toast.error(error?.response?.data?.message || "Something went wrong");
  };

  const onSubmit = (formData: any) => {
    console.log("Form data to be submitted:", formData); // Debug log
    if (data?.subscriptionid) {
      console.log("Updating subscription with data:", formData); // Debug log
      updateSubscription(
        { id: data.subscriptionid, data: formData },
        {
          onSuccess: () => {
            toast.success("Updated");
            onClose();
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Update failed");
          },
        },
      );
    } else {
      console.log("Creating subscription with data:", formData); // Debug log
      createSubscription(formData, {
        onSuccess: () => {
          toast.success("Created");
          onClose();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Something went wrong");
        },
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={data ? "Edit Subscription" : "Add Subscription"}
      width="max-w-6xl"
    >
      <div className="max-h-[80vh] overflow-y-auto pr-3">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Customer</span>
              <Controller
                name="customerId"
                control={control}
                render={({ field }) => (
                  <Select
                    options={customerOptions}
                    value={
                      customerOptions.find(
                        (o: any) => o.value === Number(field.value),
                      ) || null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select customer..."
                  />
                )}
              />
              {errors.customerId && (
                <p className="text-red-500 text-xs">
                  {errors.customerId.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Product ID</span>
              <Controller
                name="productId"
                control={control}
                render={({ field }) => (
                  <Select
                    options={productOptions}
                    value={
                      productOptions.find(
                        (o: any) => o.value === Number(field.value),
                      ) || null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select product..."
                  />
                )}
              />
              {errors.productId && (
                <p className="text-red-500 text-xs">
                  {errors.productId.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Lineman ID</span>
              <Controller
                name="linemanId"
                control={control}
                render={({ field }) => (
                  <Select
                    options={employeeOptions}
                    value={
                      employeeOptions.find(
                        (o: any) => o.value === field.value,
                      ) || null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select lineman..."
                  />
                )}
              />
              {errors.linemanId && (
                <p className="text-red-500 text-xs">
                  {errors.linemanId.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Area Recovery Officer</span>
              <Controller
                name="areaRecoveryOfficerId"
                control={control}
                render={({ field }) => (
                  <Select
                    options={employeeOptions}
                    value={
                      employeeOptions.find(
                        (o: any) => o.value === field.value,
                      ) || null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select area recovery officer..."
                  />
                )}
              />
              {errors.areaRecoveryOfficerId && (
                <p className="text-red-500 text-xs">
                  {errors.areaRecoveryOfficerId.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Start Date</span>
              <input
                {...register("startDate", {
                  valueAsDate: true,                  
                })}
                placeholder="Start Date"
                className="input"
                type="date"
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs">
                  {errors.startDate.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Renewal Date</span>
              <input
                {...register("renewalDate", {
                  valueAsDate: true,                  
                })}
                placeholder="Renewal Date"
                className="input"
                type="date"
              />
              {errors.renewalDate && (
                <p className="text-red-500 text-xs">
                  {errors.renewalDate.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Installation Date</span>
              <input
                {...register("installationDate", {
                  valueAsDate: true,                  
                })}
                placeholder="Installation Date"
                className="input"
                type="date"
              />
              {errors.installationDate && (
                <p className="text-red-500 text-xs">
                  {errors.installationDate.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Billing Cycle</span>
              <Controller
                name="billingCycle"
                control={control}
                render={({ field }) => (
                  <Select
                    options={billingCycleOptions}
                    value={
                      billingCycleOptions.find(
                        (o: any) => o.value === field.value,
                      ) || null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select billing cycle..."
                  />
                )}
              />
              {errors.billingCycle && (
                <p className="text-red-500 text-xs">
                  {errors.billingCycle.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Status</span>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    options={statusOptions}
                    value={
                      statusOptions.find((o: any) => o.value === field.value) ||
                      null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select status..."
                  />
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-xs">
                  {errors.status.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Installation Charges</span>
              <input
                {...register("installationCharges",{
                  valueAsNumber: true,
                })}
                placeholder="Installation Charges"
                className="input"
                type="number"
              />
              {errors.installationCharges && (
                <p className="text-red-500 text-xs">
                  {errors.installationCharges.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Wire Charges</span>
              <input
                {...register("wireCharges",{
                  valueAsNumber: true,
                })}
                placeholder="Wire Charges"
                className="input"
                type="number"
              />
              {errors.wireCharges && (
                <p className="text-red-500 text-xs">
                  {errors.wireCharges.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Device Charges</span>
              <input
                {...register("deviceCharges",{
                  valueAsNumber: true,
                })}
                placeholder="Device Charges"
                className="input"
                type="number"
              />
              {errors.deviceCharges && (
                <p className="text-red-500 text-xs">
                  {errors.deviceCharges.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Splitter Charges</span>
              <input
                {...register("splitterCharges",{
                  valueAsNumber: true,
                })}
                placeholder="Splitter Charges"
                className="input"
                type="number"
              />
              {errors.splitterCharges && (
                <p className="text-red-500 text-xs">
                  {errors.splitterCharges.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Fee</span>
              <input
                {...register("fee",{
                  valueAsNumber: true,
                })}
                placeholder="Fee"
                className="input"
                type="number"
              />
              {errors.fee && (
                <p className="text-red-500 text-xs">
                  {errors.fee.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Other Charges</span>
              <input
                {...register("otherCharges",{
                  valueAsNumber: true,
                })}
                placeholder="Other Charges"
                className="input"
                type="number"
              />
              {errors.otherCharges && (
                <p className="text-red-500 text-xs">
                  {errors.otherCharges.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Paid</span>
              <input
                {...register("paid",{
                  valueAsNumber: true,
                })}
                placeholder="Paid"
                className="input"
                type="number"
                readOnly
              />
              {errors.paid && (
                <p className="text-red-500 text-xs">
                  {errors.paid.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Remaining Balance</span>
              <input
                {...register("remainingBalance",{
                  valueAsNumber: true,
                })}
                placeholder="Remaining Balance"
                className="input"
                type="number"
              />
              {errors.remainingBalance && (
                <p className="text-red-500 text-xs">
                  {errors.remainingBalance.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Device Mac</span>
              <input
                {...register("deviceMac")}
                placeholder="Device Mac"
                className="input"
              />
              {errors.deviceMac && (
                <p className="text-red-500 text-xs">
                  {errors.deviceMac.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">User ID</span>
              <input
                {...register("userId")}
                placeholder="User ID"
                className="input"
              />
              {errors.userId && (
                <p className="text-red-500 text-xs">
                  {errors.userId.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Password</span>
              <input
                {...register("password")}
                placeholder="Password"
                className="input"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Static IP</span>
              <input
                {...register("staticIP")}
                placeholder="Static IP"
                className="input"
              />
              {errors.staticIP && (
                <p className="text-red-500 text-xs">
                  {errors.staticIP.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">OLT</span>
              <input {...register("olt")} placeholder="OLT" className="input" />
              {errors.olt && (
                <p className="text-red-500 text-xs">
                  {errors.olt.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">OLT Port</span>
              <input
                {...register("oltPort")}
                placeholder="OLT Port"
                className="input"
              />
              {errors.oltPort && (
                <p className="text-red-500 text-xs">
                  {errors.oltPort.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Splitter</span>
              <input
                {...register("splitter")}
                placeholder="Splitter"
                className="input"
              />
              {errors.splitter && (
                <p className="text-red-500 text-xs">
                  {errors.splitter.message as string}
                </p>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Splitter Port</span>

              <input
                {...register("splitterPort")}
                placeholder="Splitter Port"
                className="input"
              />
              {errors.splitterPort && (
                <p className="text-red-500 text-xs">
                  {errors.splitterPort.message as string}
                </p>
              )}
            </label>
            <input type="hidden" {...register("isDeleted")} />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="checkbox"
                />
                <span>Active</span>
              </label>

            </div>

            <div className="crud-form-actions flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="border px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
