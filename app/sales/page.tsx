"use client";
import React from "react";
import { allSalesData } from "@/data/allSalesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";

export default function SalesPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/sales/${row.id}`);
  };
  return (
    <ListPage title="Sales" buttonText="Add Sale" buttonPath="/sales/add-sale">
      <DataTable
        data={allSalesData.data}
        columns={allSalesData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
      />
    </ListPage>
  );
}
