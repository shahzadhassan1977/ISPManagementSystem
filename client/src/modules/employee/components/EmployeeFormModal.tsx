"use client";

import Modal from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, email, number, z } from "zod";
import {
  useCreateEmployee,
  useUpdateEmployee,
  useCreateEmployeeSubarea,
} from "../hooks/useEmployee";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Select from "react-select";
import { extractSubareas } from "@/utils/subarea";
import { da, is } from "zod/locales";
import { useSubareas } from "@/modules/subarea/hooks/useSubarea";
import { useArea } from "@/modules/area/hooks/useArea";
import { useCompanies } from "@/modules/company/hooks/useCompany";
import { Controller } from "react-hook-form";

const schema = z.object({
  name: z.string().min(2, "min length > 2"),
  email: z.string().email("invalid email"),
  phone: z.string().min(6, "min length > 6"),
  mobile: z.string().min(6, "min length > 6"),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
  designation: z.string(),
  companyid: z.number(),
});

const getCompanyId = (company: any) =>
  company?.companyid ?? company?.id ?? company?.companyId;

const getEmployeeCompanyId = (employee: any) =>
  employee?.companyid ??
  employee?.company?.id ??
  employee?.company?.companyid ??
  employee?.company?.companyId;

export default function EmployeeFormModal({ open, onClose, data }: any) {
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
      name: "",
      email: "",
      phone: "",
      mobile: "",
      isActive: true,
      isDeleted: false,
      companyid: undefined,
      designation: "",
    },
  });

  const { data: companies = [] } = useCompanies();
  const ownerCompany = companies.find((company: any) => company.isOwner);
  const defaultCompanyId = ownerCompany ? getCompanyId(ownerCompany) : undefined;
  const isCompanyDropdownDisabled = Boolean(ownerCompany);

  const { data: subareas = [] } = useSubareas();
  const [selectedSubareas, setSelectedSubareas] = useState<any[]>([]);

  const { mutateAsync: createEmployee } = useCreateEmployee();
  const { mutateAsync: updateEmployee } = useUpdateEmployee();
  const { mutateAsync: assignSubareas } = useCreateEmployeeSubarea();

  const selectedDesignation = watch("designation");

  useEffect(() => {
    if (companies.length === 0) return;

    if (data) {
      if (subareas.length === 0) return; // 🔥 WAIT

      // ✅ RESET FORM FOR EDIT
      reset({
        name: data.name,
        email: data.email,
        phone: data.phone,
        mobile: data.mobile,
        designation: data.designation || "",
        isActive: Boolean(data.isActive),
        isDeleted: Boolean(data.isDeleted),
        companyid: getEmployeeCompanyId(data) || defaultCompanyId,
      });

      // ✅ SET SUBAREAS FOR EDIT
      const perms =
        data?.employeeSubAreas?.map((item: any) => ({
          value: Number(item.subarea?.subareaid),
          label: item.subarea?.area?.name + " - " + item.subarea?.name,
        })) || [];

      setSelectedSubareas(perms);
      return;
    }

    // ✅ RESET FORM FOR CREATE
    reset({
      name: "",
      email: "",
      phone: "",
      mobile: "",
      designation: "",
      isActive: true,
      isDeleted: false,
      companyid: defaultCompanyId,
    });
  }, [data, companies, defaultCompanyId, subareas.length, reset]);

  // 🎯 convert subareas for dropdown
  const options = subareas.map((p: any) => ({
    value: Number(p.subareaid),
    label: p.area?.name + " - " + p.name,
  }));

  const companyOptions = companies.map((c: any) => ({
    value: getCompanyId(c),
    label: c.name,
  }));

  const designationOptions = [
    { value: "salesman", label: "Salesman" },
    { value: "marketing", label: "Marketing" },
    { value: "accounts", label: "Accounts" },
    { value: "support", label: "Support" },
  ];

  const onSubmit = async (formData: any) => {
    try {
      let employeeId = data?.employeeid;

      console.log("FORM DATA", formData);

      // ✅ CREATE / UPDATE EMPLOYEE
      if (data?.employeeid) {
        await updateEmployee({
          employeeid: data.employeeid, // ✅ correct key
          data: formData,
        });
      } else {
        const res = await createEmployee(formData);

        //console.log("CREATE RESPONSE", res);

        employeeId = res?.employeeid || res?.id; // ✅ FIX
      }

      // 🚨 SAFETY CHECK
      if (!employeeId) {
        throw new Error("Employee ID is missing");
      }

      console.log("Selected Subareas", selectedSubareas);

      // ✅ PREPARE SUBAREA IDS
      const subareaIds = selectedSubareas.map((p) => p.value);

      // ✅ ASSIGN SUBAREAS
      if (selectedSubareas.length > 0) {
        await assignSubareas({
          employeeId: employeeId, // ✅ correct key
          subareaIds: subareaIds, // ✅ correct key
        });
      }

      console.log("Employee saved with ID:", employeeId);

      toast.success("Employee saved successfully");
      onClose();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || err.message || "Failed");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      width="max-w-4xl"
      title={data ? "Edit Employee" : "Add Employee"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* EMPLOYEE NAME */}
          <div>
            <input
              {...register("name")}
              placeholder="Employee Name"
              className="input"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">
                {errors.name.message as string}
              </p>
            )}
          </div>

          {/* EMPLOYEE EMAIL */}
          <div>
            <input
              {...register("email")}
              placeholder="Employee Email"
              className="input"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">
                {errors.email.message as string}
              </p>
            )}
          </div>
          {/* EMPLOYEE PHONE */}
          <div>
            <input
              {...register("phone")}
              placeholder="Employee Phone"
              className="input"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">
                {errors.phone.message as string}
              </p>
            )}
          </div>

          {/* EMPLOYEE MOBILE */}
          <div>
            <input
              {...register("mobile")}
              placeholder="Employee Mobile"
              className="input"
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs">
                {errors.mobile.message as string}
              </p>
            )}
          </div>

          {/* EMPLOYEE DESIGNATION */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">
              Designation
            </label>

            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <Select
                  options={designationOptions}
                  // ✅ VERY IMPORTANT
                  value={
                    designationOptions.find((o) => o.value === field.value) ||
                    null
                  }
                  onChange={(val: any) => field.onChange(val?.value)}
                  className="text-black"
                  placeholder="Select designation..."
                />
              )}
            />

            {errors.designation && (
              <p className="text-red-500 text-xs">
                {errors.designation.message as string}
              </p>
            )}
          </div>

          {/* 🔥 COMPANY DROPDOWN */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Company</label>
            <Controller
              name="companyid"
              control={control}
              render={({ field }) => (
                <Select
                  options={companyOptions}
                  value={
                    companyOptions.find(
                      (o: { value: number }) =>
                        Number(o.value) === Number(field.value),
                    ) || null
                  }
                  onChange={(val: any) => field.onChange(val?.value)}
                  isDisabled={isCompanyDropdownDisabled}
                  className="text-black"
                  placeholder="Select company..."
                />
              )}
            />

            {errors.companyid && (
              <p className="text-red-500 text-xs">
                {errors.companyid.message as string}
              </p>
            )}
          </div>

          {/* 🔥 MULTI SELECT SUBAREAS */}

          {selectedDesignation === "salesman" && (
            <>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">
                  Subareas
                </label>

                <Select
                  key={selectedSubareas.length} // 🔥 FORCE REFRESH
                  isMulti
                  options={options}
                  value={selectedSubareas}
                  onChange={(val) => setSelectedSubareas(val as any)}
                  className="text-black"
                  placeholder="Select Subareas..."
                />
              </div>
            </>
          )}

          {/* STATUS CONTROLS */}
          <div className="flex flex-col gap-3 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("isActive")}
                className="checkbox"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>

            <input
              type="hidden"
              value="false"
              {...register("isDeleted")}
            />
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
        </div>
      </form>
    </Modal>
  );
}
