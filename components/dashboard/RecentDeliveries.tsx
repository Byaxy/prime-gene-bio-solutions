import React from "react";
import RecentComponent from "../RecentComponent";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import { deliveriesData } from "@/data/deliveriesData";

export default function RecentDeliveries() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/sales/deliveries/${row.id}`);
  };
  return (
    <RecentComponent
      title="Recent Deliveries"
      path="/sales/deliveries"
      customStyle=""
    >
      <DataTable
        data={deliveriesData.data}
        columns={deliveriesData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
      />
    </RecentComponent>
  );
}
