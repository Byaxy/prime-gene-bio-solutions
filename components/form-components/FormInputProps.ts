export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  options?: {label: string, value: string | boolean}[]
}