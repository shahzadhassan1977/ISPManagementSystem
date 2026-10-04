"use client";

import Modal from "@/components/ui/Modal";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProduct, useUpdateProduct, useCreateProductDetail, useUpdateProductDetail } from "../hooks/useProducts";
import { useCompanies } from "@/modules/company/hooks/useCompany";
import { toast } from "sonner";
import { useEffect } from "react";
// removed unused import
import Select from "react-select";

const schema = z.object({
  name: z.string().min(2, "min legnth > 2"),
  salePrice: z.coerce.number().min(1),
  purchasePrice: z.coerce.number().min(1),
  package: z.string().min(1, "Package is required"),
  bandwidth: z.string().min(1, "Bandwidth is required"),
  companyid: z.number().optional(), 
  isActive: z.boolean(),
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
          : data?.productdetails?.[0]?.companyId
          ? Number(data.productdetails[0].companyId)
          : undefined,

          // productdetails is an array on the API; pick the first detail when editing
          package: data?.productdetails?.[0]?.package || "",

          bandwidth: data?.productdetails?.[0]?.bandwidth || "",

        isActive: !!data.isActive,

        isDeleted: !!data.isDeleted,
      });
    }
  }, [data, reset]);



  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { data: companies = [] } = useCompanies();
  const { mutateAsync: createProductDetail } =  useCreateProductDetail();
  const { mutateAsync: updateProductDetail } = useUpdateProductDetail();

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
        isDeleted: data?.isDeleted ?? false,
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
        productId: productId as number,
        companyId: formData.companyid,
        package: formData.package,
        bandwidth: formData.bandwidth,
        isActive: formData.isActive,
        isDeleted: data?.productdetails?.[0]?.isDeleted ?? false,
      };

      // 🔥 STORE / UPDATE PRODUCT DETAIL
      const existingDetailId = data?.productdetails?.[0]?.id;
      if (existingDetailId) {
        await updateProductDetail({ id: existingDetailId, data: detailPayload });
      } else {
        await createProductDetail(detailPayload);
      }

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
          <label htmlFor="product-name" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Product name</label>
          <input
            id="product-name"
            {...register("name")}
            placeholder="Enter product name"
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
          <label htmlFor="product-sale-price" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Sale price</label>
          <input
            id="product-sale-price"
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
          <label htmlFor="product-purchase-price" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Purchase price</label>
          <input
            id="product-purchase-price"
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
          <label htmlFor="product-package" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Package</label>
          <input
            id="product-package"
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
          <label htmlFor="product-bandwidth" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-200">Bandwidth</label>
          <input
            id="product-bandwidth"
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

        {/* ACTIVE */}
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
        <div className="crud-form-actions flex justify-end gap-2 mt-4">
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