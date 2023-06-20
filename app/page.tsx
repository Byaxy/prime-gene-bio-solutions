"use client";
import { Box, Button, Typography } from "@mui/material";
import Cards from "@/components/dashboard/Cards";
import OverviewChart from "@/components/dashboard/OverviewChart";
import Sales from "@/components/dashboard/Sales";

export default function Home() {
  return (
    <Box className="flex flex-col gap-5">
      <Typography className="text-2xl md:text-3xl font-bold text-primaryDark">
        Dashboard
      </Typography>
      <Cards />
      <Box className="grid grid-cols-1 2xl:grid-cols-5 gap-5 w-full">
        <OverviewChart />
        <Sales />
      </Box>
    </Box>
  );
}
