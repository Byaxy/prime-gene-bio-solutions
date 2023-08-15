import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomerGroups } from "@/components/Types";

type HeaderCells = {
  name: string;
  selector?: (row: DataCells) => any;
  cell?: any;
  width?: string;
  style?: {
    display?: string;
    justifyContent?: string;
    gap?: string;
  };
};

type DataCells = Omit<CustomerGroups, "updatedAt" | "isActive">;

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const customerGroupsData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { createdAt: Date }) => row.createdAt.toISOString(),
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Percentage",
      selector: (row: { percentage: number }) => row.percentage,
    },
    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link href={`/settings/customer-groups/edit/${row.id}`} key={row.id}>
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/settings/customer-groups">
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
      name: "Distributor",
      createdAt: new Date(),
      percentage: 0,
    },
  ],
};
