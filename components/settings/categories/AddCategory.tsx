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
import axios from "axios";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<ProductCategory, "id" | "isActive" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  code: "",
  description: "",
  parentCategory: "",
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
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onSubmit = async (data: FormInput) => {
    if (data.image.length > 0) {
      const imageFile = data.image[0];

      const formData = new FormData();
      formData.append("file", imageFile);

      formData.append("upload_preset", "prime-gene-bio-solutions");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dykyxconb/image/upload",
          formData
        );
        setImageUrl(response.data.secure_url);
        console.log(imageUrl);
      } catch (error) {
        console.error(error);
      }
    } else {
      setImageUrl(null);
      console.log(imageUrl);
    }

    // Handle form data and cloudinary image url with corresponding API call
    console.log({ ...data, image: imageUrl });
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
      setPreviewImage(null);
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setPreviewImage(null);
    }
    console.log(isSubmitSuccessful);
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
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="parentCategory">
                  <span className="text-primaryDark font-semibold">
                    Parent Category
                  </span>
                </label>
                <FormInputDropdown
                  name="parentCategory"
                  control={control}
                  label="Parent Category"
                  options={options}
                />
              </div>
              <label htmlFor="image">
                <span className="text-primaryDark font-semibold">Image</span>
              </label>
              <div className="flex flex-row gap-4 items-center">
                <div>
                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={100}
                      height={80}
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
            variant="outlined"
            size="large"
            onClick={() => (reset(), setPreviewImage(null))}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
