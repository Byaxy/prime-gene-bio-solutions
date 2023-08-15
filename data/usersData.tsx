import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

type HeaderCells = {
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
export type DataCells = {
  id: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const usersData: DataType = {
  columns: [
    {
      name: "Image",
      selector: (row: { image: string }) => row.image,
      width: "80px",
      cell: (row: { image: string }) => (
        <div className="flex items-center justify-center p-1">
          <Image
            className="object-cover"
            src={row.image}
            alt="Product Image"
            height={60}
            width={60}
          />
        </div>
      ),
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    {
      name: "First Name",
      selector: (row: { firstName: string }) => row.firstName,
    },
    {
      name: "Last Name",
      selector: (row: { lastName: string }) => row.lastName,
    },
    {
      name: "Email",
      selector: (row: { email: string }) => row.email,
    },
    {
      name: "Role",
      selector: (row: { role: string }) => row.role,
    },
    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link href={`/people/users/edit-user/${row.id}`} key={row.id}>
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/people/users">
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
      id: "1",
      image: "/user.png",
      firstName: "Dr. Adam-Yakub",
      lastName: "A.N.D.",
      email: "owner@tecdiary.com",
      role: "Admin",
    },
    {
      id: "2",
      image: "/user.png",
      firstName: "Tanisha",
      lastName: "Bhattacharya",
      email: "tanisha@ubiniumtechsol.com",
      role: "Manager",
    },
  ],
};
