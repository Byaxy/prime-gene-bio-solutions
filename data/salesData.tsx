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
  invoiceNumber: string;
  customer: string;
  total: string;
  paid: string;
  paymentStatus: string;
  saleStatus: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const salesData: DataType = {
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
      name: "Total",
      selector: (row: { total: string }) => row.total,
      width: "90px",
    },
    {
      name: "Paid",
      selector: (row: { paid: string }) => row.paid,
      width: "90px",
    },
    {
      name: "Payment Status",
      selector: (row: { paymentStatus: string }) => row.paymentStatus,
      width: "150px",
      conditionalCellStyles: [
        {
          when: (row: { paymentStatus: string }) =>
            row.paymentStatus === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "700",
          },
        },
        {
          when: (row: { paymentStatus: string }) =>
            row.paymentStatus === "Paid",
          style: {
            color: "#2ED480",
            fontWeight: "700",
          },
        },
      ],
    },
    {
      name: "Sale Status",
      selector: (row: { saleStatus: string }) => row.saleStatus,
      width: "120px",
      conditionalCellStyles: [
        {
          when: (row: { saleStatus: string }) => row.saleStatus === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "700",
          },
        },
        {
          when: (row: { saleStatus: string }) => row.saleStatus === "Completed",
          style: {
            color: "#2ED480",
            fontWeight: "700",
          },
        },
        {
          when: (row: { saleStatus: string }) => row.saleStatus === "Cancelled",
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
      invoiceNumber: "Inv.2023/06/001",
      customer: "PARTNERS IN HEALTH",
      total: "$12000",
      paid: "$12000",
      paymentStatus: "Paid",
      saleStatus: "Completed",
    },
    {
      id: 2,
      date: "15/06/2023",
      invoiceNumber: "Inv.2023/06/001",
      customer: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
      total: "$12000",
      paid: "$2000",
      paymentStatus: "Pending",
      saleStatus: "Completed",
    },
    {
      id: 3,
      date: "15/06/2023",
      invoiceNumber: "Inv.2023/06/001",
      customer: "GIMS HOSPITAL",
      total: "$12000",
      paid: "$12000",
      paymentStatus: "Paid",
      saleStatus: "Pending",
    },
    {
      id: 4,
      date: "15/06/2023",
      invoiceNumber: "Inv.2023/06/001",
      customer: "Hope For Women",
      total: "$12000",
      paid: "$2000",
      paymentStatus: "Pending",
      saleStatus: "Cancelled",
    },
    {
      id: 5,
      date: "15/06/2023",
      invoiceNumber: "Inv.2023/06/001",
      customer: "GIMS HOSPITAL",
      total: "$12000",
      paid: "$2000",
      paymentStatus: "Pending",
      saleStatus: "Pending",
    },
  ],
};
