"use client";
import React, { useCallback, useState } from "react";
import { categoriesData } from "@/data/categoriesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddCategory from "@/components/products/categories/AddCategory";
import ViewCategoryDetails from "@/components/products/categories/ViewCategoryDetails";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  {
    name: "Date",
    selector: (row: { createdAt: Date }) => row.createdAt.toDateString(),
    width: "180px",
  },
  {
    name: "Code",
    selector: (row: { code: string }) => row.code,
    width: "180px",
  },
  {
    name: "Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Description",
    selector: (row: { description: string }) => row.description,
  },
  {
    name: "Parent Category",
    cell: (row: { parentCategory: string }) =>
      row.parentCategory ? row.parentCategory : "None",
  },
  {
    name: "Actions",
    cell: (row: { id: string }) => [
      <Link
        href={`/settings/products-categories/edit-category/${row.id}`}
        key={row.id}
      >
        <EditIcon sx={{ color: "#475BE8" }} />
      </Link>,
      <Link key={row.id} href="/settings/products-categories">
        <DeleteIcon color="error" />
      </Link>,
    ],
    width: "120px",
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "5px",
    },
  },
];

export default function ProductCategoriesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [categoryID, setCategoryID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
  }, []);
  const onRowClicked = (row: { id: string }) => {
    setCategoryID(row.id);
    setView(true);
  };

  return (
    <ListComponent
      title="Product Categories"
      buttonText="Add Category"
      buttonAction={onAddClicked}
    >
      <>
        <AddCategory open={add} handleClose={handleClose} />
        <ViewCategoryDetails
          open={view}
          handleClose={handleClose}
          categoryID={categoryID}
        />
        <DataTable
          data={categoriesData}
          columns={columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
