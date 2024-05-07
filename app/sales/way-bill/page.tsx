"use client";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useCallback, useEffect, useState } from "react";
import ListComponent from "@/components/ListComponent";
import AddWayBill from "@/components/sales/waybill/AddWayBill";
import ViewWayBillDetails from "@/components/sales/waybill/ViewWayBillDetails";
import { allWayBillsData } from "@/data/allWayBillsData";
import type { WayBill } from "@/components/Types";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteWayBill from "@/components/sales/waybill/DeleteWayBill";
import EditWayBill from "@/components/sales/waybill/EditWayBill";

export default function WayBillPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<WayBill>({} as WayBill);
  const [view, setView] = useState<boolean>(false);
  const [wayBills, setWayBills] = useState<WayBill[]>([]);

  const columns = [
    {
      name: "Date",
      selector: (row: { date: Date }) => new Date(row.date).toDateString(),
    },
    {
      name: "Delivery Ref No.",
      selector: (row: { deliveryReferenceNumber: string }) =>
        row.deliveryReferenceNumber,
    },
    {
      name: "Amount",
      cell: (row: { amount: number }) => <span>$ {row.amount}</span>,
    },
    {
      name: "Customer",
      selector: (row: { customer: string }) => row.customer,
    },
    {
      name: "Address",
      selector: (row: { address: string }) => row.address,
    },
    {
      name: "Actions",
      cell: (row: WayBill) => [
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

  // Delete
  const onDelete = (row: WayBill) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  // Edit
  const onEdit = (row: WayBill) => {
    setSelectedRow(row);
    setEdit(true);
  };

  // View
  const onRowClicked = (row: WayBill) => {
    setSelectedRow(row);
    setView(true);
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

  // Fetch Deliveries
  useEffect(() => {
    const fetchWayBills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/waybills");
        setWayBills(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWayBills();
  }, [wayBills]);

  return (
    <ListComponent
      title="Way Bills"
      buttonText="Add Way Bill"
      buttonAction={onAddClicked}
    >
      <>
        <AddWayBill open={add} handleClose={handleClose} />
        <EditWayBill
          open={edit}
          handleClose={handleClose}
          wayBill={selectedRow}
        />
        <ViewWayBillDetails
          open={view}
          handleClose={handleClose}
          wayBill={selectedRow}
        />
        <DeleteWayBill
          open={confirmDelete}
          handleClose={handleClose}
          wayBill={selectedRow}
        />
        <DataTable // TO DO change table data to way bill data
          data={wayBills}
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
