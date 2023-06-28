"use client";
import { allPurchasesData } from "@/data/allPurchasesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";

export default function PurchasesPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/purchases/${row.id}`);
  };
  return (
    <ListPage
      title="Purchases"
      buttonText="Add Purchase"
      buttonPath="/purchases/add-purchase"
    >
      <DataTable
        data={allPurchasesData.data}
        columns={allPurchasesData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
        pagination
      />
    </ListPage>
  );
}
