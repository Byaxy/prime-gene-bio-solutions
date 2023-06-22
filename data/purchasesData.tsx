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
  purchaseOrderNumber: string;
  supplier: string;
  total: string;
  paymentStatus: string;
  purchaseStatus: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const purchasesData: DataType = {
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
      name: "Purchase Order No.",
      selector: (row: { purchaseOrderNumber: string }) =>
        row.purchaseOrderNumber,
      width: "160px",
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Supplier",
      selector: (row: { supplier: string }) => row.supplier,
    },
    {
      name: "Total",
      selector: (row: { total: string }) => row.total,
      width: "90px",
    },
    {
      name: "Payment Status",
      selector: (row: { paymentStatus: string }) => row.paymentStatus,
      width: "140px",
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
      name: "Purchase Status",
      selector: (row: { purchaseStatus: string }) => row.purchaseStatus,
      width: "140px",
      conditionalCellStyles: [
        {
          when: (row: { purchaseStatus: string }) =>
            row.purchaseStatus === "Pending",
          style: {
            color: "#FD8539",
            fontWeight: "700",
          },
        },
        {
          when: (row: { purchaseStatus: string }) =>
            row.purchaseStatus === "Recieved",
          style: {
            color: "#2ED480",
            fontWeight: "700",
          },
        },
        {
          when: (row: { purchaseStatus: string }) =>
            row.purchaseStatus === "Cancelled",
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
      purchaseOrderNumber: "PO2023/06/001",
      supplier: "MICROPROFIT",
      total: "$12000",
      paymentStatus: "Paid",
      purchaseStatus: "Recieved",
    },
    {
      id: 2,
      date: "15/06/2023",
      purchaseOrderNumber: "PO2023/06/001",
      supplier: "MICROPROFIT",
      total: "$12000",
      paymentStatus: "Pending",
      purchaseStatus: "Recieved",
    },
    {
      id: 3,
      date: "15/06/2023",
      purchaseOrderNumber: "PO2023/06/001",
      supplier: "Biorex Diagnostics Ltd",
      total: "$11400",
      paymentStatus: "Paid",
      purchaseStatus: "Pending",
    },
    {
      id: 4,
      date: "15/06/2023",
      purchaseOrderNumber: "PO2023/06/001",
      supplier: "HEMOCUE AB",
      total: "$12450",
      paymentStatus: "Pending",
      purchaseStatus: "Cancelled",
    },
    {
      id: 5,
      date: "15/06/2023",
      purchaseOrderNumber: "PO2023/06/001",
      supplier: "HEMOCUE AB",
      total: "$56000",
      paymentStatus: "Pending",
      purchaseStatus: "Pending",
    },
  ],
};
