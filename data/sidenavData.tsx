import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import BarChartIcon from "@mui/icons-material/BarChart";
import { generateId } from "@/components/utils";

export type DataType = {
  id: string;
  title: string;
  path: string;
  icon?: JSX.Element;
  subCategories?: DataType[];
};

export const data: DataType[] = [
  {
    id: generateId(),
    title: "Dashboard",
    path: "/",
    icon: <GridViewRoundedIcon />,
  },
  {
    id: generateId(),
    title: "Products",
    path: "",
    icon: <PeopleRoundedIcon />,
    subCategories: [
      {
        id: generateId(),
        title: "All Products",
        path: "/products",
      },
      {
        id: generateId(),
        title: "Categories",
        path: "/products/categories",
      },
      {
        id: generateId(),
        title: "Brands",
        path: "/products/brands",
      },
      {
        id: generateId(),
        title: "Types",
        path: "/products/types",
      },
      {
        id: generateId(),
        title: "Units",
        path: "/products/units",
      },
    ],
  },
  {
    id: generateId(),
    title: "Sales",
    path: "",
    icon: <PointOfSaleIcon />,
    subCategories: [
      {
        id: generateId(),
        title: "All Sales",
        path: "/sales",
      },
      {
        id: generateId(),
        title: "Deliveries",
        path: "/sales/deliveries",
      },
      {
        id: generateId(),
        title: "Way Bill",
        path: "/sales/way-bill",
      },
      {
        id: generateId(),
        title: "Sales Returns",
        path: "/sales/returns",
      },
    ],
  },
  {
    id: generateId(),
    title: "Quotations",
    path: "/quotations",
    icon: <PaidRoundedIcon />,
  },
  {
    id: generateId(),
    title: "Purchases",
    path: "",
    icon: <RequestQuoteRoundedIcon />,
    subCategories: [
      {
        id: generateId(),
        title: "All Purchases",
        path: "/purchases",
      },
      {
        id: generateId(),
        title: "Purchases Returns",
        path: "/purchases/returns",
      },
    ],
  },
  {
    id: generateId(),
    title: "Expenses",
    path: "",
    icon: <RequestQuoteRoundedIcon />,
    subCategories: [
      {
        id: generateId(),
        title: "All Expenses",
        path: "/expenses",
      },
      {
        id: generateId(),
        title: "Expense Categories",
        path: "/expenses/categories",
      },
    ],
  },
  {
    id: generateId(),
    title: "Users",
    path: "/users",
    icon: <PeopleRoundedIcon />,
  },
  {
    id: generateId(),
    title: "Customers",
    path: "",
    icon: <PeopleRoundedIcon />,
    subCategories: [
      {
        id: generateId(),
        title: "All Customers",
        path: "/customers",
      },
      {
        id: generateId(),
        title: "Customer Groups",
        path: "/customers/groups",
      },
    ],
  },
  {
    id: generateId(),
    title: "Suppliers",
    path: "/suppliers",
    icon: <PeopleRoundedIcon />,
  },
  {
    id: generateId(),
    title: "Iventory",
    path: "",
    icon: <SummarizeRoundedIcon />,
    subCategories: [
      {
        id: generateId(),
        title: "Products Stock",
        path: "/inventory",
      },
      {
        id: generateId(),
        title: "Inventory Logs",
        path: "/inventory/inventory-logs",
      },
    ],
  },
  {
    id: generateId(),
    title: "Documents",
    path: "/documents",
    icon: <SummarizeRoundedIcon />,
  },
  {
    id: generateId(),
    title: "Reports",
    path: "/reports",
    icon: <BarChartIcon />,
  },
  {
    id: generateId(),
    title: "Settings",
    path: "/settings",
    icon: <SettingsRoundedIcon />,
  },
];
