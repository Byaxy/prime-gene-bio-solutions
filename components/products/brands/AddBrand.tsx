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
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { DB, ID } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<Brand, "id" | "createdAt" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  code: "",
  image: "",
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
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.jpg");

  const onSubmit = async (data: FormInput) => {
    try {
      const formData = { ...data, image: imageUrl };

      await DB.createDocument(
        config.appwriteDatabaseId,
        config.appwriteProductBrandsCollectionId,
        ID.unique(),
        formData
      ).then(() => {
        toast.success("Brand Added Successfully");
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setImageUrl("/placeholder.jpg");
      handleClose();
    }
  }, [handleClose, isSubmitSuccessful, reset]);

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
            <span>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </span>
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
                        className="capitalize saveBtn"
                        onClick={() => open()}
                      >
                        Upload Image
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
            size="large"
            variant="contained"
            onClick={() => (reset(), setImageUrl("/placeholder.jpg"))}
            className="cancelBtn"
          >
            Cancel
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
