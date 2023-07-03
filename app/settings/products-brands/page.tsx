"use client";
import React from "react";
import { brandsData } from "@/data/brandsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";

export default function ProductBrandsPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    router.push(`/settings/products-brands/${row.id}`);
  };
  return (
    <ListPage
      title="Products Brands"
      buttonText="Add Brand"
      buttonPath="/settings/products-brands/add-brand"
    >
      <DataTable
        data={brandsData.data}
        columns={brandsData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
        pagination
      />
    </ListPage>
  );
}
