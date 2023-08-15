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
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
};

export type DataType = {
  columns: HeaderCells[];
  data: DataCells[];
};

export const customersData: DataType = {
  columns: [
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
      name: "Address",
      selector: (row: { address: string }) => row.address,
    },
    {
      name: "City",
      selector: (row: { city: string }) => row.city,
    },
  ],
  data: [
    {
      id: "1",
      name: "UROCARE LIBERIA",
      email: "urocare@gmail.com",
      phoneNumber: "+231778371515",
      address: "Congo Town",
      city: "Monrovia",
    },
    {
      id: "2",
      name: "REDEMPTION PHARMACY",
      email: "redemptionpharmacy@gmail.com",
      phoneNumber: "0775206012",
      address: "GARNESVILLE, LPRC ROAD",
      city: "GARNESVILLE",
    },
    {
      id: "3",
      name: "LPRC MEDICAL CLINIC",
      email: "LPRC@gmail.com",
      phoneNumber: "0886475130",
      address: "bannersville",
      city: "Monrovia",
    },
    {
      id: "4",
      name: "PEACE CORPS LIBERIA",
      email: "wdoejuana@peacecorps.gov",
      phoneNumber: "+231779001229",
      address: "P.O. Box 707",
      city: "Monrovia",
    },
    {
      id: "5",
      name: "U.S. Embassy Monrovia",
      email: "MonroviaHU@state.gov",
      phoneNumber: "+231-777232973",
      address: "Bureau of Medical Services, U.S. Department of State",
      city: "Monrovia, Montserrado County",
    },
    {
      id: "6",
      name: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
      email: "clinilabmonrovia@gmail.com",
      phoneNumber: "+231555888850",
      address: "15th Street, Old Ghana Embassy",
      city: "Monrovia",
    },
    {
      id: "7",
      name: "Biomedical Link",
      email: "biomedicallink@yahoo.com",
      phoneNumber: "+231777984829",
      address: "Paynsville",
      city: "Monrovia",
    },
    {
      id: "8",
      name: "CLARA TOWN CLINIC",
      email: "Claratownclinic@gmail.com",
      phoneNumber: "+231778371515",
      address: "Clara Town",
      city: "Monrovia",
    },
  ],
};
