"use client";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ViewProductDetails from "@/components/products/ViewProductDetails";
import ListPage from "@/components/ListPage";
import { CldImage } from "next-cloudinary";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stock } from "@/components/Types";
import type { Product } from "@/components/Types";
import axios from "axios";
import DeleteProduct from "@/components/products/DeleteProduct";
import Link from "next/link";

export default function ProductsPage() {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedRow, setSelectedRow] = useState<Product>({} as Product);

  const columns = [
    {
      name: "Image",
      selector: (row: { image: string }) => row.image,
      width: "80px",
      cell: (row: { image: string }) => (
        <CldImage
          className="rounded-lg"
          src={row.image}
          alt="Product Image"
          height={40}
          width={60}
        />
      ),
      style: {
        paddingTop: "8px",
        paddingBottom: "8px",
      },
    },
    {
      name: "Code",
      selector: (row: { code: string }) => row.code,
      width: "90px",
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Brand",
      width: "120px",
      selector: (row: { brand: string }) => row.brand,
    },
    {
      name: "Category",
      selector: (row: { category: string }) => row.category,
    },
    {
      name: "Cost",
      width: "90px",
      cell: (row: { cost: number }) => <span>${row.cost}</span>,
    },
    {
      name: "Price",
      width: "90px",
      cell: (row: { price: number }) => <span>${row.price}</span>,
    },
    {
      name: "Qnty",
      width: "80px",
      cell: (row: { stock: Stock[]; unit: string }) => (
        <span>
          {row.stock.reduce((qty, obj) => qty + obj.quantity, 0)} {row.unit}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Product) => [
        <Link
          href={`/products/edit-product/${row.id}`}
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

  const onDelete = (row: Product) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const handleClose = useCallback((): void => {
    setView(false);
    setConfirmDelete(false);
  }, []);

  const onRowClicked = (row: Product) => {
    setSelectedRow(row);
    setView(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [products]);

  return (
    <ListPage
      title="All Products"
      buttonText="Add Product"
      buttonPath="/products/add-product"
    >
      <>
        <ViewProductDetails
          open={view}
          handleClose={handleClose}
          product={selectedRow}
        />
        <DeleteProduct
          open={confirmDelete}
          handleClose={handleClose}
          product={selectedRow}
        />
        <DataTable
          data={products}
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
