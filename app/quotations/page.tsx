"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function QuotationsPage() {
  return (
    <Box className="grid grid-cols-5">
      <Typography
        variant="h3"
        sx={{
          color: "#232a58",
          fontWeight: "bold",
          fontSize: "26px",
        }}
      >
        Quotations
      </Typography>
    </Box>
  );
}
