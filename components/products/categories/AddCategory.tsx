import React, { ReactNode, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { ProductCategory } from "@/components/Types";
import Image from "next/image";
import toast from "react-hot-toast";
import { CldUploadWidget } from "next-cloudinary";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<ProductCategory, "id" | "isActive" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  code: "",
  description: "",
  image: "",
  createdAt: new Date(),
};

type AddCategoryProps = {
  open: boolean;
  handleClose: () => void;
};

const options = [
  {
    label: "Clinical Laboratory Solutions",
    value: "Clinical Laboratory Solutions",
  },
  {
    label: "Imaging Solutions",
    value: "Imaging Solutions",
  },
  {
    label: "Dental Solutions",
    value: "Dental Solutions",
  },
  {
    label: "Medical Solutions",
    value: "Medical Solutions",
  },
];
export default function AddCategory({
  open,
  handleClose,
}: AddCategoryProps): ReactNode {
  const { handleSubmit, reset, control, register, formState } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;
  const [imageUrl, setImageUrl] = useState<string | null>("/placeholder.jpg");

  const onSubmit = async (data: FormInput) => {
    try {
      const formData = new FormData();
      const newData = { ...data, image: imageUrl };

      formData.append("json", JSON.stringify(newData));

      const response = await fetch("/api/product-category/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const result = await response.json();
      toast.success("Category added successfully");
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
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Add Category
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
              <label htmlFor="description">
                <span className="text-primaryDark font-semibold">
                  Description
                </span>
                <span className="text-redColor"> *</span>
              </label>
              <TextField
                id="description"
                label="Description"
                multiline
                rows={3}
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold">Image</span>
              </label>
              <div className="flex flex-row gap-4 items-center">
                <div>
                  {imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imageUrl} alt="Preview" className="w-40 h-40" />
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
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            onClick={() => (reset(), setImageUrl("/placeholder.jpg"))}
            className="font-bold bg-redColor/95 hover:bg-redColor text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
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
