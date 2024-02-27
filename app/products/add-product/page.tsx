"use client";

import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import type { Product } from "@/components/Types";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { typesData } from "@/data/typesData";
import { categoriesData } from "@/data/categoriesData";
import { brandsData } from "@/data/brandsData";
import { unitsData } from "@/data/unitsData";

type FormInput = Omit<Product, "id" | "updatedAt" | "isActive" | "stock">;

const defaultValues: FormInput = {
  code: "",
  name: "",
  image: "",
  brand: "",
  type: "",
  unit: "",
  category: "",
  cost: 0,
  price: 0,
  description: "",
  alertQuantity: 5,
  createdAt: new Date(),
};
const typeOptions = typesData.map((type) => ({
  label: type.name,
  value: type.name,
}));

const categoryOptions = categoriesData.map((category) => ({
  label: category.name,
  value: category.name,
}));

const brandOptions = brandsData.map((brand) => ({
  label: brand.name,
  value: brand.name,
}));

const unitOptions = unitsData.map((unit) => ({
  label: unit.name,
  value: unit.name,
}));

const AddProductPage = () => {
  const router = useRouter();

  const { register, handleSubmit, reset, formState, control, watch } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.jpg");

  const watchCost = watch("cost");

  const onSubmit = async (data: FormInput) => {
    try {
      const formData = new FormData();
      const newData = { ...data, image: imageUrl };

      formData.append("json", JSON.stringify(newData));

      const response = await fetch("/api/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const result = await response.json();
      toast.success("Product added successfully");
      return result;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong try again later");
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setImageUrl("/placeholder.jpg");
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="bg-white w-full rounded-lg shadow-md px-5 pt-5 pb-8">
      <div className="flex items-center justify-between w-full gap-5">
        <Typography
          variant="h3"
          sx={{
            color: "#232a58",
            fontWeight: "bold",
            fontSize: "26px",
          }}
        >
          Add Product
        </Typography>
        <Button
          onClick={router.back}
          variant="outlined"
          className="flex flex-row items-center justify-center gap-1"
        >
          <ArrowBackIcon />
          <span className="text-primaryDark font-medium capitalize sm:text-lg">
            Back
          </span>
        </Button>
      </div>
      <div className="h-[2px] bg-mainColor w-full mt-5 mb-10 sm:mb-16 opacity-20" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-5 mb-2">
            <div className="flex flex-1 flex-col gap-4 items-center">
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold text-xl">
                  Product Image
                </span>
              </label>
              <div className="relative mt-1 w-[min(100%,18rem)] h-[12.5rem] sm:h-[20rem] object-cover">
                {imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
              <CldUploadWidget
                uploadPreset="prime-gene-biomedical-solutions"
                options={{
                  multiple: false,
                  clientAllowedFormats: ["jpg", "png", "webp", "svg"],
                  sources: ["local", "url", "dropbox", "google_drive"],
                }}
                onSuccess={(result) => {
                  if (result.info && typeof result.info !== "string") {
                    const url: string = result.info.secure_url;
                    setImageUrl(url);
                  }
                }}
              >
                {({ open }) => {
                  return (
                    <Button
                      variant="contained"
                      className="capitalize"
                      onClick={() => open()}
                    >
                      Upload an Image
                    </Button>
                  );
                }}
              </CldUploadWidget>
            </div>

            <div className="flex flex-col flex-[2] gap-5">
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="name">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Name
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="name"
                    type="text"
                    label="Product Name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <span className="text-redColor text-sm">
                      {errors.name?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="code">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Code
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="code"
                    type="text"
                    label="Product Code"
                    {...register("code", {
                      required: "Product Code is required",
                    })}
                  />
                  {errors.code && (
                    <span className="text-redColor text-sm">
                      {errors.code?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="type">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Type
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <FormInputDropdown
                    id="type"
                    control={control}
                    label="Product Type"
                    options={typeOptions}
                    {...register("type", {
                      required: "Product Type is required",
                    })}
                  />
                  {errors.type && (
                    <span className="text-redColor text-sm">
                      {errors.type?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="category">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Category
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <FormInputDropdown
                    id="category"
                    control={control}
                    label="Product Category"
                    options={categoryOptions}
                    {...register("category", {
                      required: "Product Category is required",
                    })}
                  />
                  {errors.category && (
                    <span className="text-redColor text-sm">
                      {errors.category?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="cost">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Cost
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="cost"
                    type="number"
                    label="Product Cost"
                    variant="outlined"
                    inputProps={{ min: 1 }}
                    defaultValue={1}
                    {...register("cost", {
                      required: "Product Cost is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Product Cost cannot be Zero",
                      },
                    })}
                  />
                  {errors.cost && (
                    <span className="text-redColor text-sm">
                      {errors.cost?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="price">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Price
                    </span>
                    <span className="text-redColor"> *</span>
                  </label>
                  <TextField
                    id="price"
                    type="number"
                    label="Product Price"
                    variant="outlined"
                    inputProps={{ min: 1 }}
                    defaultValue={watchCost || 1}
                    {...register("price", {
                      required: "Product Price is required",
                      valueAsNumber: true,
                      min: {
                        value: watchCost || 1,
                        message:
                          "Product Price cannot be less than Product Cost price",
                      },
                    })}
                  />
                  {errors.price && (
                    <span className="text-redColor text-sm">
                      {errors.price?.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="brand">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Brand
                    </span>
                  </label>
                  <FormInputDropdown
                    id="brand"
                    control={control}
                    label="Product Type"
                    options={brandOptions}
                    {...register("brand", {
                      required: "Product Brand is required",
                    })}
                  />
                  {errors.brand && (
                    <span className="text-redColor text-sm">
                      {errors.brand?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="unit">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Unit
                    </span>
                  </label>
                  <FormInputDropdown
                    id="unit"
                    control={control}
                    label="Product Category"
                    options={unitOptions}
                    {...register("unit", {
                      required: "Product Unit is required",
                    })}
                  />
                  {errors.unit && (
                    <span className="text-redColor text-sm">
                      {errors.unit?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <label htmlFor="description">
            <span className="text-primaryDark font-semibold text-xl">
              Product Details
            </span>
          </label>
          <TextField
            id="description"
            label="Product Details"
            multiline
            rows={6}
            {...register("description")}
          />
          <div className="flex flex-col sm:flex-row gap-5 w-full mt-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="alertQuantity">
                <span className="text-primaryDark font-semibold text-xl">
                  Alert Quantity
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="alertQuantity"
                type="number"
                label="Alert Quantity"
                variant="outlined"
                {...register("alertQuantity", {
                  required: true,
                  valueAsNumber: true,
                  validate: (value) => value > 0,
                })}
                error={!!errors.alertQuantity}
                helperText={
                  errors.price
                    ? "Alert Quantity is required and cannot be Zero"
                    : ""
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center justify-end mt-10 sm:mt-16">
          <Button
            className="font-bold bg-redColor/95 hover:bg-redColor text-white outline-redColor"
            variant="outlined"
            size="large"
            onClick={() => (reset(), setImageUrl("/placeholder.jpg"))}
          >
            Cancel
          </Button>
          <Button
            className="font-bold"
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
