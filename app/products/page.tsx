"use client";
import React, { useCallback, useState } from "react";
import { allProductsData } from "@/data/allProductsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ViewProductDetails from "@/components/products/ViewProductDetails";
import ListComponent from "@/components/ListComponent";
import AddProduct from "@/components/products/AddProduct";

export default function ProductsPage() {
  const [view, setView] = useState<boolean>(false);
  const [productID, setProductID] = useState<string>("1");
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
    setProductID(row.id);
    setView(true);
    console.log(productID);
  };
  return (
    <ListComponent
      title="Products"
      buttonText="Add Product"
      buttonAction={onAddClicked}
    >
      <>
        <AddProduct open={add} handleClose={handleClose} />
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
    </ListComponent>
  );
}
