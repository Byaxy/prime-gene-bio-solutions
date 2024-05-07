"use client";

import React, { useCallback, useState } from "react";
import { returnsData } from "@/data/returnsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListComponent from "@/components/ListComponent";
import AddReturn from "@/components/sales/returns/AddReturn";

export default function PurchasesReturnsPage() {
  const [add, setAdd] = useState<boolean>(false);

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
  }, []);

  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/sales/${row.id}`);
  };
  return (
    <ListComponent
      title="Purchases Returns"
      buttonText="Add Return"
      buttonAction={onAddClicked}
    >
      <>
        <AddReturn open={add} handleClose={handleClose} />
        <DataTable
          data={returnsData.data}
          columns={returnsData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
