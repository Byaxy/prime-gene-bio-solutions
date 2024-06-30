"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function ReportsPage() {
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
        Reports Page
      </Typography>
      <div>
        <iframe
          src="https://app.appsmith.com/app/my-first-application/login-667d324c3a0cf24bb351f094?embed=true"
          frameBorder="0"
          className="w-full h-screen"
        ></iframe>
      </div>
    </Box>
  );
}
