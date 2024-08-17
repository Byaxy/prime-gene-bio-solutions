import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { Brand } from "@/components/Types";
import { CldUploadWidget } from "next-cloudinary";
import toast from "react-hot-toast";
import { addBrand } from "@/server/actions/brands";
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

export default function AddBrand({ open, handleClose }: AddBrandProps) {
  const { register, handleSubmit, reset, formState } = useForm<FormInput>({
    defaultValues: defaultValues,
  });
  const { errors, isSubmitting } = formState;
  const [imageUrl, setImageUrl] = useState<string>("");

  // submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const newData = {
        ...data,
        image: imageUrl,
      };

      const response = await addBrand(newData);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Brand added successfully");
        reset({}, { keepDefaultValues: true });
        setImageUrl("");
        handleClose();
      }
    } catch (error) {
      console.error("Error adding Brand:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

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
              <FormLabel htmlFor="name">
                <span className="text-primaryDark font-semibold">Name</span>
                <span className="text-redColor"> *</span>
              </FormLabel>
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
              <FormLabel htmlFor="code">
                <span className="text-primaryDark font-semibold">Code</span>
                <span className="text-redColor"> *</span>
              </FormLabel>
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
              <FormLabel htmlFor="image">
                <span className="text-primaryDark font-semibold">Image</span>
              </FormLabel>
              <div className="flex flex-row gap-4 items-center">
                <div>
                  {imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl ? imageUrl : "/placeholder.jpg"}
                      alt="Brand Image"
                      className="w-40 h-40"
                    />
                  )}
                </div>
                <CldUploadWidget
                  uploadPreset={config.cloudinaryUploadPreset}
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
            onClick={() => (reset(), setImageUrl(""))}
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
