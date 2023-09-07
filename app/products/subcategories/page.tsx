"use client";
import React, { useCallback, useState } from "react";
import { subcategoriesData } from "@/data/subcategoriesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import ViewSubCategoryDetails from "@/components/products/subcategories/ViewSubCategoryDetails";
import AddSubCategory from "@/components/products/subcategories/AddSubCategory";

export default function ProductSubCategoriesPage() {
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
      title="Product Sub Categories"
      buttonText="Add Sub Category"
      buttonAction={onAddClicked}
    >
      <>
        <AddSubCategory open={add} handleClose={handleClose} />
        <ViewSubCategoryDetails
          open={view}
          handleClose={handleClose}
          subCategoryID={categoryID}
        />
        <DataTable
          data={subcategoriesData.data}
          columns={subcategoriesData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
