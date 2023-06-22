import React from "react";
import RecentComponent from "../RecentComponent";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import { quotationsData } from "@/data/quotationsData";

export default function RecentQuotations() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/quotations/${row.id}`);
  };
  return (
    <RecentComponent
      title="Recent Quotations"
      path="/quotations"
      customStyle=""
    >
      <DataTable
        data={quotationsData.data}
        columns={quotationsData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
      />
    </RecentComponent>
  );
}
