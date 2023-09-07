"use client";
import React, { useCallback, useState } from "react";
import { expenseCategoriesData } from "@/data/expenseCategoriesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddExpenseCategory from "@/components/expenses/expense-categories/AddExpenseCategory";
import ViewExpenseCategory from "@/components/expenses/expense-categories/ViewExpenseCategory";

export default function ExpenseCategoriesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [expenseID, setExpenseID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setView(false);
    setAdd(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setExpenseID(row.id);
    setView(true);
    console.log(expenseID);
  };
  return (
    <ListComponent
      title="Expense Categories"
      buttonText="Add Category"
      buttonAction={onAddClicked}
    >
      <>
        <AddExpenseCategory open={add} handleClose={handleClose} />
        <ViewExpenseCategory
          open={view}
          handleClose={handleClose}
          expenseCategoryID={expenseID}
        />
        <DataTable
          data={expenseCategoriesData.data}
          columns={expenseCategoriesData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
