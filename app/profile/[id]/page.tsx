"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

export default function ProfilePage() {
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
        Profile Page
      </Typography>
    </Box>
  );
}
