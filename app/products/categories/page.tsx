"use client";
import React, { useCallback, useState } from "react";
import { categoriesData } from "@/data/categoriesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddCategory from "@/components/products/categories/AddCategory";
import ViewCategoryDetails from "@/components/products/categories/ViewCategoryDetails";

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
    console.log(categoryID);
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
          data={categoriesData.data}
          columns={categoriesData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
