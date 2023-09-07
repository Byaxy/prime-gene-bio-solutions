import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ProductSubCategory } from "@/components/Types";

export type HeaderCells = {
  name: string;
  selector?: (row: ProductSubCategory) => any;
  cell?: any;
  width?: string;
  style?: {
    color?: string;
    fontWeight?: string;
    fontSize?: string;
    display?: string;
    justifyContent?: string;
    gap?: string;
    alignItems?: string;
  };
  conditionalCellStyles?: {
    when: (row: ProductSubCategory) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};

export type DataType = {
  columns: HeaderCells[];
  data: ProductSubCategory[];
};

export const subcategoriesData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) => row.createdAt.toDateString(),
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
      name: "Parent Category",
      selector: (row: { parentCategory: string }) => row.parentCategory,
    },
    {
      name: "Description",
      selector: (row: { description: string }) => row.description,
    },
    {
      name: "Subcategories",
      cell: (row: { subCategories: ProductSubCategory[] }) => (
        <ul className="list-none">
          {row.subCategories &&
            row.subCategories.map((subcategory) => (
              <li key={subcategory.name}>{subcategory.name}</li>
            ))}
        </ul>
      ),
    },
    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link
          href={`/settings/products-categories/edit-category/${row.id}`}
          key={row.id}
        >
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/settings/products-categories">
          <DeleteIcon color="error" />
        </Link>,
      ],
      width: "120px",
      style: {
        display: "flex",
        justifyContent: "center",
        gap: "5px",
      },
    },
  ],
  data: [
    {
      id: "01",
      createdAt: new Date(),
      code: "01",
      name: "Clinical Chemistry",
      description: "Clinical Chemistry products",
      image: "",
      parentCategory: "Clinical Laboratory Solutions",
      isActive: true,
      updatedAt: new Date(),
      subCategories: [
        {
          id: "011",
          createdAt: new Date(),
          code: "01",
          name: "Clinical Chemistry",
          description: "Clinical chemistry solutions products",
          parentCategory: "",
          image: "",
          updatedAt: new Date(),
          isActive: true,
        },
        {
          id: "012",
          createdAt: new Date(),
          code: "02",
          name: "Haematology",
          description: "Medical solutions products",
          parentCategory: "",
          image: "",
          updatedAt: new Date(),
          isActive: true,
        },
      ],
    },
    {
      id: "02",
      createdAt: new Date(),
      code: "02",
      name: "Haematology",
      description: "Medical solutions products",
      image: "",
      parentCategory: "Clinical Laboratory Solutions",
      isActive: true,
      updatedAt: new Date(),
    },
    {
      id: "03",
      createdAt: new Date(),
      code: "03",
      name: "Molecular Biology",
      description: "Imaging solutions products",
      image: "",
      parentCategory: "Clinical Laboratory Solutions",
      isActive: true,
      updatedAt: new Date(),
      subCategories: [
        {
          id: "013",
          createdAt: new Date(),
          code: "03",
          name: "Molecular Biology",
          description: "Imaging solutions products",
          parentCategory: "",
          image: "",
          updatedAt: new Date(),
          isActive: true,
        },
      ],
    },
    {
      id: "04",
      createdAt: new Date(),
      code: "04",
      name: "Critical care",
      description: "Clinical chemistry solutions products",
      image: "",
      parentCategory: "Medical Solutions",
      isActive: true,
      updatedAt: new Date(),
    },
  ],
};
