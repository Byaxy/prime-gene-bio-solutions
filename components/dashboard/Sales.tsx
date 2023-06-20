import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DataTable from "react-data-table-component";

export default function Sales() {
  const router = useRouter();

  const customStyles = {
    rows: {
      style: {
        "&:nth-child(odd)": {
          backgroundColor: "rgb(241, 245, 249)",
        },
        "&:hover": {
          cursor: "pointer",
          backgroundColor: "#e5e7eb",
        },
      },
    },
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "14px",
      },
    },
  };

  const onRowClicked = (row: { id: any }) => {
    router.push(`/`);
  };

  return (
    <Box className="lg:col-span-2 bg-white shadow-sm rounded-xl w-full flex flex-col gap-4 p-5">
      <Box className="flex flex-row items-start justify-between">
        <Typography className="text-primaryDark text-2xl font-bold">
          Recent Sales
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push("/sales")}
          className="font-semibold"
        >
          View All
        </Button>
      </Box>
      <Box></Box>
    </Box>
  );
}
