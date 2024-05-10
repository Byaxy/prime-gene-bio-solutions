"use client";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import { useCallback, useEffect, useState } from "react";
import type { Purchase } from "@/components/Types";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPurchase from "@/components/purchases/AddPurchase";
import DeletePurchase from "@/components/purchases/DeletePurchase";

export default function PurchasesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Purchase>({} as Purchase);
  const [purchases, setPurchases] = useState<Purchase[]>([]);

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
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
  }, []);
  const onRowClicked = (row: Purchase) => {
    setSelectedRow(row);
    setView(true);
  };

  // Fetch Purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("http://localhost:5000/purchases");
        setPurchases(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPurchases();
  }, [purchases]);

  return (
    <ListComponent
      title="All Purchases"
      buttonText="Add Purchase"
      buttonAction={onAddClicked}
    >
      <>
        <AddPurchase open={add} handleClose={handleClose} />
        <DeletePurchase
          open={confirmDelete}
          handleClose={handleClose}
          purchase={selectedRow}
        />
        <DataTable
          data={purchases}
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
