import React from "react";
import RecentComponent from "../RecentComponent";
import { salesData } from "@/data/salesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";

export default function RecentSales() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/sales/${row.id}`);
  };
  return (
    <RecentComponent title="Recent Sales" path="/sales" customStyle="">
      <DataTable
        data={salesData.data}
        columns={salesData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
      />
    </RecentComponent>
  );
}
