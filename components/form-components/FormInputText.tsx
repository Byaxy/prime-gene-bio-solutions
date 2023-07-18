import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";

export const FormInputText = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "This field is Required" }}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type="text"
          required
          margin="dense"
        />
      )}
    />
  );
};
