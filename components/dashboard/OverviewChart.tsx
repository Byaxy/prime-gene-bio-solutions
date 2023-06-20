import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { chartData } from "@/data/chartData";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function OverviewChart() {
  return (
    <Box className="lg:col-span-3 bg-white shadow-sm rounded-xl p-5">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-start pb-4">
        <Typography className="flex flex-col gap-3">
          <span className="m-0 text-xl  font-medium text-primaryText">
            Total Revenue
          </span>
          <span className="text-primaryDark text-2xl md:text-3xl font-bold">
            $236,535
          </span>
        </Typography>
        <div className="flex flex-row items-center justify-end gap-3">
          <div className="flex flex-row gap-1 items-center">
            <div className="bg-primaryColor h-4 w-4 rounded-full" />
            <span className="text-sm text-primaryText">Sales</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <div className="bg-mainLight h-4 w-4 rounded-full" />
            <span className="text-sm text-primaryText">Purchases</span>
          </div>
        </div>
      </div>
      <Bar
        style={{
          width: "100%",
          height: "auto",
        }}
        data={chartData.data}
        options={chartData.options}
      />
    </Box>
  );
}
