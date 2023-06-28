"use client";
import React from "react";
import { allproductsData } from "@/data/allProductsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";

export default function ProductsPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/products/${row.id}`);
  };
  return (
    <ListPage
      title="Products"
      buttonText="Add Product"
      buttonPath="/products/add-product"
    >
      <DataTable
        data={allproductsData.data}
        columns={allproductsData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
        pagination
      />
    </ListPage>
  );
}
