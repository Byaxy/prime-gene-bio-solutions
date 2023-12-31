import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ProductCategory, ProductSubCategory } from "@/components/Types";

export type HeaderCells = {
  name: string;
  selector?: (row: ProductCategory) => any;
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
    when: (row: ProductCategory) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};

export type DataType = {
  columns: HeaderCells[];
  data: ProductCategory[];
};

export const categoriesData: DataType = {
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
      name: "Clinical Laboratory Solutions",
      description: "Clinical laboratory solutions products",
      image: "",
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
      id: "02",
      createdAt: new Date(),
      code: "02",
      name: "Medical Solutions",
      description: "Medical solutions products",
      image: "",
      isActive: true,
      updatedAt: new Date(),
      subCategories: [
        {
          id: "021",
          createdAt: new Date(),
          code: "01",
          name: "Critical care",
          description: "Clinical chemistry solutions products",
          parentCategory: "",
          image: "",
          updatedAt: new Date(),
          isActive: true,
        },
        {
          id: "022",
          createdAt: new Date(),
          code: "02",
          name: "Primary care",
          description: "Medical solutions products",
          parentCategory: "",
          image: "",
          updatedAt: new Date(),
          isActive: true,
        },
        {
          id: "023",
          createdAt: new Date(),
          code: "03",
          name: "Surgical care",
          description: "Imaging solutions products",
          parentCategory: "",
          image: "",
          updatedAt: new Date(),
          isActive: true,
        },
        {
          id: "024",
          createdAt: new Date(),
          code: "04",
          name: "Specialist care",
          description: "Imaging solutions products",
          parentCategory: "",
          image: "",
          updatedAt: new Date(),
          isActive: true,
        },
      ],
    },
    {
      id: "03",
      createdAt: new Date(),
      code: "03",
      name: "Imaging Solutions",
      description: "Imaging solutions products",
      image: "",
      isActive: true,
      updatedAt: new Date(),
      subCategories: [
        {
          id: "031",
          createdAt: new Date(),
          code: "01",
          name: "Radiology",
          description: "Clinical chemistry solutions products",
          parentCategory: "",
          image: "",
          updatedAt: new Date(),
          isActive: true,
        },
        {
          id: "032",
          createdAt: new Date(),
          code: "02",
          name: "Ultrasonography",
          description: "Medical solutions products",
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
      name: "Dental Solutions",
      description: "Dental solutions products",
      image: "",
      isActive: true,
      updatedAt: new Date(),
      subCategories: [
        {
          id: "041",
          createdAt: new Date(),
          code: "01",
          name: "Dental Laboratory",
          description: "Clinical chemistry solutions products",
          parentCategory: "",
          image: "",
          updatedAt: new Date(),
          isActive: true,
        },
        {
          id: "042",
          createdAt: new Date(),
          code: "02",
          name: "Dental Accessories",
          description: "Medical solutions products",
          parentCategory: "",
          image: "",
          updatedAt: new Date(),
          isActive: true,
        },
      ],
    },
  ],
};
