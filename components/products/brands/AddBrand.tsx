import React, { ReactNode, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { Brand } from "@/components/Types";
import Image from "next/image";
import axios from "axios";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<Brand, "id" | "isActive" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  code: "",
  image: "",
  createdAt: new Date(),
};

type AddBrandProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddBrand({
  open,
  handleClose,
}: AddBrandProps): ReactNode {
  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [previewImage, setPreviewImage] = useState<string>("/placeholder.jpg");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onSubmit = async (data: FormInput) => {
    const formData = new FormData();
    const { image, ...rest } = data;
    formData.append("json", JSON.stringify(rest));
    if (image) formData.append("image", image[0]);
    await fetch("/api/product-brand/add", {
      method: "POST",
      body: formData,
    });
  };

  // Set selected Image for preview
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

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setPreviewImage("/placeholder.jpg");
    }
    console.log(isSubmitSuccessful);
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">Add Brand</span>
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
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name">
                <span className="text-primaryDark font-semibold">Name</span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="name"
                type="text"
                label="Name"
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <label htmlFor="code">
                <span className="text-primaryDark font-semibold">Code</span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="code"
                type="text"
                label="Code"
                {...register("code", {
                  required: "Code is required",
                })}
                error={!!errors.code}
                helperText={errors.code?.message}
              />
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold">Image</span>
              </label>
              <div className="flex flex-row gap-2 items-center">
                <div>
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={100}
                      height={100}
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
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            variant="contained"
            onClick={() => (reset(), setPreviewImage("/placeholder.jpg"))}
            className="font-bold bg-redColor/95 hover:bg-redColor text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
            className="font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
