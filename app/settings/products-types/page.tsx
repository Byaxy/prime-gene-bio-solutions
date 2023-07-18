"use client";
import React, { useCallback, useState } from "react";
import { typesData } from "@/data/typesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import AddType from "@/components/settings/types/AddType";
import ListComponent from "@/components/ListComponent";

export default function ProductTypesPage() {
  const [add, setAdd] = useState<boolean>(false);

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
  }, []);
  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    router.push(`/settings/products-types/${row.id}`);
  };
  return (
    <ListComponent
      title="Products Types"
      buttonText="Add Type"
      buttonAction={onAddClicked}
    >
      <>
        <AddType open={add} handleClose={handleClose} />
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
