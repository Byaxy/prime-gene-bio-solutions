"use client";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ViewProductStockDetails from "@/components/inventory/ViewProductStockDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Inventory } from "@/components/Types";
import DeleteStock from "@/components/inventory/DeleteStock";
import EditStock from "@/components/inventory/EditStock";
import { DB, query } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";
import ListComponent from "@/components/ListComponent";
import AddStock from "@/components/inventory/AddStock";

export default function InventoryPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [selectedRow, setSelectedRow] = useState<Inventory>({} as Inventory);

  const columns = [
    {
      name: "Product Name",
      selector: (row: { productName: string }) => row.productName,
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
      width: "100px",
    },
    {
      name: "Price",
      cell: (row: { price: number }) => <span>${row.price}</span>,
      width: "100px",
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
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
  ];

  // close dialog
  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
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

  const onRowClicked = (row: Inventory) => {
    setSelectedRow(row);
    setView(true);
  };

  // Fetch all products and spread them by stock
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { documents } = await DB.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteInventoryCollectionId,
          query
        );
        console.log(documents);
        const inventory = documents.map((product: any) => ({
          id: product.$id,
          productName: product.product && product.product.name,
          lotNumber: product.lotNumber,
          manufactureDate: product.manufactureDate,
          expiryDate: product.expiryDate,
          quantity: product.quantity,
          cost: product.cost,
          price: product.price,
          unit:
            product.product &&
            product.product.unit &&
            product.product.unit.code,
          createdAt: product.$createdAt,
          updatedAt: product.$updatedAt,
        }));

        setInventory(inventory);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [inventory]);

  return (
    <ListComponent
      title="Products Stock"
      buttonText="Add New Stock"
      buttonAction={onAddClicked}
    >
      <>
        <AddStock open={add} handleClose={handleClose} />
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
        <DataTable
          data={inventory}
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
