import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import ErrorWrapper from "./ErrorWrapper";

const genderOptions = [
  {
    label: "MALE",
    value: "MALE",
  },
  {
    label: "FEMALE",
    value: "FEMALE",
  },
  {
    label: "OTHER",
    value: "OTHER",
  },
];

export const FormInputRadio: React.FC<FormInputProps> = ({ name, control }) => {
  const generateRadioOptions = () => {
    return genderOptions.map((singleOption) => {
      return (
        <FormControlLabel
          key={singleOption.label}
          value={singleOption.value}
          label={singleOption.label}
          control={<Radio />}
          required
        />
      );
    });
  };
  return (
    <FormControl component="fieldset">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <ErrorWrapper errorMessage={error?.message}>
            <RadioGroup
              value={value}
              onChange={onChange}
              className="flex flex-row gap-4"
            >
              {generateRadioOptions()}
            </RadioGroup>
          </ErrorWrapper>
        )}
      />
    </FormControl>
  );
};
