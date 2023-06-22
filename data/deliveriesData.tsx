type HeaderCells = {
  name: string;
  selector: (row: DataCells) => any;
  width?: string;
  style?: {
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
  id: number;
  date: string;
  wayBillNumber: string;
  invoiceNumber: string;
  customer: string;
  phoneNumber: string;
  address: string;
  total: string;
  status: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const deliveriesData: DataType = {
  columns: [
    {
      name: "No.",
      selector: (row: { id: number }) => row.id,
      width: "55px",
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Date",
      selector: (row: { date: string }) => row.date,
      width: "110px",
    },
    {
      name: "Way Bill No.",
      selector: (row: { wayBillNumber: string }) => row.wayBillNumber,
      width: "160px",
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Invoice No.",
      selector: (row: { invoiceNumber: string }) => row.invoiceNumber,
      width: "160px",
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Customer",
      selector: (row: { customer: string }) => row.customer,
    },
    {
      name: "Phone Number",
      selector: (row: { phoneNumber: string }) => row.phoneNumber,
      width: "160px",
    },
    {
      name: "Address",
      selector: (row: { address: string }) => row.address,
      width: "160px",
    },
    {
      name: "Total",
      selector: (row: { total: string }) => row.total,
      width: "100px",
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
          when: (row: { status: string }) => row.status === "Completed",
          style: {
            color: "#2ED480",
            fontWeight: "700",
          },
        },
        {
          when: (row: { status: string }) => row.status === "Cancelled",
          style: {
            color: "#dc4545",
            fontWeight: "700",
          },
        },
      ],
    },
  ],
  data: [
    {
      id: 1,
      date: "15/06/2023",
      wayBillNumber: "PFI2023/06/001",
      invoiceNumber: "Inv.2023/06/001",
      customer: "PARTNERS IN HEALTH",
      phoneNumber: "+231778371515",
      address: "Clara Town",
      total: "$12000",
      status: "Completed",
    },
    {
      id: 2,
      date: "15/06/2023",
      wayBillNumber: "PFI2023/06/001",
      invoiceNumber: "Inv.2023/06/001",
      customer: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
      phoneNumber: "+231778371515",
      address: "Monrovia",
      total: "$12000",
      status: "Completed",
    },
    {
      id: 3,
      date: "15/06/2023",
      wayBillNumber: "PFI2023/06/001",
      invoiceNumber: "Inv.2023/06/001",
      customer: "GIMS HOSPITAL",
      phoneNumber: "+231778371515",
      address: "Clara Town",
      total: "$12000",
      status: "Pending",
    },
    {
      id: 4,
      date: "15/06/2023",
      wayBillNumber: "PFI2023/06/001",
      invoiceNumber: "Inv.2023/06/001",
      customer: "Hope For Women",
      phoneNumber: "+231778371515",
      address: "Bannersville",
      total: "$12000",
      status: "Cancelled",
    },
    {
      id: 5,
      date: "15/06/2023",
      wayBillNumber: "PFI2023/06/001",
      invoiceNumber: "Inv.2023/06/001",
      customer: "GIMS HOSPITAL",
      phoneNumber: "+231778371515",
      address: "Congo Town",
      total: "$12000",
      status: "Pending",
    },
  ],
};
