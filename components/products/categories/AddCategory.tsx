import React, { ReactNode, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Option, ProductCategory } from "@/components/Types";
import toast from "react-hot-toast";
import { DB, ID, Query } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";

// Even though these fields are optional in schema.prisma, the auto-generated type
// marks them as required. Therefore, omit these fields manually.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
type FormInput = Omit<ProductCategory, "id" | "createdAt" | "updatedAt">;

const defaultValues: FormInput = {
  name: "",
  code: "",
  description: "",
  parentCategory: "",
};

type AddCategoryProps = {
  open: boolean;
  handleClose: () => void;
};

export default function AddCategory({
  open,
  handleClose,
}: AddCategoryProps): ReactNode {
  const { handleSubmit, reset, control, register, formState } =
    useForm<FormInput>({
      defaultValues: defaultValues,
    });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);

  const onSubmit = async (data: FormInput) => {
    try {
      await DB.createDocument(
        config.appwriteDatabaseId,
        config.appwriteProductCategoriesCollectionId,
        ID.unique(),
        data
      ).then(() => {
        toast.success("Product Category Added Successfully");
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      handleClose();
    }
  }, [handleClose, isSubmitSuccessful, reset]);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { documents } = await DB.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteProductCategoriesCollectionId,
          [Query.orderDesc("$createdAt"), Query.limit(1000)]
        );

        const options = documents.map((doc: any) => ({
          label: doc.name,
          value: doc.name,
        }));

        options.unshift({ label: "None", value: null });
        setCategoryOptions(options);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

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
              <label htmlFor="parentCategory">
                <span className="text-primaryDark font-semibold">
                  Parent Category
                </span>
              </label>
              <FormInputDropdown
                id="category"
                control={control}
                label="Select Category"
                options={categoryOptions}
                {...register("parentCategory")}
              />
              {errors.parentCategory && (
                <span className="text-redColor text-sm">
                  {errors.parentCategory?.message}
                </span>
              )}
              <label htmlFor="description">
                <span className="text-primaryDark font-semibold">
                  Description
                </span>
              </label>
              <TextField
                id="description"
                label="Description"
                multiline
                rows={3}
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            onClick={() => reset()}
            className="cancelBtn"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
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
