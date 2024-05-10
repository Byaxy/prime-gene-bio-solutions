import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";
import { Option } from "../Types";

interface FormInputProps {
  id: string;
  name: string;
  control: any;
  label: string;
  setValue?: any;
  options: Option[];
  defaultValue?: any;
}
export const FormInputDropdown: React.FC<FormInputProps> = ({
  id,
  name,
  control,
  label,
  options,
  defaultValue,
}) => {
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem
          key={option.value}
          value={option.value}
          className="text-primaryDark"
        >
          {option.label}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl size={"small"}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={onChange}
            value={value}
            fullWidth
            size="medium"
            variant="outlined"
            label={label}
            defaultValue={defaultValue}
            id={id}
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
