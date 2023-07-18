"use client";
import { useCallback, useState } from "react";
import { unitsData } from "@/data/unitsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddUnit from "@/components/settings/units/AddUnit";
import { useRouter } from "next/navigation";

export default function ProductsUnitsPage(): JSX.Element {
  const [add, setAdd] = useState<boolean>(false);
  const router = useRouter();

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    router.push(`/settings/products-units/${row.id}`);
  };
  return (
    <ListComponent
      title="Products Units"
      buttonText="Add Unit"
      buttonAction={onAddClicked}
    >
      <>
        <AddUnit open={add} handleClose={handleClose} />
        <DataTable
          data={unitsData.data}
          columns={unitsData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
