"use client";
import React, { useCallback, useState } from "react";
import { allProductsData } from "@/data/allProductsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ViewProductDetails from "@/components/products/ViewProductDetails";
import ListPage from "@/components/ListPage";

export default function ProductsPage() {
  const [view, setView] = useState<boolean>(false);
  const [productID, setProductID] = useState<string>("1");

  const handleClose = useCallback((): void => {
    setView(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setProductID(row.id);
    setView(true);
    console.log(productID);
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
          data={allProductsData.data}
          columns={allProductsData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListPage>
  );
}
