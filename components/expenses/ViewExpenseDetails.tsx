import React, { ChangeEvent } from "react";

type FileInputProps = {
  onChange: (file: File) => void;
};

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return <input type="file" onChange={handleFileChange} />;
};

export default FileInput;
