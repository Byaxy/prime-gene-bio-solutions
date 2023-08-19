import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { Product } from "../Types";
import Image from "next/image";
import { FormInputDropdown } from "../form-components/FormInputDropdown";

type FormInput = Omit<Product, "id" | "updatedAt" | "isActive">;

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
  quantity: 0,
  createdAt: new Date(),
};

type AddProductProps = {
  open: boolean;
  handleClose: () => void;
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

export default function AddProduct({ open, handleClose }: AddProductProps) {
  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onSubmit = async (data: FormInput) => {
    try {
      const formData = new FormData();
      const { image, gallery, ...rest } = data;
      formData.append("product", JSON.stringify(rest));
      if (image.length) formData.append("product-main-img", image[0]);
      for (let i = 0; i < gallery.length; i++) formData.append("product-gallery-" + i, gallery[i]);
      const response = await fetch("/api/product/add", {
        method: "POST",
        body: formData
      });
      handleClose();
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
      setPreviewImage(null);
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
      setPreviewImage(null);
      setGalleryImages([]);
    }
    console.log(isSubmitSuccessful);
  }, [isSubmitSuccessful, reset]);
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add Product
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-5">
            <p>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </p>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="name">
                    <span className="text-primaryDark font-semibold">
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
                    <span className="text-primaryDark font-semibold">
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
                    <span className="text-primaryDark font-semibold">
                      Product Type
                    </span>
                  </label>
                  <FormInputDropdown
                    name="type"
                    control={control}
                    label="Product Type"
                    options={options}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="category">
                    <span className="text-primaryDark font-semibold">
                      Product Category
                    </span>
                  </label>
                  <FormInputDropdown
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
                    <span className="text-primaryDark font-semibold">
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
                    <span className="text-primaryDark font-semibold">
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
                    <span className="text-primaryDark font-semibold">
                      Product Brand
                    </span>
                  </label>
                  <FormInputDropdown
                    name="brand"
                    control={control}
                    label="Product Type"
                    options={options}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="unit">
                    <span className="text-primaryDark font-semibold">
                      Product Unit
                    </span>
                  </label>
                  <FormInputDropdown
                    name="unit"
                    control={control}
                    label="Product Category"
                    options={options}
                  />
                </div>
              </div>
              <label htmlFor="description">
                <span className="text-primaryDark font-semibold">
                  Product Details
                </span>
              </label>
              <TextField
                id="description"
                label="Product Details"
                multiline
                rows={4}
                {...register("description")}
              />
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="quantity">
                    <span className="text-primaryDark font-semibold">
                      Product Quantity
                    </span>
                  </label>
                  <TextField
                    id="quantity"
                    type="number"
                    label="Product Quantity"
                    variant="outlined"
                    {...register("quantity")}
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2 flex-[1.5]">
                  <label htmlFor="alertQuantity">
                    <span className="text-primaryDark font-semibold">
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
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold">
                  Product Profile Image
                </span>
              </label>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div>
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={120}
                      height={120}
                    />
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
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold">
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            onClick={() => (
              reset(), setPreviewImage(null), setGalleryImages([])
            )}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
