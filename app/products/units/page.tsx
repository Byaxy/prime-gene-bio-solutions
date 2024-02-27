"use client";
import { useCallback, useState } from "react";
import { unitsData } from "@/data/unitsData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddUnit from "@/components/products/units/AddUnit";
import ViewUnitDetails from "@/components/products/units/ViewUnitDetails";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns = [
  {
    name: "Date",
    selector: (row: { createdAt: Date }) => row.createdAt.toDateString(),
    width: "180px",
  },
  {
    name: "Code",
    selector: (row: { code: string }) => row.code,
  },
  {
    name: "Name",
    selector: (row: { name: string }) => row.name,
  },
  {
    name: "Actions",
    cell: (row: { id: string }) => [
      <Link href={`/settings/products-units/edit-unit/${row.id}`} key={row.id}>
        <EditIcon sx={{ color: "#475BE8" }} />
      </Link>,
      <Link key={row.id} href="/settings/products-units">
        <DeleteIcon color="error" />
      </Link>,
    ],
    width: "120px",
    style: {
      display: "flex",
      justifyContent: "center",
      gap: "5px",
    },
  },
];

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
          data={unitsData}
          columns={columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
