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
import type { Inventory } from "../Types";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CancelIcon from "@mui/icons-material/Cancel";

import { useForm } from "react-hook-form";
import { adjustInventory } from "@/server/actions/inventory";
import { FormInputDropdown } from "../form-components/FormInputDropdown";

type FormInput = {
  quantity: number;
  updatedAt: Date;
  adjustType: string;
};

const adjustOptions = [
  {
    label: "Increase",
    value: "increase",
  },
  {
    label: "Decrease",
    value: "decrease",
  },
];

type AdjustStockProps = {
  open: boolean;
  handleClose: () => void;
  inventory: Inventory;
};

export default function AdjustStock({
  open,
  handleClose,
  inventory,
}: AdjustStockProps) {
  const { handleSubmit, reset, register, formState, control } =
    useForm<FormInput>({
      defaultValues: {
        quantity: inventory.quantity,
        updatedAt: new Date(),
      },
    });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  // Submit form data
  const onSubmit = async (data: FormInput) => {
    const formData = new FormData();

    formData.append("updatedAt", data.updatedAt.toDateString());

    switch (data.adjustType) {
      case "increase":
        formData.append(
          "quantity",
          (data.quantity + inventory.quantity).toString()
        );
        break;
      case "decrease":
        formData.append(
          "quantity",
          (inventory.quantity - data.quantity).toString()
        );
        break;
      default:
        break;
    }

    const response = await adjustInventory(formData, inventory.id);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Inventory adjusted successfully");
    }
  };

  // Reset form to defaults on Successfull submission of data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      handleClose();
    }
  }, [handleClose, isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Adjust Stock
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
            <div className="mb-5 flex flex-col gap-5 w-full">
              {/** Select product to adjust */}
              <div className="flex flex-col gap-2 w-full sm:w-[50%]">
                <FormLabel htmlFor="productName">
                  <span className="text-primaryDark font-semibold">
                    Product Name
                  </span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
                <TextField
                  id="productName"
                  type="text"
                  value={inventory?.product}
                  placeholder="Product Name"
                  disabled
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="lotNumber">
                    <span className="text-primaryDark font-semibold">
                      Lot Number
                    </span>
                  </FormLabel>
                  <TextField
                    id="lotNumber"
                    type="text"
                    defaultValue={inventory?.lotNumber}
                    disabled
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="availableQuantity">
                    <span className="text-primaryDark font-semibold">
                      Available Quantity
                    </span>
                  </FormLabel>
                  <TextField
                    id="availableQuantity"
                    type="number"
                    defaultValue={inventory?.quantity}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col flex-1 gap-2">
                  <FormLabel htmlFor="quantity">
                    <span className="text-primaryDark font-semibold text-xl">
                      Adjust Quantity
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="quantity"
                    label="Product Type"
                    defaultValue={inventory?.quantity}
                    inputProps={{ min: 0 }}
                    type="number"
                    {...register("quantity", {
                      required: "Product Type is required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.quantity && (
                    <span className="text-redColor text-sm">
                      {errors.quantity?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <FormLabel htmlFor="adjustType">
                    <span className="text-primaryDark font-semibold text-xl">
                      Adjust Type
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <FormInputDropdown
                    id="adjustType"
                    control={control}
                    label="Select Adjust Type"
                    options={adjustOptions}
                    {...register("adjustType", {
                      required: "Adjust Type is required",
                    })}
                  />
                  {errors.adjustType && (
                    <span className="text-redColor text-sm">
                      {errors.adjustType?.message}
                    </span>
                  )}
                </div>
              </div>
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
