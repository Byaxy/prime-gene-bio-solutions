"use client";
import React, { useCallback, useState } from "react";
import { brandsData } from "@/data/brandsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import AddBrand from "@/components/settings/brands/AddBrand";
import ListComponent from "@/components/ListComponent";

export default function ProductBrandsPage() {
  const [add, setAdd] = useState<boolean>(false);

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
  }, []);

  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    router.push(`/settings/products-brands/${row.id}`);
  };
  return (
    <ListComponent
      title="Products Brands"
      buttonText="Add Brand"
      buttonAction={onAddClicked}
    >
      <>
        <AddBrand open={add} handleClose={handleClose} />
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
