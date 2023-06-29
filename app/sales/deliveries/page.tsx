"use client";
import { allDeliveriesData } from "@/data/allDeliveriesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";

export default function DeliveriesPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/sales/deliveries/${row.id}`);
  };
  return (
    <ListPage
      title="Deliveries"
      buttonText="Add Delivery"
      buttonPath="/sales/deliveries/add-delivery"
    >
      <DataTable
        data={allDeliveriesData.data}
        columns={allDeliveriesData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
        pagination
      />
    </ListPage>
  );
}
