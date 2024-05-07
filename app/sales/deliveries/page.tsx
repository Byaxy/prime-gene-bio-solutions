"use client";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useCallback, useEffect, useState } from "react";
import ListComponent from "@/components/ListComponent";
import AddDelivery from "@/components/sales/deliveries/AddDelivery";
import ViewDeliveryDetails from "@/components/sales/deliveries/ViewDeliveryDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Delivery } from "@/components/Types";
import axios from "axios";
import DeleteDelivery from "@/components/sales/deliveries/DeleteDelivery";
import EditDeleivery from "@/components/sales/deliveries/EditDeleivery";

export default function DeliveriesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Delivery>({} as Delivery);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const columns = [
    {
      name: "Delivery Date",
      selector: (row: { date: Date }) => new Date(row.date).toDateString(),
      width: "150px",
    },
    {
      name: "Delivery Ref No.",
      selector: (row: { deliveryReferenceNumber: string }) =>
        row.deliveryReferenceNumber,

      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Sale Invoice No.",
      selector: (row: { saleInvoiceNumber: string }) => row.saleInvoiceNumber,
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
      name: "Status",
      selector: (row: { status: string }) => row.status,

      conditionalCellStyles: [
        {
          when: (row: { status: string }) => row.status === "Delivering",
          style: {
            color: "#FD8539",
            fontWeight: "600",
          },
        },
        {
          when: (row: { status: string }) => row.status === "Delivered",
          style: {
            color: "#2ED480",
            fontWeight: "600",
          },
        },
        {
          when: (row: { status: string }) => row.status === "Parking",
          style: {
            fontWeight: "600",
          },
        },
      ],
    },
    {
      name: "Actions",
      cell: (row: Delivery) => [
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
  const onDelete = (row: Delivery) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  // Edit Delivery
  const onEdit = (row: Delivery) => {
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
  const onRowClicked = (row: Delivery) => {
    setSelectedRow(row);
    setView(true);
  };

  // Fetch deliveries
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/deliveries");
        setDeliveries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeliveries();
  }, [deliveries]);

  return (
    <ListComponent
      title="All Deliveries"
      buttonText="Add Delivery"
      buttonAction={onAddClicked}
    >
      <>
        <AddDelivery open={add} handleClose={handleClose} />
        <EditDeleivery
          open={edit}
          handleClose={handleClose}
          delivery={selectedRow}
        />
        <ViewDeliveryDetails
          open={view}
          handleClose={handleClose}
          delivery={selectedRow}
        />
        <DeleteDelivery
          open={confirmDelete}
          handleClose={handleClose}
          delivery={selectedRow}
        />
        <DataTable
          data={deliveries}
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
