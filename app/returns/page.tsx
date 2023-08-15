"use client";
import React from "react";
import { returnsData } from "@/data/returnsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";

export default function ReturnsPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/sales/${row.id}`);
  };
  return (
    <ListPage
      title="Returns"
      buttonText="Add Return"
      buttonPath="/returns/add-return"
    >
      <DataTable
        data={returnsData.data}
        columns={returnsData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
        pagination
      />
    </ListPage>
  );
}
