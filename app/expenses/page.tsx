"use client";
import { allExpensesData } from "@/data/allExpensesData";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import { useRouter } from "next/navigation";
import ListPage from "@/components/ListPage";

export default function ExpensesPage() {
  const router = useRouter();
  const onRowClicked = (row: { id: number }) => {
    router.push(`/expenses/${row.id}`);
  };
  return (
    <ListPage
      title="Expenses"
      buttonText="Add Expense"
      buttonPath="/expenses/add-expense"
    >
      <DataTable
        data={allExpensesData.data}
        columns={allExpensesData.columns}
        customStyles={customTableStyles}
        onRowClicked={onRowClicked}
        className="scrollbar-hide"
        pagination
      />
    </ListPage>
  );
}
