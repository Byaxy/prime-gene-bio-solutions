"use client";
import React, { useCallback, useState } from "react";
import { brandsData } from "@/data/brandsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import AddBrand from "@/components/products/brands/AddBrand";
import ListComponent from "@/components/ListComponent";
import ViewBrandDetails from "@/components/products/brands/ViewBrandDetails";

export default function ProductBrandsPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [brandID, setBrandID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setBrandID(row.id);
    setView(true);
    console.log(brandID);
  };
  return (
    <ListComponent
      title="Product Brands"
      buttonText="Add Brand"
      buttonAction={onAddClicked}
    >
      <>
        <AddBrand open={add} handleClose={handleClose} />
        <ViewBrandDetails
          open={view}
          handleClose={handleClose}
          brandID={brandID}
        />
        <DataTable
          data={brandsData.data}
          columns={brandsData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
