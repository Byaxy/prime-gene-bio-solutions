"use client";

import React, { useCallback, useEffect, useState } from "react";
import { returnsData } from "@/data/returnsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddReturn from "@/components/sales/returns/AddReturn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { SaleReturn } from "@/components/Types";
import axios from "axios";
import ViewReturnDetails from "@/components/sales/returns/ViewReturnDetails";
import DeleteReturn from "@/components/sales/returns/DeleteReturn";
import EditReturn from "@/components/sales/returns/EditReturn";

export default function SalesReturnsPage() {
  const [returns, setReturns] = useState<SaleReturn[]>([]);
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<SaleReturn>({} as SaleReturn);

  const columns = [
    {
      name: "Date",
      selector: (row: { date: Date }) => new Date(row.date).toDateString(),
      width: "180px",
      sortable: true,
    },
    {
      name: "Invoice No.",
      selector: (row: { saleInvoiceNumber: string }) => row.saleInvoiceNumber,
      width: "160px",
    },
    {
      name: "Delivery Reff No.",
      selector: (row: { deliveryReferenceNumber: string }) =>
        row.deliveryReferenceNumber,
      width: "160px",
    },
    {
      name: "Customer",
      selector: (row: { customer: string }) => row.customer,
    },
    {
      name: "Total Returned",
      cell: (row: { total: number }) => <span>${row.total}</span>,
      width: "160px",
    },
    {
      name: "Actions",
      cell: (row: SaleReturn) => [
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

  // Add new Return
  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  // Close dialog
  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
  }, []);

  // View Return details
  const onRowClicked = (row: SaleReturn) => {
    setSelectedRow(row);
    setView(true);
  };

  // Confirm Delete Delivery
  const onDelete = (row: SaleReturn) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  // Edit Delivery
  const onEdit = (row: SaleReturn) => {
    setSelectedRow(row);
    setEdit(true);
  };

  // Fetch Returns
  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sales-returns");
        setReturns(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReturns();
  }, [returns]);

  return (
    <ListComponent
      title="Sales Returns"
      buttonText="Add Return"
      buttonAction={onAddClicked}
    >
      <>
        <AddReturn open={add} handleClose={handleClose} />
        <EditReturn
          open={edit}
          handleClose={handleClose}
          saleReturn={selectedRow}
        />
        <ViewReturnDetails
          open={view}
          handleClose={handleClose}
          saleReturn={selectedRow}
        />
        <DeleteReturn
          open={confirmDelete}
          handleClose={handleClose}
          saleReturn={selectedRow}
        />
        <DataTable
          data={returns}
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
