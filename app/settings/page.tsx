"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { settingsData } from "@/data/settingsData";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

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
      <Box className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {settingsData &&
          settingsData.map((item) => (
            <div
              key={item.title}
              onClick={() => router.push(item.path)}
              className="flex flex-col gap-2 items-start justify-center shadow-md p-5 rounded-lg bg-white cursor-pointer hover:shadow-lg"
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#232a58",
                  fontWeight: 500,
                  fontSize: "22px",
                }}
              >
                {item.title}
              </Typography>
              <Typography className="text-lg text-primaryText">
                {item.description}
              </Typography>
            </div>
          ))}
      </Box>
    </Box>
  );
}
