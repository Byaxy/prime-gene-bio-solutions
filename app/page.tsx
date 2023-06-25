"use client";
import { Box, Typography } from "@mui/material";
import Cards from "@/components/dashboard/Cards";
import OverviewChart from "@/components/dashboard/OverviewChart";
import RecentSales from "@/components/dashboard/RecentSales";
import Customers from "@/components/dashboard/Customers";
import RecentQuotations from "@/components/dashboard/RecentQuotations";
import RecentDeliveries from "@/components/dashboard/RecentDeliveries";
import RecentPurchases from "@/components/dashboard/RecentPurchases";

export default function Home() {
  return (
    <Box className="flex flex-col gap-5">
      <Typography
        variant="h3"
        sx={{
          color: "#232a58",
          fontWeight: "bold",
          fontSize: "26px",
        }}
      >
        Dashboard
      </Typography>
      <Cards />
      <Box className="grid grid-cols-1 xl:grid-cols-5 gap-5 w-full">
        <OverviewChart />
        <Customers />
      </Box>
      <Box className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
        <RecentQuotations />
        <RecentSales />
      </Box>
      <Box className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
        <RecentPurchases />
        <RecentDeliveries />
      </Box>
    </Box>
  );
}
