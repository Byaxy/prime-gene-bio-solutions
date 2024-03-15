"use client";
import React, { useCallback, useState } from "react";
import { customersData } from "@/data/customersData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddCustomer from "@/components/customers/AddCustomer";
import ViewCustomerDetails from "@/components/customers/ViewCustomerDetails";

const columns = [
  {
    name: "Name",
    selector: (row: { name: string }) => row.name,
    style: {
      fontWeight: "600",
    },
  },
  {
    name: "Email",
    selector: (row: { email: string }) => row.email,
  },
  {
    name: "Phone Number",
    selector: (row: { phone: string }) => row.phone,
    width: "160px",
  },
  {
    name: "Address",
    selector: (row: { address: string }) => row.address,
  },
  {
    name: "City",
    selector: (row: { city: string }) => row.city,
  },
];

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
          data={customersData}
          columns={columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
