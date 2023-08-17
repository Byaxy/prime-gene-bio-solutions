"use client";
import { allExpensesData } from "@/data/allExpensesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListComponent from "@/components/ListComponent";
import { useCallback, useState } from "react";
import AddExpense from "@/components/expenses/AddExpense";

export default function ExpensesPage() {
  const [add, setAdd] = useState<boolean>(false);

  const onAddClicked = useCallback((): void => {
    setAdd(true);
  }, []);

  const handleClose = useCallback((): void => {
    setAdd(false);
  }, []);

  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/expenses/${row.id}`);
  };
  return (
    <ListComponent
      title="Expenses"
      buttonText="Add Expense"
      buttonAction={onAddClicked}
    >
      <>
        <AddExpense open={add} handleClose={handleClose} />
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
