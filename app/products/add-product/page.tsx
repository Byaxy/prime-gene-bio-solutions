"use client";

import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import type { Product } from "@/components/Types";
import { useForm } from "react-hook-form";

type FormInput = Omit<Product, "id" | "updatedAt" | "isActive" | "stock">;

const defaultValues: FormInput = {
  code: "",
  name: "",
  image: "",
  gallery: [],
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

const options = [
  {
    label: "Purchase",
    value: "Purchase",
  },
  {
    label: "Office Maintenance",
    value: "Office Maintenance",
  },
  {
    label: "Transportation",
    value: "Transportation",
  },
  {
    label: "Salary",
    value: "Salary",
  },
];

export default function AddProductPage() {
  const router = useRouter();

  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [galleryImages, setGalleryImages] = useState<string[]>([
    "/placeholder.jpg",
  ]);
  const [previewImage, setPreviewImage] = useState<string>("/placeholder.jpg");

  const onSubmit = async (data: FormInput) => {
    try {
      const formData = new FormData();
      const { image, gallery, ...rest } = data;
      formData.append("product", JSON.stringify(rest));
      if (image.length) formData.append("product-main-img", image[0]);
      for (let i = 0; i < gallery.length; i++)
        formData.append("product-gallery-" + i, gallery[i]);
      const response = await fetch("/api/product/add", {
        method: "POST",
        body: formData,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage("/placeholder.jpg");
    }
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const loadImage = (file: File) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      };

      Promise.all(Array.from(files).map(loadImage)).then((galleryImages) => {
        setGalleryImages(galleryImages);
      });
    } else {
      setGalleryImages([]);
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setPreviewImage("/placeholder.jpg");
      setGalleryImages(["/placeholder.jpg"]);
    }
    console.log(isSubmitSuccessful);
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
            <div className="flex flex-col gap-4 items-center">
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold text-xl">
                  Product Profile Image
                </span>
              </label>
              <div className="relative mt-5 w-[min(100%,17.5rem)] h-[12.5rem] sm:h-[17.5rem] object-cover">
                {previewImage && (
                  <Image src={previewImage} alt="Preview" fill />
                )}
              </div>
              <TextField
                id="image"
                type="file"
                variant="outlined"
                {...register("image")}
                onChange={handleImageChange}
                inputProps={{ accept: "image/*", multiple: false }}
              />
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
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
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
                    error={!!errors.code}
                    helperText={errors.code?.message}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="type">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Type
                    </span>
                  </label>
                  <FormInputDropdown
                    id="type"
                    name="type"
                    control={control}
                    label="Product Type"
                    options={options}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="category">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Category
                    </span>
                  </label>
                  <FormInputDropdown
                    id="category"
                    name="category"
                    control={control}
                    label="Product Category"
                    options={options}
                  />
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
                    {...register("cost", {
                      required: true,
                      valueAsNumber: true,
                      validate: (value) => value > 0,
                    })}
                    error={!!errors.cost}
                    helperText={
                      errors.cost
                        ? "Product Cost is required and cannot be Zero"
                        : ""
                    }
                  />
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
                    {...register("price", {
                      required: true,
                      valueAsNumber: true,
                      validate: (value) => value > 0,
                    })}
                    error={!!errors.price}
                    helperText={
                      errors.price
                        ? "Product Price is required and cannot be Zero"
                        : ""
                    }
                  />
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
                    name="brand"
                    control={control}
                    label="Product Type"
                    options={options}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="unit">
                    <span className="text-primaryDark font-semibold text-xl">
                      Product Unit
                    </span>
                  </label>
                  <FormInputDropdown
                    id="unit"
                    name="unit"
                    control={control}
                    label="Product Category"
                    options={options}
                  />
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
            <div className="flex flex-col gap-2 flex-[3]">
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold text-xl">
                  Product Gallery
                </span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-wrap gap-2">
                  {galleryImages &&
                    galleryImages.map((galleryImage) => (
                      <Image
                        key={galleryImage}
                        src={galleryImage}
                        alt="Preview"
                        width={80}
                        height={80}
                      />
                    ))}
                </div>
                <TextField
                  id="image"
                  type="file"
                  variant="outlined"
                  {...register("gallery")}
                  onChange={handleGalleryChange}
                  inputProps={{ accept: "image/*", multiple: true }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
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
            onClick={() => (
              reset(),
              setPreviewImage("/placeholder.jpg"),
              setGalleryImages(["/placeholder.jpg"])
            )}
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
}
