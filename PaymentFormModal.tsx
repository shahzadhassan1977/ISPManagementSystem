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
    watch,
    setValue,
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

  const selectedCustomerId = watch("customerId");
  const billingMonth = watch("billingMonth");
  const billingYear = watch("billingYear");
  const paymentId = watch("id");

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

  // 🔥 AUTO-GENERATE INVOICE NUMBER
  useEffect(() => {
    if (billingMonth && billingYear && paymentId && !data?.id) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const monthName = monthNames[Number(billingMonth) - 1];
      const invoiceNumber = `INV-${monthName}-${billingYear}-${paymentId}`;
      setValue("invoiceNumber", invoiceNumber);
    }
  }, [billingMonth, billingYear, paymentId, data?.id, setValue]);

  const { mutateAsync: createPayment } = useCreatePayment();
  const { mutateAsync: updatePayment } = useUpdatePayment();
  const { data: customers = [] } = useCustomers();
  const { data: subscriptions = [] } = useSubscriptions();

  // 🔥 CUSTOMER OPTIONS
  const customerOptions = customers.map((c: any) => ({
    value: c.customerid,
    label: c.name,
  }));

  // 🔥 FILTER SUBSCRIPTIONS BY SELECTED CUSTOMER
  const filteredSubscriptions = subscriptions.filter(
    (sub: any) => sub.customerid === selectedCustomerId
  );

  const subscriptionOptions = filteredSubscriptions.map((c: any) => ({
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
      years.push({ value: i.toString(), label: i.toString() });
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
          : "Payment created successfully"
      );

      onClose();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={data ? "Edit Payment" : "Add Payment"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* TWO COLUMN SCROLLABLE CONTAINER */}
        <div className="max-h-[60vh] overflow-y-auto pr-4">
          <div className="grid grid-cols-2 gap-4 space-y-0">
            {/* CUSTOMER */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Customer
              </label>

              <Controller
                name="customerId"
                control={control}
                render={({ field }) => (
                  <Select
                    options={customerOptions}
                    value={
                      customerOptions.find(
                        (o: any) => o.value === Number(field.value)
                      ) || null
                    }
                    onChange={(val: any) => {
                      field.onChange(val?.value);
                      // Clear subscription when customer changes
                      setValue("subscriptionId", 0);
                    }}
                    className="text-black"
                    placeholder="Select customer..."
                  />
                )}
              />

              {errors.customerId && (
                <p className="text-red-500 text-xs mt-1">
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
                        (o: any) => o.value === Number(field.value)
                      ) || null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select subscription..."
                    isDisabled={!selectedCustomerId}
                  />
                )}
              />

              {errors.subscriptionId && (
                <p className="text-red-500 text-xs mt-1">
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
                        (o: any) => o.value === field.value
                      ) || null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select billing month..."
                  />
                )}
              />

              {errors.billingMonth && (
                <p className="text-red-500 text-xs mt-1">
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
                        (o: any) => o.value === field.value
                      ) || null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select billing year..."
                  />
                )}
              />

              {errors.billingYear && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.billingYear.message as string}
                </p>
              )}
            </div>

            {/* INVOICE NUMBER */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Invoice Number
              </label>

              <input
                {...register("invoiceNumber")}
                placeholder="Auto-generated"
                className="input w-full"
                type="text"
                readOnly
              />

              {errors.invoiceNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.invoiceNumber.message as string}
                </p>
              )}
            </div>

            {/* AMOUNT */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Amount
              </label>

              <input
                {...register("amount", {
                  valueAsNumber: true,
                })}
                placeholder="Amount"
                className="input w-full"
                type="number"
                step="0.01"
              />

              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.amount.message as string}
                </p>
              )}
            </div>

            {/* OTHER AMOUNT */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Other Amount
              </label>

              <input
                {...register("otherAmount", {
                  valueAsNumber: true,
                })}
                placeholder="Other Amount"
                className="input w-full"
                type="number"
                step="0.01"
              />

              {errors.otherAmount && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.otherAmount.message as string}
                </p>
              )}
            </div>

            {/* STATUS */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Status
              </label>

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
                <p className="text-red-500 text-xs mt-1">
                  {errors.status.message as string}
                </p>
              )}
            </div>

            {/* ACTIVE */}
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="checkbox"
                />
                <span className="text-sm text-gray-500">Active</span>
              </label>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
