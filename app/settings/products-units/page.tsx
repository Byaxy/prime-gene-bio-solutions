"use client";
import React from "react";
import { allSalesData } from "@/data/allSalesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";

export default function ProductPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/settings/products-units/${row.id}`);
  };
  return (
    <ListPage
      title="Products Units"
      buttonText="Add Unit"
      buttonPath="/settings/products-units/add-unit"
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
