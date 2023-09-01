"use client";
import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListComponent from "@/components/ListComponent";
import ViewProductStockDetails from "@/components/products/products-stock/ViewProductStockDetails";
import { productsStockData, columns } from "@/data/productsStockData";
import AdjustProductStock from "@/components/products/products-stock/AdjustProductStock";

export default function ProductsStockPage() {
  const [view, setView] = useState<boolean>(false);
  const [stockID, setStockID] = useState<string>("1");
  const [add, setAdd] = useState<boolean>(false);

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
  }, []);

  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    setStockID(row.id);
    setView(true);
    console.log(stockID);
  };
  return (
    <ListComponent
      title="Products Stock"
      buttonText="Adjust Stock"
      buttonAction={onAddClicked}
    >
      <>
        <AdjustProductStock open={add} handleClose={handleClose} />
        <ViewProductStockDetails
          open={view}
          handleClose={handleClose}
          stockID={stockID}
        />
        <DataTable
          data={productsStockData}
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
