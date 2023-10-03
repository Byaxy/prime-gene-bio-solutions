import type { Customer } from "@/components/Types";

type HeaderCells = {
  name: string;
  selector: (row: Customer) => any;
  width?: string;
  style?: {
    color?: string;
    fontWeight?: string;
    fontSize?: string;
  };
  conditionalCellStyles?: {
    when: (row: Customer) => boolean;
    style: {
      color?: string;
      fontWeight?: string;
      fontSize?: string;
    };
  }[];
};

export type DataType = {
  columns: HeaderCells[];
  data: Customer[];
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
      selector: (row: { phone: string }) => row.phone,
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
      customerGroup: "GENERAL",
      company: "UROCARE",
      name: "UROCARE LIBERIA",
      email: "urocare@gmail.com",
      phone: "+231778371515",
      address: "Congo Town",
      city: "Monrovia",
      state: "Liberia",
      postalCode: "11111",
      country: "Liberia",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "2",
      customerGroup: "PHARMACY",
      company: "REDEMPTION PHARMACY",
      name: "REDEMPTION PHARMACY",
      email: "redemptionpharmacy@gmail.com",
      phone: "0775206012",
      address: "GARNESVILLE, LPRC ROAD",
      city: "GARNESVILLE",
      state: "Liberia",
      postalCode: "11111",
      country: "Liberia",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "3",
      customerGroup: "CLINIC",
      company: "LPRC MEDICAL CLINIC",
      name: "LPRC MEDICAL CLINIC",
      email: "LPRC@gmail.com",
      phone: "0886475130",
      address: "bannersville",
      city: "Monrovia",
      state: "Liberia",
      postalCode: "11111",
      country: "Liberia",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "4",
      customerGroup: "GENERAL",
      company: "PEACE CORPS LIBERIA",
      name: "PEACE CORPS LIBERIA",
      email: "wdoejuana@peacecorps.gov",
      phone: "+231779001229",
      address: "P.O. Box 707",
      city: "Monrovia",
      state: "Liberia",
      postalCode: "11111",
      country: "Liberia",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "5",
      customerGroup: "GENERAL",
      company: "U.S. Embassy Monrovia",
      name: "U.S. Embassy Monrovia",
      email: "MonroviaHU@state.gov",
      phone: "+231-777232973",
      address: "Bureau of Medical Services, U.S. Department of State",
      city: "Monrovia, Montserrado County",
      state: "Liberia",
      postalCode: "11111",
      country: "Liberia",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "6",
      customerGroup: "GENERAL",
      company: "CLINILAB",
      name: "CLINILAB MEDICAL & DIAGNOSTIC CENTER",
      email: "clinilabmonrovia@gmail.com",
      phone: "+231555888850",
      address: "15th Street, Old Ghana Embassy",
      city: "Monrovia",
      state: "Liberia",
      postalCode: "11111",
      country: "Liberia",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "7",
      customerGroup: "GENERAL",
      company: "BIOMEDICALLINK",
      name: "Biomedical Link",
      email: "biomedicallink@yahoo.com",
      phone: "+231777984829",
      address: "Paynsville",
      city: "Monrovia",
      state: "Liberia",
      postalCode: "11111",
      country: "Liberia",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "8",
      customerGroup: "CLINIC",
      company: "CLARA TOWN CLINIC",
      name: "CLARA TOWN CLINIC",
      email: "Claratownclinic@gmail.com",
      phone: "+231778371515",
      address: "Clara Town",
      city: "Monrovia",
      state: "Liberia",
      postalCode: "11111",
      country: "Liberia",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  ],
};
