"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { categoriesData } from "@/data/categoriesData";
import { Box, Button, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DataCells } from "@/data/categoriesData";
import { customTableStyles } from "@/styles/TableStyles";
import { columns } from "@/data/subCategoriesColumns";
import DataTable from "react-data-table-component";

export default function CategoryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [categoryDetails, setCategoryDetails] = useState<DataCells | null>(
    null
  );
  const [tableData, setTableData] = useState<DataCells[] | undefined>([]);

  const onRowClicked = (row: { id: string }) => {
    router.push(
      `/settings/products-categories/${params?.id}/subcategory/${row.id}`
    );
  };

  useEffect(() => {
    const category = categoriesData.data.filter(
      (item) => item.id === params?.id
    );
    setCategoryDetails(category[0]);
  }, [categoryDetails, params?.id]);

  useEffect(() => {
    setTableData(categoryDetails?.subCategories);
  }, [categoryDetails, tableData]);

  return (
    <Box className="flex flex-col gap-5 w-full">
      <Box className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 lg:w-[50vw]">
        <div className="col-span-2 flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center">
          <Typography
            sx={{
              color: "#232a58",
              fontWeight: "semibold",
              fontSize: "20px",
            }}
          >
            Category Name:
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "#232a58",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {categoryDetails?.name}
          </Typography>
        </div>
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4 items-center">
            <Typography
              sx={{
                color: "#232a58",
                fontWeight: "semibold",
                fontSize: "18px",
              }}
            >
              Category Code:
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: "#232a58",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {categoryDetails?.code}
            </Typography>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 justify-items-start sm:justify-items-end">
            <Typography
              className="sm:col-span-2"
              sx={{
                color: "#232a58",
                fontWeight: "semibold",
                fontSize: "18px",
              }}
            >
              Date of Registration:
            </Typography>
            <Typography
              className="sm:col-span-1"
              variant="h3"
              sx={{
                color: "#232a58",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {categoryDetails?.date}
            </Typography>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-2 w-full">
          <Typography
            sx={{
              color: "#232a58",
              fontWeight: "semibold",
              fontSize: "18px",
            }}
          >
            Category Description:
          </Typography>
          <div className="bg-white px-5 rounded-md flex items-start justify-start">
            <p className="text-lg text-primaryText">
              {categoryDetails?.description}
            </p>
          </div>
        </div>
      </Box>
      <Box className="bg-white w-full rounded-lg shadow-md p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <TextField
            label="Search"
            size="small"
            variant="outlined"
            className="w-[100%] sm:w-[45%]"
          />
          <Button
            onClick={() => router.push("/")}
            variant="contained"
            className="flex flex-row items-center justify-center"
          >
            <AddIcon />{" "}
            <span className="text-white font-medium capitalize sm:text-lg">
              Sub Category
            </span>
          </Button>
        </div>
        <Box className="relative mt-4 w-full overflow-x-scroll scrollbar-hide">
          <DataTable
            data={tableData ?? []}
            columns={columns}
            customStyles={customTableStyles}
            onRowClicked={onRowClicked}
            className="scrollbar-hide"
            pagination
          />
        </Box>
      </Box>
    </Box>
  );
}
