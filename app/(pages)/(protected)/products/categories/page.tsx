"use client";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ListComponent from "@/components/ListComponent";
import AddCategory from "@/components/products/categories/AddCategory";
import ViewCategoryDetails from "@/components/products/categories/ViewCategoryDetails";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DB, Query } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";
import type { ProductCategory } from "@/components/Types";
import DeleteCategory from "@/components/products/categories/DeleteCategory";
import EditCategory from "@/components/products/categories/EditCategory";

export default function ProductCategoriesPage() {
  const [add, setAdd] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [selectedRow, setSelectedRow] = useState<ProductCategory>(
    {} as ProductCategory
  );

  // table columns
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
      name: "Parent Category",
      cell: (row: { parentCategory: string }) => (
        <span>{row.parentCategory ? row.parentCategory : "Null"}</span>
      ),
    },
    {
      name: "Actions",
      cell: (row: ProductCategory) => [
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

  const onEdit = (row: ProductCategory) => {
    setSelectedRow(row);
    setEdit(true);
  };

  const onDelete = (row: ProductCategory) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const handleClose = useCallback((): void => {
    setAdd(false);
    setView(false);
    setEdit(false);
    setConfirmDelete(false);
  }, []);
  const onRowClicked = (row: ProductCategory) => {
    setSelectedRow(row);
    setView(true);
  };

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { documents } = await DB.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteProductCategoriesCollectionId,
          [Query.orderDesc("$createdAt"), Query.limit(1000)]
        );

        const categories = documents.map((doc: any) => ({
          id: doc.$id,
          name: doc.name,
          code: doc.code,
          parentCategory: doc.parentCategory,
          description: doc.description,
          createdAt: doc.$createdAt,
          updatedAt: doc.$updatedAt,
        }));

        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [categories]);

  return (
    <ListComponent
      title="Product Categories"
      buttonText="Add Category"
      buttonAction={onAddClicked}
    >
      <>
        <AddCategory open={add} handleClose={handleClose} />
        <EditCategory
          open={edit}
          handleClose={handleClose}
          category={selectedRow}
        />
        <ViewCategoryDetails
          open={view}
          handleClose={handleClose}
          category={selectedRow}
        />
        <DeleteCategory
          open={confirmDelete}
          handleClose={handleClose}
          category={selectedRow}
        />
        <DataTable
          data={categories}
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
