"use client";
import React, { useCallback, useState } from "react";
import { brandsData } from "@/data/brandsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import AddBrand from "@/components/products/brands/AddBrand";
import ListComponent from "@/components/ListComponent";
import ViewBrandDetails from "@/components/products/brands/ViewBrandDetails";
import Image from "next/image";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  {
    name: "Date",
    selector: (row: { createdAt: Date }) => row.createdAt.toDateString(),
  },
  {
    name: "Image",
    selector: (row: { image: string }) => row.image,
    width: "120px",
    cell: (row: { image: string }) => (
      <Image
        className="rounded-full"
        src={row.image}
        alt="Product Image"
        height={60}
        width={60}
      />
    ),
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px",
    },
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
    cell: (row: { id: string }) => [
      <Link
        href={`/settings/products-brands/edit-brand/${row.id}`}
        key={row.id}
      >
        <EditIcon sx={{ color: "#475BE8" }} />
      </Link>,
      <Link key={row.id} href="/settings/products-brands">
        <DeleteIcon color="error" />
      </Link>,
    ],
    width: "120px",
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "5px",
    },
  },
];

export default function ProductBrandsPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [brandID, setBrandID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setBrandID(row.id);
    setView(true);
  };
  return (
    <ListComponent
      title="Product Brands"
      buttonText="Add Brand"
      buttonAction={onAddClicked}
    >
      <>
        <AddBrand open={add} handleClose={handleClose} />
        <ViewBrandDetails
          open={view}
          handleClose={handleClose}
          brandID={brandID}
        />
        <DataTable
          data={brandsData}
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
