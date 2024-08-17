"use client";

import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddUser from "@/components/users/AddUser";
import ViewUserDetails from "@/components/users/ViewUserDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useUsers from "@/utils/hooks/useUsers";
import Loading from "@/app/Loading";
import { User } from "@/components/Types";
import EditUser from "@/components/users/EditUser";
import DeleteUser from "@/components/users/DeleteUser";

export default function UsersPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<User>({} as User);

  const { data: users, error, isLoading } = useUsers();

  const columns = [
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Role",
      selector: (row: { role: string }) => row.role.toUpperCase(),
    },
    {
      name: "Email",
      selector: (row: { email: string }) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row: { phone: string }) => row.phone || "N/A",
    },
    {
      name: "Actions",
      cell: (row: User) => [
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

  const onEdit = (row: User) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const onDelete = (row: User) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
  }, []);

  const onRowClicked = (row: User) => {
    setSelectedRow(row);
    setView(true);
  };
  if (error) {
    return (
      <div className="flex justify-center text-primaryDark font-semibold text-lg py-5">
        {error.message}
      </div>
    );
  }

  return (
    <ListComponent
      title="All Users"
      buttonText="Add User"
      buttonAction={onAddClicked}
    >
      <>
        <AddUser open={add} handleClose={handleClose} />
        <EditUser open={edit} handleClose={handleClose} user={selectedRow} />
        <ViewUserDetails
          open={view}
          handleClose={handleClose}
          user={selectedRow}
        />
        <DeleteUser
          open={confirmDelete}
          handleClose={handleClose}
          user={selectedRow}
        />
        {isLoading && <Loading />}
        {!isLoading && (
          <DataTable
            data={users?.success || []}
            columns={columns}
            customStyles={customTableStyles}
            onRowClicked={onRowClicked}
            className="scrollbar-hide"
            pagination
          />
        )}
      </>
    </ListComponent>
  );
}
