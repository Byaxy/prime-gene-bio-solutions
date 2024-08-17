"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

export default function SettingsPage() {
  return (
    <Box className="flex flex-col items-start justify-start">
      <Typography
        variant="h3"
        sx={{
          color: "#232a58",
          fontWeight: "bold",
          fontSize: "26px",
        }}
      >
        System Settings
      </Typography>
    </Box>
  );
}
