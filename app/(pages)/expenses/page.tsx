"use client";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import { useCallback, useState } from "react";
import AddExpense from "@/components/expenses/AddExpense";
import ViewExpenseDetails from "@/components/expenses/ViewExpenseDetails";
import useExpenses from "@/utils/hooks/useExpenses";
import Loading from "@/app/Loading";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Expense } from "@/components/Types";
import EditExpense from "@/components/expenses/EditExpense";
import DeleteExpense from "@/components/expenses/DeleteExpense";

export default function ExpensesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Expense>({} as Expense);
  const [expenseID, setExpenseID] = useState<string>("");

  // Fetch expenses
  const { data: expenses, error, isLoading } = useExpenses();

  // Table Columns
  const columns = [
    {
      name: "Date",
      selector: (row: { date: Date }) => new Date(row.date).toDateString(),
      width: "180px",
    },
    {
      name: "Reciept No.",
      selector: (row: { reference: string }) => row.reference,
      width: "160px",
    },
    {
      name: "Expense Title",
      selector: (row: { title: string }) => row.title,
    },
    {
      name: "Description",
      selector: (row: { description: string }) => row.description,
    },
    {
      name: "Amount",
      cell: (row: { amount: number }) => <span>${row.amount}</span>,
      width: "120px",
    },
    {
      name: "Actions",
      cell: (row: Expense) => [
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
  const onDelete = (row: Expense) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const onEdit = (row: Expense) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const handleClose = useCallback((): void => {
    setAdd(false);
    setEdit(false);
    setView(false);
    setConfirmDelete(false);
  }, []);

  const onRowClicked = (row: Expense) => {
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
      title="All Expenses"
      buttonText="Add Expense"
      buttonAction={onAddClicked}
    >
      <>
        <AddExpense open={add} handleClose={handleClose} />
        <ViewExpenseDetails
          open={view}
          handleClose={handleClose}
          expense={selectedRow}
        />
        <EditExpense
          open={edit}
          handleClose={handleClose}
          expense={selectedRow}
        />
        <DeleteExpense
          open={confirmDelete}
          handleClose={handleClose}
          expense={selectedRow}
        />
        {isLoading && <Loading />}
        {!isLoading && (
          <DataTable
            data={expenses?.success || []}
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
