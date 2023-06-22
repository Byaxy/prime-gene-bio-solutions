export const customTableStyles = {
  rows: {
    style: {
      "&:nth-child(even)": {
        backgroundColor: "#EDF3F6",
      },
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "#e5e7eb",
      },
      "&:nth-child(last)": {
        borderBottom: "1px",
      },
      color: "#232a58",
      fontSize: "15px",
    },
  },
  headCells: {
    style: {
      fontWeight: "600",
      fontSize: "16px",
      backgroundColor: "#232a58",
      color: "white",
      border: "1px solid white",
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },
  cells: {
    style: {
      paddingLeft: "12px",
      paddingRight: "12px",
    },
  },
};
