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
  id: string;
  companyName: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const suppliersData: DataType = {
  columns: [
    {
      name: "Company Name",
      selector: (row: { companyName: string }) => row.companyName,
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
      style: {
        fontWeight: "600",
      },
    },
    {
      name: "Email",
      selector: (row: { email: string }) => row.email,
    },
    {
      name: "Phone Number",
      selector: (row: { phoneNumber: string }) => row.phoneNumber,
      width: "160px",
    },
    {
      name: "City",
      selector: (row: { city: string }) => row.city,
    },
    {
      name: "Country",
      selector: (row: { country: string }) => row.country,
    },
  ],
  data: [
    {
      id: "1",
      companyName: "HEMOCUE AB",
      name: "Costabel, Pierre",
      email: "Pierre.Costabel@hemocue.co.za",
      phoneNumber: "+27713859326",
      address: "262 23",
      city: "ANGELHOLM",
      state: "ANGELHOLM",
      country: "SWEDEN",
    },
    {
      id: "2",
      companyName: "Biorex Diagnostics Ltd",
      name: "Biorex Diagnostics Ltd",
      email: "info@biorexdiagnostics.com",
      phoneNumber: "+44 (0)2894 468786",
      address: "Unit 2C, Antrim Technology Park, Muckamore, BT41 1QS,",
      city: "Muckamore",
      state: "",
      country: "United Kingdom",
    },
  ],
};
