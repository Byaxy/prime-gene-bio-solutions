"use client";
import React, { useCallback, useState } from "react";
import { typesData } from "@/data/typesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import AddType from "@/components/products/types/AddType";
import ListComponent from "@/components/ListComponent";
import ViewTypeDetails from "@/components/products/types/ViewTypeDetails";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  {
    name: "Date",
    selector: (row: { createdAt: Date }) => row.createdAt.toDateString(),
    width: "180px",
  },
  {
    name: "Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Description",
    selector: (row: { description: string }) => row.description,
  },

  {
    name: "Actions",
    cell: (row: { id: string }) => [
      <Link href={`/settings/products-types/edit-type/${row.id}`} key={row.id}>
        <EditIcon sx={{ color: "#475BE8" }} />
      </Link>,
      <Link key={row.id} href="/settings/products-types">
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

export default function ProductTypesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [typeID, setTypeID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
  }, []);
  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    setTypeID(row.id);
    setView(true);
  };
  return (
    <ListComponent
      title="Product Types"
      buttonText="Add Type"
      buttonAction={onAddClicked}
    >
      <>
        <AddType open={add} handleClose={handleClose} />
        <ViewTypeDetails
          open={view}
          handleClose={handleClose}
          typeID={typeID}
        />
        <DataTable
          data={typesData}
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
