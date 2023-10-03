"use client";
import React, { useCallback, useState } from "react";
import { allSalesData } from "@/data/allSalesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListPage from "@/components/ListPage";
import ViewSaleDetails from "@/components/sales/invoice/ViewSaleDetails";

export default function SalesPage() {
  const [view, setView] = useState<boolean>(false);
  const [saleID, setSaleID] = useState<string>("1");

  const handleClose = useCallback((): void => {
    setView(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setSaleID(row.id);
    setView(true);
  };
  return (
    <ListPage
      title="All Sales"
      buttonText="Add Sale"
      buttonPath="/sales/add-sale"
    >
      <>
        <ViewSaleDetails
          open={view}
          handleClose={handleClose}
          saleID={saleID}
        />
        <DataTable
          data={allSalesData.data}
          columns={allSalesData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListPage>
  );
}
