"use client";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import AddBrand from "@/components/products/brands/AddBrand";
import ListComponent from "@/components/ListComponent";
import ViewBrandDetails from "@/components/products/brands/ViewBrandDetails";
import { CldImage } from "next-cloudinary";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Brand } from "@/components/Types";
import axios from "axios";
import DeleteBrand from "@/components/products/brands/DeleteBrand";
import EditBrand from "@/components/products/brands/EditBrand";
import { DB, Query } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

export default function ProductBrandsPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedRow, setSelectedRow] = useState<Brand>({} as Brand);

  const columns = [
    {
      name: "Image",
      selector: (row: { image: string }) => row.image,
      width: "160px",
      cell: (row: { image: string }) => (
        <CldImage
          className="rounded"
          src={row.image}
          alt="Brand Image"
          height={50}
          width={100}
        />
      ),
      style: {
        paddingTop: "8px",
        paddingBottom: "8px",
      },
    },
    {
      name: "Date",
      selector: (row: { createdAt: Date }) =>
        new Date(row.createdAt).toDateString(),
      width: "180px",
    },
    {
      name: "Code",
      selector: (row: { code: string }) => row.code,
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Actions",
      cell: (row: Brand) => [
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

  const onEdit = (row: Brand) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const onDelete = (row: Brand) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
  }, []);

  const onRowClicked = (row: Brand) => {
    setSelectedRow(row);
    setView(true);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { documents } = await DB.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteProductBrandsCollectionId,
          [Query.orderDesc("$createdAt"), Query.limit(1000)]
        );

        const brands = documents.map((doc: any) => ({
          id: doc.$id,
          name: doc.name,
          code: doc.code,
          image: doc.image,
          createdAt: doc.$createdAt,
          updatedAt: doc.$updatedAt,
        }));

        setBrands(brands);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrands();
  }, [brands]);

  return (
    <ListComponent
      title="Product Brands"
      buttonText="Add Brand"
      buttonAction={onAddClicked}
    >
      <>
        <AddBrand open={add} handleClose={handleClose} />
        <EditBrand open={edit} handleClose={handleClose} brand={selectedRow} />
        <ViewBrandDetails
          open={view}
          handleClose={handleClose}
          brand={selectedRow}
        />
        <DeleteBrand
          open={confirmDelete}
          handleClose={handleClose}
          brand={selectedRow}
        />
        <DataTable
          data={brands}
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
