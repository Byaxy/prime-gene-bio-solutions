"use client";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddCustomer from "@/components/customers/AddCustomer";
import ViewCustomerDetails from "@/components/customers/ViewCustomerDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Customer } from "@/components/Types";
import axios from "axios";
import DeleteCustomer from "@/components/customers/DeleteCustomer";
import EditCustomer from "@/components/customers/EditCustomer";

export default function CustomersPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedRow, setSelectedRow] = useState<Customer>({} as Customer);

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
      name: "Address",
      selector: (row: { address: string }) => row.address,
    },
    {
      name: "City",
      selector: (row: { city: string }) => row.city,
    },
    {
      name: "Actions",
      cell: (row: Customer) => [
        <span
          key={"edit" + row.id}
          onClick={() => onEdit(row)}
          className="text-[#475BE8] py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <EditIcon />
        </span>,
        <span
          key={"delete" + row.id}
          onClick={() => onDelete(row)}
          className="text-redColor py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <DeleteIcon />
        </span>,
      ],
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
  ];

  //add
  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  //edit
  const onEdit = (row: Customer) => {
    setSelectedRow(row);
    setEdit(true);
  };

  // delete
  const onDelete = (row: Customer) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  // close dialog
  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
    setConfirmDelete(false);
    setEdit(false);
  }, []);

  // view
  const onRowClicked = (row: Customer) => {
    setSelectedRow(row);
    setView(true);
  };

  // Fetch customers
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
    <ListComponent
      title="All Customers"
      buttonText="Add Customer"
      buttonAction={onAddClicked}
    >
      <>
        <AddCustomer open={add} handleClose={handleClose} />
        <EditCustomer
          open={edit}
          handleClose={handleClose}
          customer={selectedRow}
        />
        <ViewCustomerDetails
          open={view}
          handleClose={handleClose}
          customer={selectedRow}
        />
        <DeleteCustomer
          open={confirmDelete}
          handleClose={handleClose}
          customer={selectedRow}
        />
        <DataTable
          data={customers}
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
