"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function SettingsPage() {
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          color: "#232a58",
          fontWeight: "bold",
          fontSize: "26px",
        }}
      >
        Settings Page
      </Typography>
    </Box>
  );
}
