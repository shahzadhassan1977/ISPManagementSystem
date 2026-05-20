"use client";

import Modal from "@/components/ui/Modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct, useUpdateProduct, useCreateProductDetail } from "../hooks/useProducts";
import { useCompanies } from "@/modules/company/hooks/useCompany";
import { toast } from "sonner";
import { useEffect } from "react";
import { is } from "zod/locales";
import Select from "react-select";

const schema = z.object({
  name: z.string().min(2, "min legnth > 2"),
  salePrice: z.coerce.number().min(1),
  purchasePrice: z.coerce.number().min(1),
  package: z.string().min(1, "Package is required"),
  bandwidth: z.string().min(1, "Bandwidth is required"),
  companyid: z.number(), 
  // ✅ FIX HERE
  isActive: z.boolean(),
  isDeleted: z.boolean(),
});

export default function ProductFormModal({ open, onClose, data }: any) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      salePrice: 0,
      purchasePrice: 0,
      package: "",
      bandwidth: "",
      companyid: undefined,
      isActive: true,
      isDeleted: false,
    },
  });

  
  // useEffect(() => {
  //   if (data) reset(data);
  // }, [data, reset]);


   useEffect(() => {
    if (data) {
      reset({
        ...data,

        companyid: data.companyid
          ? Number(data.companyid)
          : undefined,

        package: data?.productDetail?.package || "",

        bandwidth: data?.productDetail?.bandwidth || "",

        isActive: !!data.isActive,

        isDeleted: !!data.isDeleted,
      });
    }
  }, [data, reset]);



  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { data: companies = [] } = useCompanies();
  const { mutateAsync: createProductDetail } =  useCreateProductDetail();

   // 🔥 COMPANY OPTIONS
  const companyOptions = companies.map((c: any) => ({
    value: c.companyid,
    label: c.name,
  }));

  const onSubmit = async (formData: any) => {
    try {
      let productId = data?.productid;

      // 🔥 PRODUCT PAYLOAD
      const productPayload = {
        name: formData.name,
        salePrice: formData.salePrice,
        purchasePrice: formData.purchasePrice,
        isActive: formData.isActive,
        isDeleted: formData.isDeleted,
      };

      // 🔥 CREATE / UPDATE PRODUCT
      if (data?.productid) {
        await updateProduct({
          productid: data.productid,
          data: productPayload,
        });
      } else {
        const res = await createProduct(productPayload);

        productId = res?.productid || res?.id;
      }

      if (!productId) {
        throw new Error("Product ID not found");
      }

      // 🔥 PRODUCT DETAIL PAYLOAD
      const detailPayload = {
        productid: productId,
        companyId: formData.companyid,
        package: formData.package,
        bandwidth: formData.bandwidth,
      };

      // 🔥 STORE PRODUCT DETAIL
      await createProductDetail(detailPayload);

      toast.success(
        data?.productid
          ? "Product updated successfully"
          : "Product created successfully"
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
      title={data ? "Edit Product" : "Add Product"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        {/* PRODUCT NAME */}
        <div>
          <input
            {...register("name")}
            placeholder="Product Name"
            className="input"
          />

          {errors.name && (
            <p className="text-red-500 text-xs">
              {errors.name.message as string}
            </p>
          )}
        </div>

        {/* SALE PRICE */}
        <div>
          <input
            type="number"
            {...register("salePrice")}
            placeholder="Sale Price"
            className="input"
          />

          {errors.salePrice && (
            <p className="text-red-500 text-xs">
              {errors.salePrice.message as string}
            </p>
          )}
        </div>

        {/* PURCHASE PRICE */}
        <div>
          <input
            type="number"
            {...register("purchasePrice")}
            placeholder="Purchase Price"
            className="input"
          />

          {errors.purchasePrice && (
            <p className="text-red-500 text-xs">
              {errors.purchasePrice.message as string}
            </p>
          )}
        </div>

        {/* COMPANY */}
        <div>
          <label className="text-sm text-gray-500 mb-1 block">
            Company
          </label>

          <Controller
            name="companyid"
            control={control}
            render={({ field }) => (
              <Select
                options={companyOptions}
                value={
                  companyOptions.find(
                    (o: any) =>
                      o.value === Number(field.value)
                  ) || null
                }
                onChange={(val: any) =>
                  field.onChange(val?.value)
                }
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

        {/* PACKAGE */}
        <div>
          <input
            {...register("package")}
            placeholder="Package"
            className="input"
          />

          {errors.package && (
            <p className="text-red-500 text-xs">
              {errors.package.message as string}
            </p>
          )}
        </div>

        {/* BANDWIDTH */}
        <div>
          <input
            {...register("bandwidth")}
            placeholder="Bandwidth"
            className="input"
          />

          {errors.bandwidth && (
            <p className="text-red-500 text-xs">
              {errors.bandwidth.message as string}
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

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              {...register("isDeleted")}
              className="checkbox"
            />

            <span>Deleted</span>
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