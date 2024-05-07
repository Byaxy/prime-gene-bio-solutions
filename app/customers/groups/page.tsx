"use client";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import ViewCustomerGroupDetails from "@/components/customers/customer-groups/ViewCustomerGroupDetails";
import AddCustomerGroup from "@/components/customers/customer-groups/AddCudtomerGroup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomerGroup } from "@/components/Types";
import axios from "axios";
import DeleteCustomerGroup from "@/components/customers/customer-groups/DeleteCustomerGroup";
import EditCustomerGroup from "@/components/customers/customer-groups/EditCustomerGroup";

export default function CustomerGroupsPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [customerGroups, setCustomerGroups] = useState<CustomerGroup[]>([]);
  const [selectedRow, setSelectedRow] = useState<CustomerGroup>(
    {} as CustomerGroup
  );

  const columns = [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) =>
        new Date(row.createdAt).toDateString(),
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Discount Percentage",
      cell: (row: { percentage: number }) => <span>{row.percentage}%</span>,
    },
    {
      name: "Actions",
      cell: (row: CustomerGroup) => [
        <span
          key={"edit" + row.id}
          onClick={() => onEdit(row)}
          className="text-[#475BE8] py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <EditIcon />
        </span>,
        <span
          key={"delete" + row.id}
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

  const onEdit = (row: CustomerGroup) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const onDelete = (row: CustomerGroup) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
    setConfirmDelete(false);
    setEdit(false);
  }, []);

  const onRowClicked = (row: CustomerGroup) => {
    setSelectedRow(row);
    setView(true);
  };

  useEffect(() => {
    const fetchCustomerGroups = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/customer-groups"
        );
        setCustomerGroups(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomerGroups();
  }, [customerGroups]);

  return (
    <ListComponent
      title="Customer Groups"
      buttonText="Add Group"
      buttonAction={onAddClicked}
    >
      <>
        <AddCustomerGroup open={add} handleClose={handleClose} />
        <EditCustomerGroup
          open={edit}
          handleClose={handleClose}
          group={selectedRow}
        />
        <ViewCustomerGroupDetails
          open={view}
          handleClose={handleClose}
          group={selectedRow}
        />
        <DeleteCustomerGroup
          open={confirmDelete}
          handleClose={handleClose}
          group={selectedRow}
        />
        <DataTable
          data={customerGroups}
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
