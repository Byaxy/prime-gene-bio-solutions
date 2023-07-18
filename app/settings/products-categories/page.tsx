"use client";
import React, { useCallback, useState } from "react";
import { categoriesData } from "@/data/categoriesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListComponent from "@/components/ListComponent";
import AddCategory from "@/components/settings/categories/AddCategory";

export default function ProductCategoriesPage() {
  const [add, setAdd] = useState<boolean>(false);

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
  }, []);
  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    router.push(`/settings/products-categories/${row.id}`);
  };
  return (
    <ListComponent
      title="Products Categories"
      buttonText="Add Category"
      buttonAction={onAddClicked}
    >
      <>
        <AddCategory open={add} handleClose={handleClose} />
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
