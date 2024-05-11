"use client";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import AddType from "@/components/products/types/AddType";
import ListComponent from "@/components/ListComponent";
import ViewTypeDetails from "@/components/products/types/ViewTypeDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditType from "@/components/products/types/EditType";
import DeleteType from "@/components/products/types/DeleteType";
import axios from "axios";
import type { ProductType } from "@/components/Types";
import Loading from "@/app/(pages)/Loading";

export default function ProductTypesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [types, setTypes] = useState<ProductType[]>([]);
  const [selectedRow, setSelectedRow] = useState<ProductType>(
    {} as ProductType
  );

  const columns = [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) =>
        new Date(row.createdAt).toDateString(),
      width: "180px",
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Description",
      selector: (row: { description: string }) => row.description,
    },
    {
      name: "Actions",
      cell: (row: ProductType) => [
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

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const onEdit = (row: ProductType) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const onDelete = (row: ProductType) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
  }, []);
  const onRowClicked = (row: ProductType) => {
    setSelectedRow(row);
    setView(true);
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/types");
        setTypes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTypes();
  }, [types]);

  return (
    <ListComponent
      title="Product Types"
      buttonText="Add Type"
      buttonAction={onAddClicked}
    >
      <>
        <AddType open={add} handleClose={handleClose} />
        <EditType open={edit} handleClose={handleClose} type={selectedRow} />
        <ViewTypeDetails
          open={view}
          handleClose={handleClose}
          type={selectedRow}
        />
        <DeleteType
          open={confirmDelete}
          handleClose={handleClose}
          type={selectedRow}
        />
        <DataTable
          data={types}
          columns={columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
        <div>
          <Loading />
        </div>
      </>
    </ListComponent>
  );
}
