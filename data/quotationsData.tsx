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
  quotationNumber: string;
  customer: string;
  total: string;
  status: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const quotationsData: DataType = {
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
      name: "Quotation No.",
      selector: (row: { quotationNumber: string }) => row.quotationNumber,
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
      name: "Total",
      selector: (row: { total: string }) => row.total,
      width: "90px",
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
      quotationNumber: "PFI2023/06/001",
      customer: "PARTNERS IN HEALTH",
      total: "$12000",
      status: "Completed",
    },
    {
      id: 2,
      date: "15/06/2023",
      quotationNumber: "PFI2023/06/001",
      customer: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
      total: "$12000",
      status: "Completed",
    },
    {
      id: 3,
      date: "15/06/2023",
      quotationNumber: "PFI2023/06/001",
      customer: "GIMS HOSPITAL",
      total: "$12000",
      status: "Pending",
    },
    {
      id: 4,
      date: "15/06/2023",
      quotationNumber: "PFI2023/06/001",
      customer: "Hope For Women",
      total: "$12000",
      status: "Cancelled",
    },
    {
      id: 5,
      date: "15/06/2023",
      quotationNumber: "PFI2023/06/001",
      customer: "GIMS HOSPITAL",
      total: "$12000",
      status: "Pending",
    },
  ],
};
