import React from "react";
import RecentComponent from "../RecentComponent";
import { customersData } from "@/data/customersData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";

export default function Customers() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/people/customers/${row.id}`);
  };
  return (
    <RecentComponent
      title="Customers"
      path="/people/customers"
      customStyle="lg:col-span-2"
    >
      <DataTable
        data={customersData.data}
        columns={customersData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
      />
    </RecentComponent>
  );
}
