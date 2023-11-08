import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type HeaderCells = {
  name: string;
  selector?: (row: DataCells) => any;
  width?: string;
  cell?: any;
  style?: {
    display?: string;
    justifyContent?: string;
    gap?: string;
    color?: string;
    fontWeight?: string;
    fontSize?: string;
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
  date: Date;
  deliveryReferenceNumber: string;
  saleInvoiceNumber: string;
  itemDescription: string;
  customer: string;
  address: string;
  status: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const allDeliveriesData: DataType = {
  columns: [
    {
      name: "Date",
      selector: (row: { date: Date }) => row.date.toDateString(),
      width: "110px",
    },
    {
      name: "Delivery Ref No.",
      selector: (row: { deliveryReferenceNumber: string }) =>
        row.deliveryReferenceNumber,
      width: "160px",
    },
    {
      name: "Item Description",
      selector: (row: { itemDescription: string }) => row.itemDescription,
    },
    {
      name: "Customer",
      selector: (row: { customer: string }) => row.customer,
      width: "220px",
    },
    {
      name: "Address",
      selector: (row: { address: string }) => row.address,
      width: "120px",
    },
    {
      name: "Status",
      selector: (row: { status: string }) => row.status,
      width: "120px",
      conditionalCellStyles: [
        {
          when: (row: { status: string }) => row.status === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "700",
          },
        },
        {
          when: (row: { status: string }) => row.status === "Recieved",
          style: {
            color: "#2ED480",
            fontWeight: "700",
          },
        },
        {
          when: (row: { status: string }) => row.status === "Rejected",
          style: {
            color: "#dc4545",
            fontWeight: "700",
          },
        },
      ],
    },
    {
      name: "Actions",
      cell: (row: { id: string }) => [
        <Link href={`/sales/deliveries/edit-delivery/${row.id}`} key={row.id}>
          <EditIcon sx={{ color: "#475BE8" }} />
        </Link>,
        <Link key={row.id} href="/sales/deliveries">
          <DeleteIcon color="error" />
        </Link>,
      ],
      width: "90px",
      style: {
        display: "flex",
        justifyContent: "center",
        gap: "4px",
      },
    },
  ],
  data: [
    {
      id: "1",
      date: new Date(),
      saleInvoiceNumber: "Inv.2023/06/001",
      deliveryReferenceNumber: "DO2023/06/0345",
      itemDescription: "P04-03-101139-00 - GENRUI KT03A Lyse Solution",
      customer: "PARTNERS IN HEALTH",
      address: "Congo Town",
      status: "Recieved",
    },
    {
      id: "2",
      date: new Date(),
      saleInvoiceNumber: "Inv.2023/06/001",
      deliveryReferenceNumber: "DO2023/06/0344",
      itemDescription: "P04-03-101139-00 - GENRUI KT03A Lyse Solution",
      customer: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
      address: "Congo Town",
      status: "Recieved",
    },
  ],
};
