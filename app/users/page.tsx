"use client";
import React, { useCallback, useState } from "react";
import { usersData } from "@/data/usersData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListComponent from "@/components/ListComponent";
import AddUser from "@/components/users/AddUser";
import ViewUserDetails from "@/components/users/ViewUserDetails";

export default function UsersPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
  }, []);

  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    setUserID(row.id);
    setView(true);
    console.log(userID);
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
          data={usersData.data}
          columns={usersData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
