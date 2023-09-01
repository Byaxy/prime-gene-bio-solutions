import {
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type SearchableSelectProps = {
  options: Option[];
  value: string;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
};

const SearchableSelect = ({
  options,
  value,
  onChange,
}: SearchableSelectProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOptions, setSearchOptions] = useState<Option[]>([]);

  const generateSingleOptions = () => {
    return searchOptions.map((option: Option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  useEffect(() => {
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchOptions(filteredOptions);
  }, [options, searchTerm]);

  return (
    <Select
      value={value}
      onChange={onChange}
      fullWidth
      input={<OutlinedInput label="Name" />}
      MenuProps={MenuProps}
      size="small"
    >
      <TextField
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        size="small"
        className="mx-4 my-8 w-full sm:w-1/2"
      />
      {generateSingleOptions()}
    </Select>
  );
};

export default SearchableSelect;
