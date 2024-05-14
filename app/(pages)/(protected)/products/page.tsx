"use client";

import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { customTableStyles } from "@/styles/TableStyles";
import ViewProductDetails from "@/components/products/ViewProductDetails";
import ListPage from "@/components/ListPage";
import { CldImage } from "next-cloudinary";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Inventory } from "@/components/Types";
import type { Product } from "@/components/Types";
import DeleteProduct from "@/components/products/DeleteProduct";
import Link from "next/link";
import { DB, query } from "@/appwrite/appwriteConfig";
import { config } from "@/config/config";

export default function ProductsPage() {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedRow, setSelectedRow] = useState<Product>({} as Product);

  const columns = [
    {
      name: "Image",
      selector: (row: { image: string }) => row.image,
      width: "80px",
      cell: (row: { image: string }) => (
        <CldImage
          className="rounded-lg w-auto h-auto"
          src={row.image}
          alt="Product Image"
          height={40}
          width={90}
        />
      ),
      style: {
        paddingTop: "8px",
        paddingBottom: "8px",
      },
    },
    {
      name: "Code",
      selector: (row: { code: string }) => row.code,
      width: "120px",
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Brand",
      width: "120px",
      selector: (row: { brand: string }) => row.brand,
    },
    {
      name: "Category",
      selector: (row: { category: string }) =>
        row.category ? row.category : "Null",
    },
    {
      name: "Qnty",
      width: "90px",
      cell: (row: { inventory: Inventory[]; unit: string }) => (
        <div>
          {row.inventory.length === 0 ? (
            "Null"
          ) : (
            <span>
              {row.inventory.reduce((qty, obj) => qty + obj.quantity, 0)}{" "}
              {row.unit}
            </span>
          )}
        </div>
      ),
    },
    {
      name: "Cost",
      cell: (row: { inventory: Inventory[] }) => (
        <div>
          {row.inventory.length === 0 ? (
            "Null"
          ) : (
            <span>
              $
              {row.inventory.reduce((total, obj) => total + obj.cost, 0) /
                row.inventory.length}
            </span>
          )}
        </div>
      ),
      width: "90px",
    },
    {
      name: "Price",
      cell: (row: { inventory: Inventory[] }) => (
        <div>
          {row.inventory.length === 0 ? (
            "Null"
          ) : (
            <span>
              $
              {row.inventory.reduce((total, obj) => total + obj.price, 0) /
                row.inventory.length}
            </span>
          )}
        </div>
      ),
      width: "90px",
    },
    {
      name: "Actions",
      cell: (row: Product) => [
        <Link
          href={`/products/edit-product/${row.id}`}
          key={"edit" + row.id}
          className="text-[#475BE8] py-1 px-2 hover:bg-white hover:rounded-md transition"
        >
          <EditIcon />
        </Link>,
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

  const onDelete = (row: Product) => {
    setSelectedRow(row);
    setConfirmDelete(true);
  };

  const handleClose = useCallback((): void => {
    setView(false);
    setConfirmDelete(false);
  }, []);

  const onRowClicked = (row: Product) => {
    setSelectedRow(row);
    setView(true);
  };

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { documents } = await DB.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteProductsCollectionId,
          query
        );
        const products = documents.map((doc: any) => ({
          id: doc.$id,
          name: doc.name,
          code: doc.code,
          image: doc.image,
          brand: doc.brand ? doc.brand.name : null,
          type: doc.type ? doc.type.name : null,
          unit: doc.unit ? doc.unit.code : null,
          category: doc.category ? doc.category.name : null,
          inventory: doc.inventory,
          description: doc.description,
          alertQuantity: doc.alertQuantity,
          createdAt: doc.$createdAt,
          updatedAt: doc.$updatedAt,
        }));

        setProducts(products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [products]);

  return (
    <ListPage
      title="All Products"
      buttonText="Add Product"
      buttonPath="/products/add-product"
    >
      <>
        <ViewProductDetails
          open={view}
          handleClose={handleClose}
          product={selectedRow}
        />
        <DeleteProduct
          open={confirmDelete}
          handleClose={handleClose}
          product={selectedRow}
        />
        <DataTable
          data={products}
          columns={columns}
          customStyles={customTableStyles}
          onRowClicked={onRowClicked}
          className="scrollbar-hide"
          pagination
        />
      </>
    </ListPage>
  );
}
