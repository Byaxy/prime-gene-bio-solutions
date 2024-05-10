"use client";
import React, { useCallback, useState } from "react";
import { usersData } from "@/data/usersData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddUser from "@/components/users/AddUser";
import ViewUserDetails from "@/components/users/ViewUserDetails";
import Image from "next/image";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UsersPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>("1");

  const columns = [
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Role",
      selector: (row: { role: string }) => row.role,
    },
    {
      name: "Email",
      selector: (row: { email: string }) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row: { phone: string }) => row.phone,
    },
    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link href={`/people/users/edit-user/${row.id}`} key={row.id}>
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/people/users">
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

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setUserID(row.id);
    setView(true);
  };
  return (
    <ListComponent
      title="All Users"
      buttonText="Add User"
      buttonAction={onAddClicked}
    >
      <>
        <AddUser open={add} handleClose={handleClose} />
        <ViewUserDetails
          open={view}
          handleClose={handleClose}
          userID={userID}
        />
        <DataTable
          data={usersData}
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
