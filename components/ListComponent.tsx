"use client";
import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

export default function ListComponent({
  title,
  buttonText,
  buttonAction,
  children,
}: {
  title: string;
  buttonText: string;
  buttonAction: () => void;
  children: React.JSX.Element;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between w-full gap-5">
        <Typography
          variant="h3"
          sx={{
            color: "#232a58",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {title}
        </Typography>
        <div className="flex flex-col w-full sm:w-fit sm:flex-row items-start sm:items-center justify-start sm:justify-center gap-5">
          <Button
            onClick={router.back}
            variant="outlined"
            className="flex flex-row items-center justify-center gap-1"
          >
            <ArrowBackIcon />
            <span className="text-primaryDark font-medium capitalize sm:text-lg">
              Back
            </span>
          </Button>
          <Button
            onClick={buttonAction}
            variant="contained"
            className="flex flex-row items-center justify-center gap-1"
          >
            <AddIcon />
            <span className="text-white font-medium capitalize sm:text-lg">
              {buttonText}
            </span>
          </Button>
        </div>
      </div>
      <div className="bg-white w-full rounded-lg shadow-md p-5">
        <TextField
          label="Search"
          size="small"
          variant="outlined"
          className="w-[100%] sm:w-[45%]"
        />
        <Box className="relative mt-4 w-full overflow-x-scroll scrollbar-hide">
          {{ ...children }}
        </Box>
      </div>
    </div>
  );
}
