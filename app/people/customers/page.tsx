"use client";
import React, { useCallback, useState } from "react";
import { customersData } from "@/data/customersData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddCustomer from "@/components/people/customers/AddCustomer";
import ViewCustomerDetails from "@/components/people/customers/ViewCustomerDetails";

export default function CustomersPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [customerID, setCustomerID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setCustomerID(row.id);
    setView(true);
    console.log(customerID);
  };
  return (
    <ListComponent
      title="Customers"
      buttonText="Add Customer"
      buttonAction={onAddClicked}
    >
      <>
        <AddCustomer open={add} handleClose={handleClose} />
        <ViewCustomerDetails
          open={view}
          handleClose={handleClose}
          customerID={customerID}
        />
        <DataTable
          data={customersData.data}
          columns={customersData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
