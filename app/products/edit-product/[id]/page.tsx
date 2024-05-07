"use client";

import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useRouter } from "next/navigation";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import type {
  Brand,
  Option,
  Product,
  ProductCategory,
  ProductType,
} from "@/components/Types";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import axios from "axios";

type FormInput = Omit<Product, "id" | "createdAt" | "quantity" | "isActive">;

export default function EditProductPage() {
  const [product, setProduct] = useState<Product>({} as Product);
  const [imageUrl, setImageUrl] = useState<string>(product.image);
  const [typeOptions, setTypeOptions] = useState<Option[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [brandOptions, setBrandOptions] = useState<Option[]>([]);
  const [unitOptions, setUnitOptions] = useState<Option[]>([]);

  const params = useParams();

  const { register, handleSubmit, reset, formState, control, watch } =
    useForm<FormInput>({
      defaultValues: {
        ...product,
        updatedAt: new Date(),
      },
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const router = useRouter();
  const watchCost = watch("cost");

  const onSubmit = async (data: FormInput) => {
    try {
      const newData = { ...data, image: imageUrl };

      const response = await axios.patch(
        `http://localhost:5000/products/${params?.id}`,
        newData
      );

      if (response.status === 200) {
        toast.success("Product Edited Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/products/${params?.id}`
        );
        setProduct(data);
        setImageUrl(data.image);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [params?.id]);

  useEffect(() => {
    try {
      // Fetch product types
      const fetchTypeOptions = async () => {
        const { data } = await axios.get("http://localhost:5000/types");
        const options = data.map((option: ProductType) => ({
          label: option.name,
          value: option.name,
        }));
        setTypeOptions(options);
      };
      fetchTypeOptions();

      // Fetch product categories
      const fetchCategoryOptions = async () => {
        const { data } = await axios.get("http://localhost:5000/categories");
        const options = data.map((option: ProductCategory) => ({
          label: option.name,
          value: option.name,
        }));
        setCategoryOptions(options);
      };
      fetchCategoryOptions();

      // Fetch product brands
      const fetchBrandOptions = async () => {
        const { data } = await axios.get("http://localhost:5000/brands");
        const options = data.map((option: Brand) => ({
          label: option.name,
          value: option.name,
        }));
        setBrandOptions(options);
      };
      fetchBrandOptions();

      // Fetch product units
      const fetchUnitOptions = async () => {
        const { data } = await axios.get("http://localhost:5000/units");
        const options = data.map((option: Brand) => ({
          label: option.name,
          value: option.code,
        }));
        setUnitOptions(options);
      };
      fetchUnitOptions();
    } catch (error) {
      console.error(error);
    }
  }, []);

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
          Edit Product
        </Typography>
        <Button
          onClick={router.back}
          variant="contained"
          className="flex flex-row items-center justify-center gap-1 bg-primaryColor/95 text-white hover:bg-primaryColor"
        >
          <ArrowBackIcon />
          <span className="text-white font-medium capitalize sm:text-lg">
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
                    className="object-cover w-full h-full rounded-lg"
                  />
                )}
              </div>
              <CldUploadWidget
                uploadPreset="prime-gene-biomedical-solutions"
                options={{
                  multiple: false,
                  clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "svg"],
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
                      Upload New Image
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
                    defaultValue={product?.name}
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
                    defaultValue={product?.code}
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
                    defaultValue={product?.type}
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
                    defaultValue={product?.category}
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
                    defaultValue={product?.cost}
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
                    defaultValue={product?.price}
                    {...register("price", {
                      required: "Product Price is required",
                      valueAsNumber: true,
                      min: {
                        value: watchCost || product.cost,
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
                    defaultValue={product?.brand}
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
                    defaultValue={product?.unit}
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
            defaultValue={product?.description}
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
                defaultValue={product?.alertQuantity}
                variant="outlined"
                inputProps={{ min: 1 }}
                {...register("alertQuantity", {
                  required: true,
                  valueAsNumber: true,
                  validate: (value) => value > 0,
                  min: {
                    value: 1,
                    message: "Alert Quantity cannot be Zero",
                  },
                })}
                error={!!errors.alertQuantity}
                helperText={errors.alertQuantity?.message}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center justify-end mt-10 sm:mt-16">
          <Button
            className="cancelBtn"
            variant="contained"
            size="large"
            onClick={() => (reset(), setImageUrl(product.image))}
          >
            Cancel
          </Button>
          <Button
            className="saveBtn"
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
}
