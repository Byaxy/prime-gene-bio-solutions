"use client";
import { allDeliveriesData } from "@/data/allDeliveriesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import ListComponent from "@/components/ListComponent";
import AddDelivery from "@/components/sales/deliveries/AddDelivery";
import ViewDeliveryDetails from "@/components/sales/deliveries/ViewDeliveryDetails";

export default function DeliveriesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [deliveryID, setDeliveryID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
  }, []);
  const onRowClicked = (row: { id: string }) => {
    setDeliveryID(row.id);
    setView(true);
  };
  return (
    <ListComponent
      title="All Deliveries"
      buttonText="Add Delivery"
      buttonAction={onAddClicked}
    >
      <>
        <AddDelivery open={add} handleClose={handleClose} />
        <ViewDeliveryDetails
          open={view}
          handleClose={handleClose}
          deliveryID={deliveryID}
        />
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
