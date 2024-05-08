"use client";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Quotation } from "@/components/Types";
import axios from "axios";
import DeleteQuotation from "@/components/quotations/DeleteQuotation";
import ViewQuotationDetails from "@/components/quotations/ViewQuotationDetails";

export default function QuotationsPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Quotation>({} as Quotation);
  const [quotations, setQuotations] = useState<Quotation[]>([]);

  const router = useRouter();

  const columns = [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) =>
        new Date(row.createdAt).toDateString(),
      width: "180px",
    },
    {
      name: "Quotation No.",
      selector: (row: { quotationNumber: string }) => row.quotationNumber,
      width: "180px",
    },
    {
      name: "Customer",
      selector: (row: { customer: string }) => row.customer,
    },
    {
      name: "Total",
      cell: (row: { total: number }) => <span>${row.total}</span>,
      width: "140px",
    },
    {
      name: "Status",
      selector: (row: { quotationStatus: string }) => row.quotationStatus,
      width: "140px",
      conditionalCellStyles: [
        {
          when: (row: { quotationStatus: string }) =>
            row.quotationStatus === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "600",
          },
        },
        {
          when: (row: { quotationStatus: string }) =>
            row.quotationStatus === "Complete",
          style: {
            color: "#2ED480",
            fontWeight: "600",
          },
        },
        {
          when: (row: { quotationStatus: string }) =>
            row.quotationStatus === "Cancelled",
          style: {
            color: "#dc4545",
            fontWeight: "600",
          },
        },
      ],
    },
    {
      name: "Actions",
      cell: (row: Quotation) => [
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
      width: "100px",
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
  ];

  // edit
  const onEdit = (row: { id: string }) => {
    router.push(`/quotations/edit-quotation/${row.id}`);
  };

  // delete
  const onDelete = (row: Quotation) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  // close dialog
  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
    setConfirmDelete(false);
  }, []);

  // view
  const onRowClicked = (row: Quotation) => {
    setSelectedRow(row);
    setView(true);
  };

  // Fetch quotations
  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/quotations");
        setQuotations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuotations();
  }, [quotations]);

  return (
    <ListPage
      title="Quotations"
      buttonText="Add Quotation"
      buttonPath="/quotations/add-quotation"
    >
      <>
        <ViewQuotationDetails
          open={view}
          handleClose={handleClose}
          quotation={selectedRow}
        />
        <DeleteQuotation
          open={confirmDelete}
          handleClose={handleClose}
          quotation={selectedRow}
        />
        <DataTable
          data={quotations}
          columns={columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListPage>
  );
}
