"use client";
import React, { useCallback, useState } from "react";
import { customersData } from "@/data/customersData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddSupplier from "@/components/people/suppliers/AddSupplier";
import ViewSupplierDetails from "@/components/people/suppliers/ViewSupplierDetails";
import { suppliersData } from "@/data/suppliersData";

export default function SuppliersPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [supplierID, setSupplierID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setSupplierID(row.id);
    setView(true);
    console.log(supplierID);
  };
  return (
    <ListComponent
      title="Suppliers"
      buttonText="Add Supplier"
      buttonAction={onAddClicked}
    >
      <>
        <AddSupplier open={add} handleClose={handleClose} />
        <ViewSupplierDetails
          open={view}
          handleClose={handleClose}
          supplierID={supplierID}
        />
        <DataTable
          data={suppliersData.data}
          columns={suppliersData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
