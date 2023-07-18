"use client";
import React, { useCallback, useState } from "react";
import { allproductsData } from "@/data/allProductsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListComponent from "@/components/ListComponent";

export default function ProductsPage() {
  const [add, setAdd] = useState<boolean>(false);

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
  }, []);

  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    router.push(`/products/${row.id}`);
  };
  return (
    <ListComponent
      title="Products"
      buttonText="Add Product"
      buttonAction={onAddClicked}
    >
      <>
        {/** TO DO: Add AddProduct component */}
        <DataTable
          data={allproductsData.data}
          columns={allproductsData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
