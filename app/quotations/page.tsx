"use client";
import React from "react";
import { allQuotationsData } from "@/data/allQuotationsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";

export default function QuotationsPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/quotations/${row.id}`);
  };
  return (
    <ListPage
      title="Quotations"
      buttonText="Add Quotation"
      buttonPath="/quotations/add-quotation"
    >
      <DataTable
        data={allQuotationsData.data}
        columns={allQuotationsData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
        pagination
      />
    </ListPage>
  );
}
