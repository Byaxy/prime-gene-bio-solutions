import React from "react";
import RecentComponent from "../RecentComponent";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import { purchasesData } from "@/data/purchasesData";

export default function RecentPurchases() {
  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    router.push(`/purchases/${row.id}`);
  };
  return (
    <RecentComponent title="Recent Purchases" path="/purchases" customStyle="">
      <DataTable
        data={purchasesData.data}
        columns={purchasesData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
      />
    </RecentComponent>
  );
}
