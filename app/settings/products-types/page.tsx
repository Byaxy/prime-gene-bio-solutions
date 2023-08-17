"use client";
import React, { useCallback, useState } from "react";
import { typesData } from "@/data/typesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import AddType from "@/components/settings/types/AddType";
import ListComponent from "@/components/ListComponent";
import ViewTypeDetails from "@/components/settings/types/ViewTypeDetails";

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
    console.log(typeID);
  };
  return (
    <ListComponent
      title="Products Types"
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
          data={typesData.data}
          columns={typesData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
