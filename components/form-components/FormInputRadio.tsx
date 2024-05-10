import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import ErrorWrapper from "./ErrorWrapper";

export const FormInputRadio: React.FC<FormInputProps> = ({
  name,
  control,
  options,
}) => {
  const generateRadioOptions = () => {
    return options?.map((singleOption) => {
      return (
        <FormControlLabel
          key={singleOption?.label}
          value={singleOption?.value}
          label={singleOption?.label}
          control={<Radio className="text-primaryDark" />}
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
              className="flex flex-row gap-4 text-primaryDark"
            >
              {generateRadioOptions()}
            </RadioGroup>
          </ErrorWrapper>
        )}
      />
    </FormControl>
  );
};
