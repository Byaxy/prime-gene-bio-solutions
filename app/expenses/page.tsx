"use client";
import { allExpensesData } from "@/data/allExpensesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import { useCallback, useState } from "react";
import AddExpense from "@/components/expenses/AddExpense";
import ViewExpenseDetails from "@/components/expenses/ViewExpenseDetails";

export default function ExpensesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [expenseID, setExpenseID] = useState<string>("1");

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
  }, []);

  const onRowClicked = (row: { id: string }) => {
    setExpenseID(row.id);
    setView(true);
    console.log(expenseID);
  };
  return (
    <ListComponent
      title="All Expenses"
      buttonText="Add Expense"
      buttonAction={onAddClicked}
    >
      <>
        <AddExpense open={add} handleClose={handleClose} />
        <ViewExpenseDetails
          open={view}
          handleClose={handleClose}
          expenseID={expenseID}
        />
        <DataTable
          data={allExpensesData.data}
          columns={allExpensesData.columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListComponent>
  );
}
