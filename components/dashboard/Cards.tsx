import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { cardsData } from "@/data/cardsData";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Cards() {
  return (
    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {cardsData &&
        cardsData.map((card) => (
          <Box
            key={card.title}
            className="grid grid-cols-3 bg-white shadow-md rounded-xl p-4"
          >
            <Typography className="flex flex-col items-start justify-center gap-2 col-span-2">
              <span className="text-lg text-primaryText">{card.title}</span>
              <span className="text-xl md:text-2xl font-bold text-primaryDark">
                {card.total}
              </span>
            </Typography>
            <Box className="col-span-1 flex items-center justify-center w-full">
              <Doughnut data={card.data} options={card.options} />
            </Box>
          </Box>
        ))}
    </Box>
  );
}
