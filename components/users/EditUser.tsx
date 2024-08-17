import { useForm } from "react-hook-form";
import { User, UserRole } from "../Types";
import toast from "react-hot-toast";
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
import { FormInputDropdown } from "../form-components/FormInputDropdown";
import CancelIcon from "@mui/icons-material/Cancel";
import { editUser } from "@/server/actions/users";

type FormInput = Omit<User, "id" | "createdAt">;

type EditUserDetailsProps = {
  open: boolean;
  handleClose: () => void;
  user: User;
};

const roleOptions = [
  {
    label: "User",
    value: UserRole.USER,
  },
  {
    label: "Admin",
    value: UserRole.ADMIN,
  },
];

export default function EditUser({
  open,
  handleClose,
  user,
}: EditUserDetailsProps) {
  const { handleSubmit, reset, register, formState, control } =
    useForm<FormInput>({
      defaultValues: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        updatedAt: new Date(),
      },
    });
  const { errors, isSubmitting } = formState;

  // submit form data
  const onSubmit = async (data: FormInput) => {
    try {
      const response = await editUser(data, user.id);
      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("User updated successfully");
        // Clear form values
        reset({}, { keepDefaultValues: true });
        handleClose();
      }
    } catch (error) {
      console.error("Error updating User:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">Add User</span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>
              Please fill in the information below. The field labels marked with
              <span className="text-redColor font-bold text-xl"> * </span>
              are required input fields.
            </span>
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-4 w-full">
                <FormLabel htmlFor="name">
                  <span className="text-primaryDark font-semibold">Name</span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
                <TextField
                  id="name"
                  type="text"
                  label="Name"
                  defaultValue={user.name}
                  {...register("name", {
                    required: "First Name is required",
                  })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <FormLabel htmlFor="email">
                  <span className="text-primaryDark font-semibold">Email</span>
                  <span className="text-redColor"> *</span>
                </FormLabel>
                <TextField
                  id="email"
                  type="email"
                  label="Email"
                  value={user.email}
                  disabled
                />
              </div>
              <div className="flex flex-col md:flex-row gap-5 md:gap-4 w-full">
                <div className="flex flex-col gap-4 w-full">
                  <FormLabel htmlFor="phoneMumber">
                    <span className="text-primaryDark font-semibold">
                      Phone Number
                    </span>
                  </FormLabel>
                  <TextField
                    id="phoneMumber"
                    type="text"
                    label="Phone Number"
                    defaultValue={user.phone}
                    {...register("phone", {
                      pattern: {
                        value:
                          /^(\+\d{1,2}\s?)?1?\-?\s?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}$/,
                        message: "Invalid phone number format",
                      },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <FormLabel htmlFor="role">
                    <span className="text-primaryDark font-semibold">Role</span>
                  </FormLabel>
                  <FormInputDropdown
                    id="role"
                    control={control}
                    label="Select Role"
                    options={roleOptions}
                    defaultValue={user.role}
                    {...register("role")}
                  />
                  {errors.role && (
                    <span className="text-redColor text-sm">
                      {errors.role?.message}
                    </span>
                  )}
                </div>
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
