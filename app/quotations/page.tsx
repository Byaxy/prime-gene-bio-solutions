"use client";
import React from "react";
import { allQuotationsData } from "@/data/allQuotationsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  {
    name: "Date",
    selector: (row: { createdAt: Date }) => row.createdAt.toDateString(),
  },
  {
    name: "Quotation No.",
    selector: (row: { quotationNumber: string }) => row.quotationNumber,
    width: "160px",
  },
  {
    name: "Customer",
    selector: (row: { customer: string }) => row.customer,
  },
  {
    name: "Total",
    selector: (row: { total: number }) => row.total,
    width: "90px",
  },
  {
    name: "Status",
    selector: (row: { quotationStatus: string }) => row.quotationStatus,
    width: "120px",
    conditionalCellStyles: [
      {
        when: (row: { quotationStatus: string }) =>
          row.quotationStatus === "Pending",
        style: {
          color: "#FD8539",
          fontWeight: "700",
        },
      },
      {
        when: (row: { quotationStatus: string }) =>
          row.quotationStatus === "Completed",
        style: {
          color: "#2ED480",
          fontWeight: "700",
        },
      },
      {
        when: (row: { quotationStatus: string }) =>
          row.quotationStatus === "Cancelled",
        style: {
          color: "#dc4545",
          fontWeight: "700",
        },
      },
    ],
  },
  {
    name: "Actions",
    cell: (row: { id: string }) => [
      <Link href={`/quotations/edit-quotation/${row.id}`} key={row.id}>
        <EditIcon sx={{ color: "#475BE8" }} />
      </Link>,
      <Link key={row.id} href="/quotations">
        <DeleteIcon color="error" />
      </Link>,
    ],
    width: "90px",
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "4px",
    },
  },
];

export default function QuotationsPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    router.push(`/quotations/${row.id}`);
  };
  return (
    <ListPage
      title="Quotations"
      buttonText="Add Quotation"
      buttonPath="/quotations/add-quotation"
    >
      <DataTable
        data={allQuotationsData}
        columns={columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
        pagination
      />
    </ListPage>
  );
}
