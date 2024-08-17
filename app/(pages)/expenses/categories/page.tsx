"use client";
import React, { useCallback, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddExpenseCategory from "@/components/expenses/expense-categories/AddExpenseCategory";
import ViewExpenseCategory from "@/components/expenses/expense-categories/ViewExpenseCategory";
import useExpenseCategories from "@/utils/hooks/useExpenseCategories";
import Loading from "@/app/Loading";
import type { ExpenseCategory } from "@/components/Types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteExpenseCategory from "@/components/expenses/expense-categories/DeleteExpenseCategory";
import EditExpenseCategory from "@/components/expenses/expense-categories/EditExpenseCategory";

export default function ExpenseCategoriesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<ExpenseCategory>(
    {} as ExpenseCategory
  );

  // Fetch expense categories
  const { data: expenseCategories, error, isLoading } = useExpenseCategories();

  // Table Columns
  const columns = [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) =>
        new Date(row.createdAt).toDateString(),
      width: "180px",
    },
    {
      name: "Code",
      selector: (row: { code: string }) => row.code,
      width: "180px",
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Description",
      selector: (row: { description: string }) => row.description,
    },
    {
      name: "Actions",
      cell: (row: ExpenseCategory) => [
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
  const onDelete = (row: ExpenseCategory) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const onEdit = (row: ExpenseCategory) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const handleClose = useCallback((): void => {
    setAdd(false);
    setEdit(false);
    setView(false);
    setConfirmDelete(false);
  }, []);

  const onRowClicked = (row: ExpenseCategory) => {
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
      title="Expense Categories"
      buttonText="Add Category"
      buttonAction={onAddClicked}
    >
      <>
        <AddExpenseCategory open={add} handleClose={handleClose} />
        <ViewExpenseCategory
          open={view}
          handleClose={handleClose}
          expenseCategory={selectedRow}
        />
        <EditExpenseCategory
          open={edit}
          handleClose={handleClose}
          expenseCategory={selectedRow}
        />
        <DeleteExpenseCategory
          open={confirmDelete}
          handleClose={handleClose}
          expenseCategory={selectedRow}
        />
        {isLoading && <Loading />}
        {!isLoading && (
          <DataTable
            data={expenseCategories?.success || []}
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
