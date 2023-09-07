"use client";
import { useCallback, useState } from "react";
import { unitsData } from "@/data/unitsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddUnit from "@/components/products/units/AddUnit";
import ViewUnitDetails from "@/components/products/units/ViewUnitDetails";

export default function ProductsUnitsPage(): JSX.Element {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [unitID, setUnitID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setUnitID(row.id);
    setView(true);
    console.log(unitID);
  };
  return (
    <ListComponent
      title="Product Units"
      buttonText="Add Unit"
      buttonAction={onAddClicked}
    >
      <>
        <AddUnit open={add} handleClose={handleClose} />
        <ViewUnitDetails
          open={view}
          handleClose={handleClose}
          unitID={unitID}
        />
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
