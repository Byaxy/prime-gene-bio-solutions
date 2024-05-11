"use client";
import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddUnit from "@/components/products/units/AddUnit";
import ViewUnitDetails from "@/components/products/units/ViewUnitDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Unit } from "@/components/Types";
import DeleteUnit from "@/components/products/units/DeleteUnit";
import EditUnit from "@/components/products/units/EditUnit";
import { DB, Query } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";
import Loading from "@/app/(pages)/Loading";

export default function ProductsUnitsPage(): JSX.Element {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedRow, setSelectedRow] = useState<Unit>({} as Unit);
  const [loading, setLoading] = useState<boolean>(true);

  const columns = [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) =>
        new Date(row.createdAt).toDateString(),
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
      cell: (row: Unit) => [
        <span
          key={"edit" + row.id}
          onClick={() => onEdit(row)}
          className="text-[#475BE8] py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <EditIcon />
        </span>,
        <span
          key={"delete" + row}
          onClick={() => onDelete(row)}
          className="text-redColor py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <DeleteIcon />
        </span>,
      ],
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "center",
      },
    },
  ];

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const onEdit = (row: Unit) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const onDelete = (row: Unit) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
  }, []);

  const onRowClicked = (row: Unit) => {
    setSelectedRow(row);
    setView(true);
  };

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setLoading(true);
        const { documents } = await DB.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteProductUnitsCollectionId,
          [Query.orderDesc("$createdAt"), Query.limit(1000)]
        );
        const units = documents.map((doc: any) => ({
          id: doc.$id,
          name: doc.name,
          code: doc.code,
          createdAt: doc.$createdAt,
          updatedAt: doc.$updatedAt,
        }));
        setUnits(units);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnits();
  }, [units]);

  return (
    <ListComponent
      title="Product Units"
      buttonText="Add Unit"
      buttonAction={onAddClicked}
    >
      <>
        <AddUnit open={add} handleClose={handleClose} />
        <EditUnit open={edit} handleClose={handleClose} unit={selectedRow} />
        <ViewUnitDetails
          open={view}
          handleClose={handleClose}
          unit={selectedRow}
        />
        <DeleteUnit
          open={confirmDelete}
          handleClose={handleClose}
          unit={selectedRow}
        />
        <DataTable
          data={units}
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
