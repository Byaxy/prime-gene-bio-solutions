import React, { useCallback, useEffect, useState } from "react";
import RecentComponent from "../RecentComponent";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import type { Customer } from "../Types";
import axios from "axios";
import ViewCustomerDetails from "../customers/ViewCustomerDetails";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [view, setView] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(
    {} as Customer
  );

  const columns = [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) =>
        new Date(row.createdAt).toDateString(),
    },
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
      name: "City",
      selector: (row: { city: string }) => row.city,
    },
  ];

  const handleClose = useCallback((): void => {
    setView(false);
  }, []);

  const onRowClicked = (row: Customer) => {
    setSelectedCustomer(row);
    setView(true);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/customers");
        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, [customers]);

  return (
    <RecentComponent
      title="Customers"
      path="/customers"
      customStyle="lg:col-span-2"
    >
      <>
        <ViewCustomerDetails
          open={view}
          handleClose={handleClose}
          customer={selectedCustomer}
        />
        <DataTable
          data={customers}
          columns={columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
        />
      </>
    </RecentComponent>
  );
}
