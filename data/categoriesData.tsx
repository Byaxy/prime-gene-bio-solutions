import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export type HeaderCells = {
  name: string;
  selector?: (row: DataCells) => any;
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
    when: (row: DataCells) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};
export type SubCategories = {
  name: string;
};
export type DataCells = {
  id: string;
  date: string;
  code: string;
  name: string;
  description: string;
  subCategories?: DataCells[];
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const categoriesData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { date: string }) => row.date,
      width: "180px",
    },
    {
      name: "Category Code",
      selector: (row: { code: string }) => row.code,
      width: "180px",
    },
    {
      name: "Category Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Category Description",
      selector: (row: { description: string }) => row.description,
    },
    {
      name: "Subcategories",
      cell: (row: { subCategories: DataCells[] }) => (
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
      date: "15/06/2023",
      code: "01",
      name: "Clinical Laboratory Solutions",
      description: "Clinical laboratory solutions products",
      subCategories: [
        {
          id: "011",
          date: "15/06/2023",
          code: "01",
          name: "Clinical Chemistry",
          description: "Clinical chemistry solutions products",
        },
        {
          id: "012",
          date: "16/05/2023",
          code: "02",
          name: "Haematology",
          description: "Medical solutions products",
        },
        {
          id: "013",
          date: "14/05/2023",
          code: "03",
          name: "Molecular Biology",
          description: "Imaging solutions products",
        },
      ],
    },
    {
      id: "02",
      date: "16/05/2023",
      code: "02",
      name: "Medical Solutions",
      description: "Medical solutions products",
      subCategories: [
        {
          id: "021",
          date: "15/06/2023",
          code: "01",
          name: "Critical care",
          description: "Clinical chemistry solutions products",
        },
        {
          id: "022",
          date: "16/05/2023",
          code: "02",
          name: "Primary care",
          description: "Medical solutions products",
        },
        {
          id: "023",
          date: "14/05/2023",
          code: "03",
          name: "Surgical care",
          description: "Imaging solutions products",
        },
        {
          id: "024",
          date: "14/05/2023",
          code: "04",
          name: "Specialist care",
          description: "Imaging solutions products",
        },
      ],
    },
    {
      id: "03",
      date: "14/05/2023",
      code: "03",
      name: "Imaging Solutions",
      description: "Imaging solutions products",
      subCategories: [
        {
          id: "031",
          date: "15/06/2023",
          code: "01",
          name: "Radiology",
          description: "Clinical chemistry solutions products",
        },
        {
          id: "032",
          date: "16/05/2023",
          code: "02",
          name: "Ultrasonography",
          description: "Medical solutions products",
        },
      ],
    },
    {
      id: "04",
      date: "10/02/2023",
      code: "04",
      name: "Dental Solutions",
      description: "Dental solutions products",
      subCategories: [
        {
          id: "041",
          date: "15/06/2023",
          code: "01",
          name: "Dental Laboratory",
          description: "Clinical chemistry solutions products",
        },
        {
          id: "042",
          date: "16/05/2023",
          code: "02",
          name: "Dental Accessories",
          description: "Medical solutions products",
        },
      ],
    },
  ],
};
