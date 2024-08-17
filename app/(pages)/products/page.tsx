"use client";

import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ViewProductDetails from "@/components/products/ViewProductDetails";
import { CldImage } from "next-cloudinary";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Product } from "@/components/Types";
import DeleteProduct from "@/components/products/DeleteProduct";
import Link from "next/link";
import useProducts from "@/utils/hooks/useProducts";
import Loading from "@/app/Loading";
import useInventory from "@/utils/hooks/useInventory";
import ListComponent from "@/components/ListComponent";
import AddProduct from "@/components/products/AddProduct";
import Image from "next/image";
import EditProduct from "@/components/products/EditProduct";

export default function ProductsPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Product>({} as Product);

  // Fetch products
  const { data, error, isLoading } = useProducts();
  const { data: inventory } = useInventory();

  const columns = [
    {
      name: "Image",
      selector: (row: { image: string }) => row.image,
      width: "120px",
      cell: (row: { image: string }) =>
        row.image ? (
          <CldImage
            className="rounded w-auto h-auto"
            src={row.image}
            alt="Brand Image"
            height={40}
            width={60}
          />
        ) : (
          <div>
            <Image
              src="/placeholder.jpg"
              alt="No Image"
              height={40}
              width={60}
            />
          </div>
        ),
      style: {
        paddingTop: "8px",
        paddingBottom: "8px",
      },
    },
    {
      name: "Code",
      selector: (row: { code: string }) => row.code,
      width: "180px",
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
      selector: (row: { category: string }) =>
        row.category ? row.category : "Null",
    },
    {
      name: "Cost",
      width: "100px",
      cell: (row: { name: string }) =>
        inventory?.success?.find((item) => item.product === row.name) ? (
          <span>
            $
            {
              inventory?.success?.find((item) => item.product === row.name)
                ?.cost
            }
          </span>
        ) : (
          "Null"
        ),
    },
    {
      name: "Price",
      width: "100px",
      cell: (row: { name: string }) =>
        inventory?.success?.find((item) => item.product === row.name) ? (
          <span>
            $
            {
              inventory?.success?.find((item) => item.product === row.name)
                ?.price
            }
          </span>
        ) : (
          "Null"
        ),
    },
    {
      name: "Actions",
      cell: (row: Product) => [
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

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);
  const onDelete = (row: Product) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const onEdit = (row: Product) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const handleClose = useCallback((): void => {
    setAdd(false);
    setEdit(false);
    setView(false);
    setConfirmDelete(false);
  }, []);

  const onRowClicked = (row: Product) => {
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
      title="All Products"
      buttonText="Add Product"
      buttonAction={onAddClicked}
    >
      <>
        <AddProduct open={add} handleClose={handleClose} />
        <EditProduct
          open={edit}
          handleClose={handleClose}
          product={selectedRow}
        />
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
        {isLoading && <Loading />}
        {!isLoading && (
          <DataTable
            data={data?.success || []}
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
