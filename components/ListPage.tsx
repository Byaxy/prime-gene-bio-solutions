"use client";
import React, { ReactElement } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

export default function ListPage({
  title,
  buttonText,
  buttonPath,
  children,
}: {
  title: string;
  buttonText: string;
  buttonPath: string;
  children: ReactElement;
}) {
  const router = useRouter();

  return (
    <Box className="flex flex-col gap-5 w-full">
      <Box className="flex flex-row items-center justify-between w-full">
        <Typography
          variant="h3"
          sx={{
            color: "#232a58",
            fontWeight: "bold",
            fontSize: "26px",
          }}
        >
          {title}
        </Typography>
        <Button
          onClick={() => router.push(`${buttonPath}`)}
          variant="contained"
          className="flex flex-row items-center justify-center"
        >
          <AddIcon />{" "}
          <span className="text-white font-medium capitalize sm:text-lg">
            {buttonText}
          </span>
        </Button>
      </Box>
      <Box className="bg-white rounded-lg shadow-md p-5">
        <TextField
          label="Search"
          size="small"
          variant="outlined"
          className="w-[100%] sm:w-[45%]"
        />
        <Box className="mt-4">{children}</Box>
      </Box>
    </Box>
  );
}
