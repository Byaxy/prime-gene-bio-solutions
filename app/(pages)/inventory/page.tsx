"use client";

import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ViewProductStockDetails from "@/components/inventory/ViewProductStockDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TransformIcon from "@mui/icons-material/Transform";
import type { Inventory } from "@/components/Types";
import DeleteStock from "@/components/inventory/DeleteStock";
import EditStock from "@/components/inventory/EditStock";
import ListComponent from "@/components/ListComponent";
import AddStock from "@/components/inventory/AddStock";
import useInventory from "@/utils/hooks/useInventory";
import Loading from "@/app/Loading";
import AdjustStock from "@/components/inventory/AdjustStock";

export default function InventoryPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [confirmAdjustment, setConfirmAdjustment] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Inventory>({} as Inventory);

  // fetch Inventory
  const { data: inventory, error, isLoading } = useInventory();

  const columns = [
    {
      name: "Product Name",
      selector: (row: { product: string }) => row.product,
    },
    {
      name: "Lot Number",
      selector: (row: { lotNumber: string }) => row.lotNumber,
      width: "140px",
    },
    {
      name: "Quantity",
      cell: (row: { quantity: number; unit: string }) => (
        <span>
          {row.quantity} {row.unit}
        </span>
      ),
      width: "100px",
    },
    {
      name: "Cost",
      cell: (row: { cost: number }) => <span>${row.cost}</span>,
      width: "80px",
    },
    {
      name: "Price",
      cell: (row: { price: number }) => <span>${row.price}</span>,
      width: "80px",
    },
    {
      name: "Manufacture Date",
      cell: (row: { manufactureDate: Date | null }) =>
        row.manufactureDate ? (
          <span>{new Date(row.manufactureDate).toDateString()}</span>
        ) : (
          <span>Null</span>
        ),
      width: "180px",
    },
    {
      name: "Expiry Date",
      cell: (row: { expiryDate: Date | null }) =>
        row.expiryDate ? (
          <span>{new Date(row.expiryDate).toDateString()}</span>
        ) : (
          <span>Null</span>
        ),
      width: "180px",
    },

    {
      name: "Actions",
      cell: (row: Inventory) => [
        <span
          key={"adjust" + row.id}
          onClick={() => onInventoryAdjustment(row)}
          className="text-green-700 py-1 px-2 hover:bg-white hover:rounded-md transition"
          title="Adjust Inventory"
        >
          <TransformIcon />
        </span>,
        <span
          key={"edit" + row.id}
          onClick={() => handleEdit(row)}
          className="text-[#475BE8] py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <EditIcon />
        </span>,
        <span
          key={"delete" + row.id}
          onClick={() => handleDelete(row)}
          className="text-redColor py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <DeleteIcon />
        </span>,
      ],
      width: "140px",
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  ];

  // close dialog
  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
    setConfirmAdjustment(false);
  }, []);

  // Add new stock
  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  // Edit stock
  const handleEdit = (row: Inventory) => {
    setSelectedRow(row);
    setEdit(true);
  };

  // Delete stock
  const handleDelete = (row: Inventory) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  //handle Inventory adjustment
  const onInventoryAdjustment = (row: Inventory) => {
    setSelectedRow(row);
    setConfirmAdjustment(true);
  };

  //handle row click
  const onRowClicked = (row: Inventory) => {
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
    <ListComponent
      title="Products Stock"
      buttonText="Add New Stock"
      buttonAction={onAddClicked}
    >
      <>
        <AddStock open={add} handleClose={handleClose} />
        <AdjustStock
          open={confirmAdjustment}
          handleClose={handleClose}
          inventory={selectedRow}
        />
        <EditStock
          open={edit}
          handleClose={handleClose}
          inventory={selectedRow}
        />
        <ViewProductStockDetails
          open={view}
          handleClose={handleClose}
          inventory={selectedRow}
        />
        <DeleteStock
          open={confirmDelete}
          handleClose={handleClose}
          inventory={selectedRow}
        />
        {isLoading && <Loading />}
        {!isLoading && (
          <DataTable
            data={inventory?.success || []}
            columns={columns}
            customStyles={customTableStyles}
            onRowClicked={onRowClicked}
            className="scrollbar-hide"
            pagination
          />
        )}
      </>
    </ListComponent>
  );
}
