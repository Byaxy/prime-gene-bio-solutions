"use client";
import { allDeliveriesData } from "@/data/allDeliveriesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useCallback, useState } from "react";
import ListComponent from "@/components/ListComponent";
import AddWayBill from "@/components/sales/waybill/AddWayBill";
import ViewWayBillDetails from "@/components/sales/waybill/ViewWayBillDetails";
import { allWayBillsData } from "@/data/allWayBillsData";

export default function WayBillPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [wayBillID, setWayBillID] = useState<string>("1");
  const [view, setView] = useState<boolean>(false);

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setWayBillID(row.id);
    setView(true);
  };

  return (
    <ListComponent
      title="Way Bills"
      buttonText="Add Way Bill"
      buttonAction={onAddClicked}
    >
      <>
        <AddWayBill open={add} handleClose={handleClose} />
        <ViewWayBillDetails
          open={view}
          handleClose={handleClose}
          wayBillID={wayBillID}
        />
        <DataTable // TO DO change table data to way bill data
          data={allWayBillsData.data}
          columns={allWayBillsData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
