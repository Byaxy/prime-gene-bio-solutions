"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import type { Product } from "@/components/Types";
import { useForm } from "react-hook-form";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { config } from "@/config/config";
import { editProduct } from "@/server/actions/products";
import useBrandOptions from "@/utils/hooks/useBrandOptions";
import useUnitOptions from "@/utils/hooks/useUnitOptions";
import useCategoryOptions from "@/utils/hooks/useCategoryOptions";
import useTypeOptions from "@/utils/hooks/useTypeOptions";
import Image from "next/image";

type FormInput = Omit<Product, "id" | "createdAt">;

type EditProductProps = {
  open: boolean;
  handleClose: () => void;
  product: Product;
};

export default function EditProduct({
  open,
  handleClose,
  product,
}: EditProductProps) {
  const [imageUrl, setImageUrl] = useState<string>(product.image);

  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: {
        code: product.code,
        name: product.name,
        image: product.image,
        brand: product.brand,
        type: product.type,
        unit: product.unit,
        category: product.category,
        description: product.description,
        alertQuantity: 5,
        updatedAt: new Date(),
      },
    });
  const { errors, isSubmitting } = formState;

  // fetch types options, categories options, brands options and units options
  const { data: brandOptions } = useBrandOptions();
  const { data: unitOptions } = useUnitOptions();
  const { data: categoryOptions } = useCategoryOptions();
  const { data: typeOptions } = useTypeOptions();

  // submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const newData = {
        ...data,
        image: imageUrl,
      };

      const response = await editProduct(newData, product.id);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Product updated successfully");
        // Clear form values
        reset({}, { keepDefaultValues: true });
        setImageUrl("");
        handleClose();
      }
    } catch (error) {
      console.error("Error updating Product:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Edit Product
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-5">
            <span>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </span>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-end justify-start">
                <div className="flex flex-col gap-5">
                  <FormLabel htmlFor="image">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Image
                    </span>
                  </FormLabel>
                  {product.image ? (
                    <CldImage
                      className="rounded"
                      src={imageUrl}
                      alt="Product Image"
                      height={300}
                      width={300}
                    />
                  ) : (
                    <Image
                      src={imageUrl ? imageUrl : "/placeholder.jpg"}
                      alt="Preview"
                      width={300}
                      height={300}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  )}
                </div>
                <CldUploadWidget
                  uploadPreset={config.cloudinaryUploadPreset}
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

              <div className="flex flex-col gap-5 mt-5">
                <div className="flex flex-col sm:flex-row gap-5 w-full">
                  <div className="flex flex-col gap-2 flex-1">
                    <FormLabel htmlFor="name">
                      <span className="text-primaryDark font-semibold text-xl">
                        Product Name
                      </span>
                      <span className="text-redColor"> *</span>
                    </FormLabel>
                    <TextField
                      id="name"
                      type="text"
                      label="Product Name"
                      defaultValue={product.name}
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
                    <FormLabel htmlFor="code">
                      <span className="text-primaryDark font-semibold text-xl">
                        Product Code
                      </span>
                      <span className="text-redColor"> *</span>
                    </FormLabel>
                    <TextField
                      id="code"
                      type="text"
                      label="Product Code"
                      defaultValue={product.code}
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
                    <FormLabel htmlFor="type">
                      <span className="text-primaryDark font-semibold text-xl">
                        Product Type
                      </span>
                      <span className="text-redColor"> *</span>
                    </FormLabel>
                    <FormInputDropdown
                      id="type"
                      control={control}
                      label="Product Type"
                      options={typeOptions?.success || null}
                      defaultValue={product.type}
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
                    <FormLabel htmlFor="category">
                      <span className="text-primaryDark font-semibold text-xl">
                        Product Category
                      </span>
                      <span className="text-redColor"> *</span>
                    </FormLabel>
                    <FormInputDropdown
                      id="category"
                      control={control}
                      label="Product Category"
                      options={categoryOptions?.success || null}
                      defaultValue={product.category}
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
                    <FormLabel htmlFor="brand">
                      <span className="text-primaryDark font-semibold text-xl">
                        Product Brand
                      </span>
                      <span className="text-redColor"> *</span>
                    </FormLabel>
                    <FormInputDropdown
                      id="brand"
                      control={control}
                      label="Product Type"
                      options={brandOptions?.success || null}
                      defaultValue={product.brand}
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
                    <FormLabel htmlFor="unit">
                      <span className="text-primaryDark font-semibold text-xl">
                        Product Unit
                      </span>
                      <span className="text-redColor"> *</span>
                    </FormLabel>
                    <FormInputDropdown
                      id="unit"
                      control={control}
                      label="Product Category"
                      options={unitOptions?.success || null}
                      defaultValue={product.unit}
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

              <FormLabel htmlFor="description">
                <span className="text-primaryDark font-semibold text-xl">
                  Product Details
                </span>
              </FormLabel>
              <TextField
                id="description"
                label="Product Details"
                multiline
                rows={6}
                defaultValue={product.description}
                {...register("description")}
              />
              <div className="flex flex-col sm:flex-row gap-5 w-full mt-2">
                <div className="flex flex-col gap-2">
                  <FormLabel htmlFor="alertQuantity">
                    <span className="text-primaryDark font-semibold text-xl">
                      Alert Quantity
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="alertQuantity"
                    type="number"
                    label="Alert Quantity"
                    variant="outlined"
                    defaultValue={product.alertQuantity}
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            variant="contained"
            onClick={() => (reset(), setImageUrl(product.image))}
            className="cancelBtn"
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
            className="saveBtn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
