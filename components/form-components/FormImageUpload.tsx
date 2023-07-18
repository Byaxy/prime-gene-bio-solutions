import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormInputProps } from "./FormInputProps";
import { Input } from "@mui/material";

export default function FormImageUpload({
  name,
  control,
  label,
}: FormInputProps) {
  return (
    <Controller
      name={name}
      control={control}
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
          arial-label={label}
          variant="outlined"
          type="file"
          margin="dense"
        />
      )}
    />
  );
}
