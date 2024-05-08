"use client";

import React, { useCallback, useState } from "react";
import { returnsData } from "@/data/returnsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListComponent from "@/components/ListComponent";
import AddReturn from "@/components/sales/returns/AddReturn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Purchase } from "@/components/Types";

export default function PurchasesReturnsPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Purchase>({} as Purchase);
  const [purchaseReturns, setPurchaseReturns] = useState<Purchase[]>([]);

  const columns = [
    {
      name: "Date",
      selector: (row: { date: Date }) => new Date(row.date).toDateString(),
      width: "160px",
    },
    {
      name: "Purchase Order No.",
      selector: (row: { purchaseOrderNumber: string }) =>
        row.purchaseOrderNumber,
    },
    {
      name: "Supplier",
      selector: (row: { supplier: string }) => row.supplier,
    },
    {
      name: "Total Amount",
      cell: (row: { total: number }) => <span>${row.total}</span>,
      width: "160px",
    },
    {
      name: "Payment Status",
      selector: (row: { paymentStatus: string }) => row.paymentStatus,
      conditionalCellStyles: [
        {
          when: (row: { paymentStatus: string }) =>
            row.paymentStatus === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "600",
          },
        },
        {
          when: (row: { paymentStatus: string }) =>
            row.paymentStatus === "Paid",
          style: {
            color: "#2ED480",
            fontWeight: "600",
          },
        },
        {
          when: (row: { paymentStatus: string }) => row.paymentStatus === "Due",
          style: {
            color: "#dc4545",
            fontWeight: "600",
          },
        },
      ],
    },
    {
      name: "Purchase Status",
      selector: (row: { purchaseStatus: string }) => row.purchaseStatus,
      conditionalCellStyles: [
        {
          when: (row: { purchaseStatus: string }) =>
            row.purchaseStatus === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "700",
          },
        },
        {
          when: (row: { purchaseStatus: string }) =>
            row.purchaseStatus === "Complete",
          style: {
            color: "#2ED480",
            fontWeight: "700",
          },
        },
        {
          when: (row: { purchaseStatus: string }) =>
            row.purchaseStatus === "Cancelled",
          style: {
            color: "#dc4545",
            fontWeight: "700",
          },
        },
      ],
    },
    {
      name: "Actions",
      cell: (row: Purchase) => [
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

  // Confirm Delete Delivery
  const onDelete = (row: Purchase) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  // Edit Delivery
  const onEdit = (row: Purchase) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
  }, []);

  const onRowClicked = (row: Purchase) => {
    setSelectedRow(row);
    setView(true);
  };

  return (
    <ListComponent
      title="Purchases Returns"
      buttonText="Add Return"
      buttonAction={onAddClicked}
    >
      <>
        <AddReturn open={add} handleClose={handleClose} />
        <DataTable
          data={purchaseReturns}
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
