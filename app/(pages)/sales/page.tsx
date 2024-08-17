"use client";

import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListPage from "@/components/ListPage";
import ViewSaleDetails from "@/components/sales/invoice/ViewSaleDetails";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Sale } from "@/components/Types";
import { config } from "@/config/config";
import DeleteSale from "@/components/sales/DeleteSale";
import Loading from "@/app/Loading";
import useSales from "@/utils/hooks/useSales";

export default function SalesPage() {
  const [view, setView] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Sale>({} as Sale);

  // feetch sales
  const { data: sales, error, isLoading, isSuccess } = useSales();

  const columns = [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) =>
        new Date(row.createdAt).toDateString(),
      width: "180px",
      sortable: true,
    },
    {
      name: "Invoice No.",
      selector: (row: { invoiceNumber: string }) => row.invoiceNumber,
      width: "160px",
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row: { customer: string }) => row.customer,
      sortable: true,
    },
    {
      name: "Sale Status",
      selector: (row: { saleStatus: string }) => row.saleStatus,
      width: "120px",
      conditionalCellStyles: [
        {
          when: (row: { saleStatus: string }) => row.saleStatus === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "700",
          },
        },
        {
          when: (row: { saleStatus: string }) => row.saleStatus === "Complete",
          style: {
            color: "#2ED480",
            fontWeight: "700",
          },
        },
        {
          when: (row: { saleStatus: string }) => row.saleStatus === "Cancelled",
          style: {
            color: "#dc4545",
            fontWeight: "700",
          },
        },
      ],
    },
    {
      name: "Paid",
      cell: (row: { paid: number }) => <span>${row.paid}</span>,
      width: "100px",
      sortable: true,
    },
    {
      name: "Total",
      cell: (row: { total: number }) => <span>${row.total}</span>,
      width: "100px",
    },
    {
      name: "Payment Status",
      selector: (row: { paymentStatus: string }) => row.paymentStatus,
      width: "180px",
      sortable: true,
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
      name: "Actions",
      cell: (row: Sale) => [
        <Link
          href={`/sales/edit-sale/${row.id}`}
          key={"edit" + row.id}
          className="text-[#475BE8] py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <EditIcon />
        </Link>,
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

  const onDelete = (row: Sale) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const handleClose = useCallback((): void => {
    setView(false);
    setConfirmDelete(false);
  }, []);

  const onRowClicked = (row: Sale) => {
    setSelectedRow(row);
    setView(true);
  };

  if (error) {
    return (
      <div className="flex justify-center text-primaryDark font-semibold text-lg py-5">
        {error.message}
      </div>
    );
  }

  return (
    <ListPage
      title="All Sales"
      buttonText="Add Sale"
      buttonPath="/sales/add-sale"
    >
      <>
        <ViewSaleDetails
          open={view}
          handleClose={handleClose}
          sale={selectedRow}
        />
        <DeleteSale
          open={confirmDelete}
          handleClose={handleClose}
          sale={selectedRow}
        />
        {isLoading && <Loading />}
        {!isLoading && isSuccess && (
          <DataTable
            data={sales?.success || []}
            columns={columns}
            customStyles={customTableStyles}
            onRowClicked={onRowClicked}
            className="scrollbar-hide"
            pagination
          />
        )}
      </>
    </ListPage>
  );
}
