"use client";

import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useRouter } from "next/navigation";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import type { Option, Product } from "@/components/Types";
import { useForm } from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { DB, query } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

type FormInput = Omit<Product, "id" | "createdAt" | "quantity" | "isActive">;

export default function EditProductPage() {
  const [product, setProduct] = useState<Product>({} as Product);
  const [imageUrl, setImageUrl] = useState<string>(product.image);
  const [typeOptions, setTypeOptions] = useState<Option[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [brandOptions, setBrandOptions] = useState<Option[]>([]);
  const [unitOptions, setUnitOptions] = useState<Option[]>([]);

  const params = useParams();

  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: {
        ...product,
      },
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;

  const router = useRouter();
  const productId = params?.id;

  // handle submit
  const onSubmit = async (data: FormInput) => {
    try {
      const formData = { ...data, image: imageUrl };

      await DB.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteProductsCollectionId,
        productId as string,
        formData
      ).then(() => {
        toast.success("Product Edited Successfully");
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await DB.getDocument(
          config.appwriteDatabaseId,
          config.appwriteProductsCollectionId,
          productId as string
        );

        const product = {
          id: response.$id,
          code: response.code,
          name: response.name,
          image: response.image,
          brand: response.brand ? response.brand.name : null,
          type: response.type.name ? response.type.name : null,
          unit: response.unit.name ? response.unit.name : null,
          category: response.category ? response.category.name : null,
          description: response.description,
          alertQuantity: response.alertQuantity,
          inventory: response.inventory,
          createdAt: response.$createdAt,
          updatedAt: response.$updatedAt,
        } as unknown as Product;

        setImageUrl(product.image);
        setProduct(product);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  // fetch types, categories, brands and units options
  useEffect(() => {
    try {
      // Fetch product types
      const fetchTypeOptions = async () => {
        try {
          const { documents } = await DB.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteProductTypesCollectionId,
            query
          );
          const options = documents.map((option: any) => ({
            label: option.name,
            value: option.$id,
          }));

          setTypeOptions(options);
        } catch (error) {
          console.error(error);
        }
      };
      fetchTypeOptions();

      // Fetch product categories
      const fetchCategoryOptions = async () => {
        try {
          const { documents } = await DB.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteProductCategoriesCollectionId,
            query
          );
          const options = documents.map((option: any) => ({
            label: option.name,
            value: option.$id,
          }));

          setCategoryOptions(options);
        } catch (error) {
          console.error(error);
        }
      };
      fetchCategoryOptions();

      // Fetch product brands
      const fetchBrandOptions = async () => {
        try {
          const { documents } = await DB.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteProductBrandsCollectionId,
            query
          );
          const options = documents.map((option: any) => ({
            label: option.name,
            value: option.$id,
          }));

          setBrandOptions(options);
        } catch (error) {
          console.error(error);
        }
      };
      fetchBrandOptions();

      // Fetch product units
      const fetchUnitOptions = async () => {
        try {
          const { documents } = await DB.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteProductUnitsCollectionId,
            query
          );
          const options = documents.map((option: any) => ({
            label: option.name,
            value: option.$id,
          }));

          setUnitOptions(options);
        } catch (error) {
          console.error(error);
        }
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
              <div className="relative mt-1 w-[min(100%,18rem)] h-[12.5rem] sm:h-[13rem] object-cover">
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
                      className="capitalize saveBtn"
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
