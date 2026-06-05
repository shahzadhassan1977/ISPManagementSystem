"use client";

import Modal from "@/components/ui/Modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePayment, useUpdatePayment } from "../hooks/usePayments";
import { useCompanies } from "@/modules/company/hooks/useCompany";
import { toast } from "sonner";
import { useEffect } from "react";
import { is } from "zod/locales";
import Select from "react-select";
import { useCustomers } from "@/modules/customer/hooks/useCustomers";
import { useSubscriptions } from "@/modules/subscription/hooks/useSubscription";

const schema = z.object({
  id: z.number(),
  amount: z.coerce.number(),
  otherAmount: z.coerce.number(),
  invoiceNumber: z.string(),
  billingMonth: z.string(),
  billingYear: z.string(),
  status: z.string(),
  customerId: z.number(),
  subscriptionId: z.number(),
  // ✅ FIX HERE
  isActive: z.boolean(),
  isDeleted: z.boolean(),
});

export default function PaymentFormModal({ open, onClose, data }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      amount: 0.0,
      otherAmount: 0.0,
      invoiceNumber: "",
      billingMonth: "",
      billingYear: "",
      customerId: 0,
      subscriptionId: 0,
      status: "",
      isActive: true,
      isDeleted: false,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        customerId: data.customerId ? Number(data.customerId) : undefined,
        subscriptionId: data.subscriptionId
          ? Number(data.subscriptionId)
          : undefined,
        invoiceNumber: data.invoiceNumber ? data.invoiceNumber : "",
        status: data.status ? data.status : "",
        amount: data.amount ? data.amount : 0.0,
        otherAmount: data.otherAmount ? data.otherAmount : 0.0,
        billingMonth: data.billingMonth ? data.billingMonth : "",
        billingYear: data.billingYear ? data.billingYear : "",
        id: data.id ? data.id : 0,
        isActive: !!data.isActive,
        isDeleted: !!data.isDeleted,
      });
    }
  }, [data, reset]);

  const { mutateAsync: createPayment } = useCreatePayment();
  const { mutateAsync: updatePayment } = useUpdatePayment();
  const { data: customers = [] } = useCustomers();
  const { data: subscriptions = [] } = useSubscriptions();

  // 🔥 CUSTOMER OPTIONS
  const customerOptions = customers.map((c: any) => ({
    value: c.customerid,
    label: c.name,
  }));

  // 🔥 SUBSCRIPTION OPTIONS
  const subscriptionOptions = subscriptions.map((c: any) => ({
    value: c.subscriptionid,
    label: c.product.name,
  }));

  // 🔥 BILLING MONTH OPTIONS
  const billingMonthOptions = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // 🔥 BILLING YEAR OPTIONS
  const billingYearOptions = (() => {
    const years = [];
    const currentYear = new Date().getFullYear();
    // Loop 5 years back, current year, and 5 years coming (11 total)
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push({ value: i, label: i.toString() });
    }
    return years;
  })();

  // 🔥 STATUS OPTIONS
  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Paid", label: "Paid" },
    { value: "OnHold", label: "OnHold" },
    { value: "InProcess", label: "InProcess" },
  ];

  const onSubmit = async (formData: any) => {
    try {
      let Id = data?.id;

      // 🔥 PAYMENT PAYLOAD
      const paymentPayload = {
        customerId: formData.customerId,
        subscriptionId: formData.subscriptionId,
        invoiceNumber: formData.invoiceNumber,
        status: formData.status,
        amount: formData.amount,
        otherAmount: formData.otherAmount,
        billingMonth: formData.billingMonth,
        billingYear: formData.billingYear,
        isActive: formData.isActive,
        isDeleted: formData.isDeleted,
      };

      // 🔥 CREATE / UPDATE PAYMENT
      if (data?.id) {
        await updatePayment({
          id: data.id,
          data: paymentPayload,
        });
      } else {
        const res = await createPayment(paymentPayload);

        Id = res?.id;
      }

      if (!Id) {
        throw new Error("Payment ID not found");
      }
      toast.success(
        data?.id
          ? "Payment updated successfully"
          : "Payment created successfully",
      );

      onClose();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={data ? "Edit Payment" : "Add Payment"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* CUSTOMER */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Customer</label>

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
        </div>

        {/* SUBSCRIPTION */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Subscription
          </label>

          <Controller
            name="subscriptionId"
            control={control}
            render={({ field }) => (
              <Select
                options={subscriptionOptions}
                value={
                  subscriptionOptions.find(
                    (o: any) => o.value === Number(field.value),
                  ) || null
                }
                onChange={(val: any) => field.onChange(val?.value)}
                className="text-black"
                placeholder="Select subscription..."
              />
            )}
          />

          {errors.subscriptionId && (
            <p className="text-red-500 text-xs">
              {errors.subscriptionId.message as string}
            </p>
          )}
        </div>

        {/* BILLING MONTH */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Billing Month
          </label>

          <Controller
            name="billingMonth"
            control={control}
            render={({ field }) => (
              <Select
                options={billingMonthOptions}
                value={
                  billingMonthOptions.find(
                    (o: any) => o.value === Number(field.value),
                  ) || null
                }
                onChange={(val: any) => field.onChange(val?.value)}
                className="text-black"
                placeholder="Select billing month..."
              />
            )}
          />

          {errors.billingMonth && (
            <p className="text-red-500 text-xs">
              {errors.billingMonth.message as string}
            </p>
          )}
        </div>

        {/* BILLING YEAR */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Billing Year
          </label>

          <Controller
            name="billingYear"
            control={control}
            render={({ field }) => (
              <Select
                options={billingYearOptions}
                value={
                  billingYearOptions.find(
                    (o: any) => o.value === Number(field.value),
                  ) || null
                }
                onChange={(val: any) => field.onChange(val?.value)}
                className="text-black"
                placeholder="Select billing year..."
              />
            )}
          />

          {errors.billingYear && (
            <p className="text-red-500 text-xs">
              {errors.billingYear.message as string}
            </p>
          )}
        </div>

        {/* AMOUNT  */}
        <div>
          <input
            {...register("amount", {
              valueAsNumber: true,
            })}
            placeholder="Amount"
            className="input"
            type="number"
          />

          {errors.amount && (
            <p className="text-red-500 text-xs">
              {errors.amount.message as string}
            </p>
          )}
        </div>

        {/* OTHER AMOUNT  */}
        <div>
          <input
            {...register("otherAmount", {
              valueAsNumber: true,
            })}
            placeholder="Other Amount"
            className="input"
            type="number"
          />

          {errors.otherAmount && (
            <p className="text-red-500 text-xs">
              {errors.otherAmount.message as string}
            </p>
          )}
        </div>

        {/* STATUS */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Status</label>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                options={statusOptions}
                value={
                  statusOptions.find(
                    (o: any) => o.value === Number(field.value),
                  ) || null
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
        </div>

        {/* ACTIVE & DELETED */}
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

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="border px-3 py-1 rounded"
          >
            Cancel
          </button>

          <button className="bg-blue-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
