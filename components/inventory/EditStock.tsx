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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import dayjs, { Dayjs } from "dayjs";
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { DB } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

type FormInput = Omit<
  Inventory,
  "id" | "createdAt" | "updatedAt" | "productName" | "unit"
>;

type EditStockProps = {
  open: boolean;
  handleClose: () => void;
  inventory: Inventory;
};

const EditStock = ({ open, handleClose, inventory }: EditStockProps) => {
  const [manufactureDate, setManufactureDate] = useState<Dayjs | null>(
    dayjs(inventory.manufactureDate) || null
  );
  const [expiryDate, setExpiryDate] = useState<Dayjs | null>(
    dayjs(inventory.expiryDate) || null
  );

  const { handleSubmit, reset, register, formState } = useForm<FormInput>({
    defaultValues: {
      ...inventory,
    },
  });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  // Submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const formData = { ...data, manufactureDate, expiryDate };

      await DB.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteInventoryCollectionId,
        inventory.id,
        formData
      ).then(() => {
        toast.success("Stock Updated succefully");
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
      setManufactureDate(null);
      setExpiryDate(null);
      handleClose();
    }
  }, [handleClose, isSubmitSuccessful, reset]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Edit Stock
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
                  value={inventory?.productName}
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
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="lotNumber"
                    type="text"
                    defaultValue={inventory?.lotNumber}
                    {...register("lotNumber", {
                      required: "Lot Number is required",
                    })}
                    error={!!errors.lotNumber}
                    helperText={errors.lotNumber?.message}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="quantity">
                    <span className="text-primaryDark font-semibold">
                      Quantity
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="quantity"
                    type="number"
                    defaultValue={inventory?.quantity}
                    inputProps={{ min: 0 }}
                    {...register("quantity", {
                      required: "Quantity is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="cost">
                    <span className="text-primaryDark font-semibold">
                      Cost Price
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="cost"
                    type="number"
                    defaultValue={inventory?.cost}
                    inputProps={{ min: 0 }}
                    {...register("cost", {
                      required: "Cost Price is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors.cost}
                    helperText={errors.cost?.message}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel htmlFor="price">
                    <span className="text-primaryDark font-semibold">
                      Selling Price
                    </span>
                    <span className="text-redColor"> *</span>
                  </FormLabel>
                  <TextField
                    id="price"
                    type="number"
                    defaultValue={inventory?.price}
                    inputProps={{ min: 0 }}
                    {...register("price", {
                      required: "Selling Price is required",
                      valueAsNumber: true,
                    })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel>
                    <span className="text-primaryDark font-semibold">
                      Manufacture Date
                    </span>
                  </FormLabel>
                  <DatePicker
                    value={manufactureDate}
                    onChange={(newDate) => setManufactureDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                    defaultValue={dayjs(inventory.manufactureDate)}
                    disableFuture={true}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <FormLabel>
                    <span className="text-primaryDark font-semibold">
                      Expiry Date
                    </span>
                  </FormLabel>
                  <DatePicker
                    value={expiryDate}
                    onChange={(newDate) => setExpiryDate(newDate)}
                    format="LL"
                    label="MM-DD-YYYY"
                    defaultValue={dayjs(inventory.expiryDate)}
                  />
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            onClick={() => (
              reset(),
              setManufactureDate(dayjs(inventory.manufactureDate)),
              setExpiryDate(dayjs(inventory.expiryDate))
            )}
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
};

export default EditStock;
