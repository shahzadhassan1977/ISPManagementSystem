"use client";

import Modal from "@/components/ui/Modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateExpense, useUpdateExpense, useExpenses } from "../hooks/useExpenses";
import { toast } from "sonner";
import { useEffect } from "react";
import Select from "react-select";

const schema = z.object({
  id: z.number().optional().default(0),
  title: z.string().min(1, "Title is required"),
  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Year is required"),
  amount: z.coerce.number().min(0, "Amount must be 0 or greater"),
  expenseDate: z.string().min(1, "Date is required"),
  description: z.string().optional().default(""),
  category: z.string().min(1, "Category is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  isActive: z.boolean().default(true),
  createdAt: z.string().optional().default(""),
  updatedAt: z.string().optional().default(""),
  createdBy: z.number().optional().default(0),
  updatedBy: z.number().optional().default(0),
  branchId: z.number().optional().default(0),
  vendorId: z.number().optional().default(0),
  employeeId: z.number().optional().default(0),
  invoiceNo: z.string().optional().default(""),
  attachment: z.string().optional().default(""),
  approvedBy: z.number().optional().default(0),
  status: z.string().min(1, "Status is required"),
});

export default function ExpenseFormModal({ open, onClose, data }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      title: "",
      month: "",
      year: "",
      amount: 0.0,
      expenseDate: new Date().toISOString().split("T")[0],
      description: "",
      category: "",
      paymentMethod: "",
      isActive: true,
      createdAt: "",
      updatedAt: "",
      createdBy: 0,
      updatedBy: 0,
      branchId: 0,
      vendorId: 0,
      employeeId: 0,
      invoiceNo: "",
      attachment: "",
      approvedBy: 0,
      status: "",
    },
  });

  const expenseMonth = watch("month");
  const expenseYear = watch("year");
  const { data: expenses = [] } = useExpenses();
  const lastExpenseId = expenses.reduce(
    (max: number, expense: any) => Math.max(max, Number(expense.id) || 0),
    0,
  );
  const nextExpenseId = data?.id ? Number(data.id) : lastExpenseId + 1;

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        invoiceNo: data.invoiceNo ? data.invoiceNo : "",
        status: data.status ? data.status : "",
        amount: data.amount ? data.amount : 0.0,
        month: data.expenseMonth ? data.expenseMonth : "",
        year: data.expenseYear ? data.expenseYear : "",
        id: data.id ? data.id : 0,
        isActive: !!data.isActive,
        title: data.title ? data.title : "",
        expenseDate: data.expenseDate ? new Date(data.expenseDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
        description: data.description ? data.description : "",
        category: data.category ? data.category : "",
        paymentMethod: data.paymentMethod ? data.paymentMethod : "",
        createdAt: data.createdAt ? data.createdAt : "",
        updatedAt: data.updatedAt ? data.updatedAt : "",
        createdBy: data.createdBy ? data.createdBy : 0,
        updatedBy: data.updatedBy ? data.updatedBy : 0,
        branchId: data.branchId ? data.branchId : 0,
        vendorId: data.vendorId ? data.vendorId : 0,
        employeeId: data.employeeId ? data.employeeId : 0,
        attachment: data.attachment ? data.attachment : "",
        approvedBy: data.approvedBy ? data.approvedBy : 0,      
      });
    }
  }, [data, reset]);

  // 🔥 AUTO-GENERATE INVOICE NUMBER

  const { mutateAsync: createExpense } = useCreateExpense();
  const { mutateAsync: updateExpense } = useUpdateExpense();
  
  // 🔥 EXPENSE MONTH OPTIONS
  const expenseMonthOptions = [
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

  // 🔥 EXPENSE YEAR OPTIONS
  const expenseYearOptions = (() => {
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

  // 🔥 CATEGORY OPTIONS
  const categoryOptions = [
    { value: "Salary", label: "Salary" },
    { value: "Electricity", label: "Electricity" },
    { value: "Internet", label: "Internet" },
    { value: "Fuel", label: "Fuel" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Office", label: "Office" },
    { value: "Equipment", label: "Equipment" },
    { value: "Rent", label: "Rent" },
    { value: "Marketing", label: "Marketing" },
    { value: "Miscellaneous", label: "Miscellaneous" },
  ];

  // 🔥 PAYMENT METHODS OPTIONS
  const paymentMethodOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "Debit Card", label: "Debit Card" },
    { value: "JazzCash", label: "JazzCash" },
    { value: "EasyPaisa", label: "EasyPaisa" },
  ];

  const onSubmit = async (formData: any) => {
    try {
      let Id = data?.id;

      const generatedInvoiceNo = formData.invoiceNo || `INV-${formData.month}-${formData.year}-${nextExpenseId}`;

      // 🔥 EXPENSE PAYLOAD
      const expensePayload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        paymentMethod: formData.paymentMethod,
        expenseDate: formData.expenseDate ? new Date(formData.expenseDate) : new Date(),
        invoiceNo: generatedInvoiceNo,
        status: formData.status,
        amount: formData.amount,
        month: formData.month,
        year: formData.year,
        isActive: formData.isActive,
        createdAt: "",
        updatedAt: "",
        createdBy: 0,
        updatedBy: 0,
        branchId: 0,
        vendorId: 0,
        employeeId: 0,
        attachment: "",
        approvedBy: 0,
      };

      // 🔥 CREATE / UPDATE EXPENSE
      if (data?.id) {
        await updateExpense({
          id: data.id,
          data: expensePayload,
        });
      } else {
        const res = await createExpense(expensePayload);
        Id = res?.id;
      }

      if (!Id) {
        throw new Error("Expense ID not found");
      }
      toast.success(
        data?.id
          ? "Expense updated successfully"
          : "Expense created successfully",
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
      title={data ? "Edit Expense" : "Add Expense"}
      width="100"
    >
      <div className="max-h-[80vh] overflow-y-auto pr-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TWO COLUMN SCROLLABLE CONTAINER */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* TITLE */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Title</label>
              <input
                {...register("title")}
                placeholder="Expense Title"
                className="input w-full"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message as string}
                  </p>
                )}
            </div>
   
            {/* EXPENSE MONTH */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Expense Month
              </label>

              <Controller
                name="month"
                control={control}
                render={({ field }) => (
                  <Select
                    options={expenseMonthOptions}
                    value={
                      expenseMonthOptions.find(
                        (o: any) => o.value === field.value,
                      ) || null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select expense month..."
                  />
                )}
              />

              {errors.month && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.month.message as string}
                </p>
              )}
            </div>

            {/* EXPENSE YEAR */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Expense Year
              </label>

              <Controller
                name="year"
                control={control}
                render={({ field }) => (
                  <Select
                    options={expenseYearOptions}
                    value={
                      expenseYearOptions.find(
                        (o: any) => o.value === field.value,
                      ) || null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select expense year..."
                  />
                )}
              />

              {errors.year && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.year.message as string}
                </p>
              )}
            </div>

            {/* EXPENSE DATE */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Date</label>
              <input
                {...register("expenseDate")}
                placeholder="Expense Date"
                className="input w-full"
                type="date"
                />
                {errors.expenseDate && (
                  <p className="tesxt-red-500 text-xs mt-1">
                    {errors.expenseDate.message as string}
                  </p>
                )}
            </div>
            
            {/* AMOUNT */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Amount</label>

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

            {/* CATEGORY */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Category</label>

              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    options={categoryOptions}
                    value={
                      categoryOptions.find((o: any) => o.value === field.value) ||
                      null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select category..."
                  />
                )}
              />

              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message as string}
                </p>
              )}
            </div>

            {/* PAYMENT METHOD */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Payment Method</label>

              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <Select
                    options={paymentMethodOptions}
                    value={
                      paymentMethodOptions.find((o: any) => o.value === field.value) ||
                      null
                    }
                    onChange={(val: any) => field.onChange(val?.value)}
                    className="text-black"
                    placeholder="Select payment method..."
                  />
                )}
              />

              {errors.paymentMethod && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.paymentMethod.message as string}
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

            {/* DESCRIPTION */}
            <div className="md:col-span-3">
              <label className="text-sm text-gray-500 mb-1 block">
                Description
              </label>

              <textarea
                {...register("description")}
                placeholder="Add description..."
                className="textarea w-full"
                rows={4}
              />

              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message as string}
                </p>
              )}
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
      </div>
    </Modal>
  );
}
