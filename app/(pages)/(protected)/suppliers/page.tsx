"use client";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddSupplier from "@/components/suppliers/AddSupplier";
import ViewSupplierDetails from "@/components/suppliers/ViewSupplierDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSupplier from "@/components/suppliers/EditSupplier";
import DeleteSupplier from "@/components/suppliers/DeleteSupplier";
import axios from "axios";
import { Supplier } from "@/components/Types";

export default function SuppliersPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedRow, setSelectedRow] = useState<Supplier>({} as Supplier);

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
    },
    {
      name: "City",
      selector: (row: { city: string }) => row.city,
    },
    {
      name: "Country",
      selector: (row: { country: string }) => row.country,
    },
    {
      name: "Actions",
      cell: (row: Supplier) => [
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

  const onAdd = useCallback((): void => {
    setAdd(true);
  }, []);

  const onEdit = (row: Supplier) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const onDelete = (row: Supplier) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
  }, []);

  const onRowClicked = (row: Supplier) => {
    setSelectedRow(row);
    setView(true);
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get("http://localhost:5000/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSupplier();
  }, [suppliers]);

  return (
    <ListComponent
      title="All Suppliers"
      buttonText="Add Supplier"
      buttonAction={onAdd}
    >
      <>
        <AddSupplier open={add} handleClose={handleClose} />
        <EditSupplier
          open={edit}
          handleClose={handleClose}
          supplier={selectedRow}
        />
        <ViewSupplierDetails
          open={view}
          handleClose={handleClose}
          supplier={selectedRow}
        />
        <DeleteSupplier
          open={confirmDelete}
          handleClose={handleClose}
          supplier={selectedRow}
        />
        <DataTable
          data={suppliers}
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
