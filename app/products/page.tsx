"use client";
import React, { useCallback, useState } from "react";
import { allProductsData } from "@/data/allProductsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ViewProductDetails from "@/components/products/ViewProductDetails";
import ListPage from "@/components/ListPage";
import Image from "next/image";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stock } from "@/components/Types";

const columns = [
  {
    name: "Image",
    selector: (row: { image: string }) => row.image,
    width: "80px",
    cell: (row: { image: string }) => (
      <Image
        className="rounded-full"
        src={row.image}
        alt="Product Image"
        height={40}
        width={40}
      />
    ),
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
    selector: (row: { brand: string }) => row.brand,
  },
  {
    name: "Category",
    selector: (row: { category: string }) => row.category,
  },
  {
    name: "Cost ($)",
    selector: (row: { cost: number }) => row.cost,
  },
  {
    name: "Price ($)",
    selector: (row: { price: number }) => row.price,
  },
  {
    name: "Quantity",
    cell: (row: { stock: Stock[] }) => (
      <div>{row.stock.reduce((qty, obj) => qty + obj.quantity, 0)}</div>
    ),
  },
  {
    name: "Alert Qnty",
    selector: (row: { alertQuantity: number }) => row.alertQuantity,
  },
  {
    name: "Actions",
    cell: (row: { id: string }) => [
      <Link href={`/products/edit-product/${row.id}`} key={row.id}>
        <EditIcon sx={{ color: "#475BE8" }} />
      </Link>,
      <Link key={row.id} href="/products">
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

export default function ProductsPage() {
  const [view, setView] = useState<boolean>(false);
  const [productID, setProductID] = useState<string>("1");

  const handleClose = useCallback((): void => {
    setView(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setProductID(row.id);
    setView(true);
  };
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
          productID={productID}
        />
        <DataTable
          data={allProductsData}
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
