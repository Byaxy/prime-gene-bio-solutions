"use client";
import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListComponent from "@/components/ListComponent";
import ViewCustomerGroupDetails from "@/components/customers/customer-groups/ViewCustomerGroupDetails";
import AddCustomerGroup from "@/components/customers/customer-groups/AddCudtomerGroup";
import { customerGroupsData } from "@/data/customerGroupsData";

export default function CustomerGroupsPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [groupID, setGroupID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
  }, []);

  const router = useRouter();
  const onRowClicked = (row: { id: string }) => {
    setGroupID(row.id);
    setView(true);
    console.log(groupID);
  };
  return (
    <ListComponent
      title="Customer Groups"
      buttonText="Add Group"
      buttonAction={onAddClicked}
    >
      <>
        <AddCustomerGroup open={add} handleClose={handleClose} />
        <ViewCustomerGroupDetails
          open={view}
          handleClose={handleClose}
          groupID={groupID}
        />
        <DataTable
          data={customerGroupsData.data}
          columns={customerGroupsData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
