"use client";
import React from "react";
import { allSalesData } from "@/data/allSalesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";

export default function ProductCategoriesPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/settings/products-categories/${row.id}`);
  };
  return (
    <ListPage
      title="Products Categories"
      buttonText="Add Category"
      buttonPath="/settings/products-categories/add-category"
    >
      <DataTable
        data={allSalesData.data}
        columns={allSalesData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
        pagination
      />
    </ListPage>
  );
}
