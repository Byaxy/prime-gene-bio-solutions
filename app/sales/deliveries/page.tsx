"use client";
import { allDeliveriesData } from "@/data/allDeliveriesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ListComponent from "@/components/ListComponent";
import AddDelivery from "@/components/sales/deliveries/AddDelivery";

export default function DeliveriesPage() {
  const [add, setAdd] = useState<boolean>(false);

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
  }, []);
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/sales/deliveries/${row.id}`);
  };
  return (
    <ListComponent
      title="All Deliveries"
      buttonText="Add Delivery"
      buttonAction={onAddClicked}
    >
      <>
        <AddDelivery open={add} handleClose={handleClose} />
        <DataTable
          data={allDeliveriesData.data}
          columns={allDeliveriesData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
