import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import { Expense } from "@/components/Types";
import Image from "next/image";
import { FormInputDropdown } from "@/components/form-components/FormInputDropdown";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { CldUploadWidget } from "next-cloudinary";
import { config } from "@/config/config";
import toast from "react-hot-toast";
import { editExpense } from "@/server/actions/expenses";
import useExpenseCategoryOptions from "@/utils/hooks/useExpenseCategoryOptions";

type FormInput = Omit<Expense, "id" | "createdAt">;

type EditExpenseProps = {
  open: boolean;
  handleClose: () => void;
  expense: Expense;
};

export default function EditExpense({
  open,
  handleClose,
  expense,
}: EditExpenseProps) {
  const expenseCategoryOptions = useExpenseCategoryOptions();

  const { register, handleSubmit, reset, formState, control } =
    useForm<FormInput>({
      defaultValues: {
        date: expense.date,
        title: expense.title,
        reference: expense.reference,
        category: expense.category,
        description: expense.description,
        amount: expense.amount,
        image: expense.image,
      },
    });
  const { errors, isSubmitting } = formState;

  const [imageUrl, setImageUrl] = useState<string>(expense.image || "");
  const [expenseDate, setExpenseDate] = useState<Dayjs | null>(
    dayjs(expense.date)
  );

  const onSubmit = async (data: FormInput) => {
    try {
      const updatedData = {
        ...data,
        image: imageUrl,
        date: expenseDate?.toDate() || new Date(),
      };

      const response = await editExpense(updatedData, expense.id);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Expense updated successfully");
        reset({}, { keepDefaultValues: true });
        setImageUrl("");
        handleClose();
      }
    } catch (error) {
      console.error("Error updating Expense:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Edit Expense
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
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel>
                    <span className="text-primaryDark font-semibold">Date</span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <DatePicker
                    value={expenseDate}
                    onChange={(newDate) => setExpenseDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                    disableFuture={true}
                    minDate={dayjs("01-01-2000")}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="title">
                    <span className="text-primaryDark font-semibold">
                      Expense Title
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="title"
                    type="text"
                    defaultValue={expense.title}
                    {...register("title", {
                      required: "Title is required",
                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="reference">
                    <span className="text-primaryDark font-semibold">
                      Reference Number
                    </span>
                  </FormLabel>
                  <TextField
                    id="reference"
                    type="text"
                    defaultValue={expense.reference}
                    {...register("reference")}
                    error={!!errors.reference}
                    helperText={errors.reference?.message}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="amount">
                    <span className="text-primaryDark font-semibold">
                      Amount
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="amount"
                    type="number"
                    variant="outlined"
                    defaultValue={expense.amount}
                    inputProps={{ min: 0 }}
                    {...register("amount", {
                      required: "Amount is required and cannot be Zero",
                      valueAsNumber: true,
                      validate: (value) => value > 0,
                    })}
                    error={!!errors.amount?.message}
                    helperText={errors.amount?.message}
                  />
                </div>
              </div>

              <div className="flex flex-col w-full gap-2">
                <FormLabel htmlFor="category">
                  <span className="text-primaryDark font-semibold">
                    Category
                  </span>
                </FormLabel>
                <FormInputDropdown
                  id="category"
                  name="category"
                  control={control}
                  label="Expense Category"
                  defaultValue={expense.category}
                  options={expenseCategoryOptions.data?.success || []}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <FormLabel htmlFor="description">
                  <span className="text-primaryDark font-semibold">
                    Description
                  </span>
                </FormLabel>
                <TextField
                  id="description"
                  multiline
                  rows={4}
                  defaultValue={expense.description}
                  {...register("description")}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-end justify-start">
                <div className="flex flex-col gap-5">
                  <FormLabel htmlFor="image">
                    <span className="text-primaryDark font-semibold">
                      Attachment
                    </span>
                  </FormLabel>
                  <Image
                    src={imageUrl ? imageUrl : "/placeholder.jpg"}
                    alt="Preview"
                    width={300}
                    height={300}
                    className="object-cover w-full h-full rounded-lg"
                  />
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
                        Choose File
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
            variant="outlined"
            size="large"
            onClick={() => reset()}
            className="cancelBtn"
          >
            Reset
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
