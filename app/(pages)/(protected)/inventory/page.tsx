"use client";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ViewProductStockDetails from "@/components/inventory/ViewProductStockDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListPage from "@/components/ListPage";
import axios from "axios";
import type { Product, ProductWithStock, Stock } from "@/components/Types";
import DeleteStock from "@/components/inventory/DeleteStock";
import toast from "react-hot-toast";
import EditStock from "@/components/inventory/EditStock";

export default function InventoryPage() {
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [stock, setStock] = useState<ProductWithStock[]>([]);
  const [selectedRow, setSelectedRow] = useState<ProductWithStock>(
    {} as ProductWithStock
  );

  const columns = [
    {
      name: "Reg. Date",
      cell: (row: { stock: Stock }) => (
        <span>
          {row.stock.createdAt
            ? new Date(row.stock.createdAt).toDateString()
            : "Null"}
        </span>
      ),
      width: "180px",
    },
    {
      name: "Product Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Lot Number",
      cell: (row: { stock: Stock }) => (
        <span>{row.stock.lotNumber ? row.stock.lotNumber : "Null"}</span>
      ),
      width: "180px",
    },
    {
      name: "Manufacture Date",
      cell: (row: { stock: Stock }) => (
        <span>
          {row.stock.manufactureDate
            ? new Date(row.stock.manufactureDate).toDateString()
            : "Null"}
        </span>
      ),
      width: "180px",
    },
    {
      name: "Expiry Date",
      cell: (row: { stock: Stock }) => (
        <span>
          {row.stock.expiryDate
            ? new Date(row.stock.expiryDate).toDateString()
            : "Null"}
        </span>
      ),
      width: "180px",
    },
    {
      name: "Qnty",
      cell: (row: { stock: Stock }) => (
        <span>{row.stock.quantity ? row.stock.quantity : "Null"}</span>
      ),
      width: "90px",
    },
    {
      name: "Actions",
      cell: (row: ProductWithStock) => [
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
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
  }, []);

  // Edit stock
  const handleEdit = (row: ProductWithStock) => {
    if (!row.stock.id) {
      toast.error("No stock to Edit. Please add new Stock");
      return;
    }
    setSelectedRow(row);
    setEdit(true);
  };

  // Delete stock
  const handleDelete = (row: ProductWithStock) => {
    if (!row.stock.id) {
      toast.error("Stock is Empty. No Stock to Delete");
      return;
    }
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const onRowClicked = (row: ProductWithStock) => {
    setSelectedRow(row);
    setView(true);
  };

  // spread products by stcok
  const spreadProductsByStock = (products: Product[]) => {
    const spreadArray: ProductWithStock[] = [];
    products.forEach((product) => {
      if (product.stock.length > 0) {
        product.stock.forEach((stockItem) => {
          spreadArray.push({ ...product, stock: stockItem });
        });
      } else {
        spreadArray.push({ ...product, stock: {} as Stock });
      }
    });
    return spreadArray;
  };

  // Fetch all products and spread them by stock
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        const data = spreadProductsByStock(response.data);
        setStock(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [stock]);

  return (
    <ListPage
      title="Products Stock"
      buttonText="Adjust Stock"
      buttonPath="/inventory/adjust-stock"
    >
      <>
        <EditStock open={edit} handleClose={handleClose} stock={selectedRow} />
        <ViewProductStockDetails
          open={view}
          handleClose={handleClose}
          stock={selectedRow}
        />
        <DeleteStock
          open={confirmDelete}
          handleClose={handleClose}
          stock={selectedRow}
        />
        <DataTable
          data={stock}
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
