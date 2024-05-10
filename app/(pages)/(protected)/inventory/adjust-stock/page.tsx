"use client";

import { Button, Tab, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddNewStock from "@/components/inventory/AddNewStock";
import AdjustExistingStock from "@/components/inventory/AdjustExistingStock";

const AdjustProductStock = () => {
  const [value, setValue] = useState("add-new");

  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col gap-5 px-5 pt-5 pb-8">
      <div className="flex items-center justify-between w-full gap-5">
        <Typography
          variant="h3"
          sx={{
            color: "#232a58",
            fontWeight: "bold",
            fontSize: "26px",
          }}
        >
          Adjust Product Stock
        </Typography>
        <Button
          onClick={router.back}
          variant="contained"
          className="flex flex-row items-center justify-center gap-1 bg-primaryColor/95 text-white hover:bg-primaryColor"
        >
          <ArrowBackIcon />
          <span className="text-white font-medium capitalize sm:text-lg">
            Back
          </span>
        </Button>
      </div>

      <div className="w-full bg-white rounded-lg py-8 px-5">
        <TabContext value={value}>
          <div className="w-full bg-primaryColor rounded-lg px-2 pt-1">
            <TabList
              onChange={handleChange}
              scrollButtons="auto"
              allowScrollButtonsMobile
              variant="fullWidth"
            >
              <Tab
                value="add-new"
                label="New Stock"
                className={`${
                  value === "add-new"
                    ? "bg-white text-primaryDark rounded-md"
                    : "text-white"
                } text-lg font-semibold  capitalize transition`}
              />
              <Tab
                value="adjust-existing"
                label="Adjust Existing"
                className={`${
                  value === "adjust-existing"
                    ? "bg-white text-primaryDark rounded-md"
                    : "text-white"
                } text-lg font-semibold capitalize transition`}
              />
            </TabList>
          </div>
          <TabPanel value="add-new">
            <div className="w-full">
              <AddNewStock />
            </div>
          </TabPanel>
          <TabPanel value="adjust-existing">
            <AdjustExistingStock />
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default AdjustProductStock;
