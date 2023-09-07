import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShuffleIcon from "@mui/icons-material/Shuffle";

export type DataType = {
  id: number;
  title: string;
  path: string;
  icon?: JSX.Element;
  subCategories?: DataType[];
};

export const data: DataType[] = [
  {
    id: 0,
    title: "Dashboard",
    path: "/",
    icon: <GridViewRoundedIcon />,
  },
  {
    id: 1,
    title: "Products",
    path: "",
    icon: <PeopleRoundedIcon />,
    subCategories: [
      {
        id: 10,
        title: "All Products",
        path: "/products",
      },
      {
        id: 11,
        title: "Categories",
        path: "/products/categories",
      },
      {
        id: 12,
        title: "Sub Categories",
        path: "/products/subcategories",
      },
      {
        id: 13,
        title: "Brands",
        path: "/products/brands",
      },
      {
        id: 14,
        title: "Types",
        path: "/products/types",
      },
      {
        id: 15,
        title: "Units",
        path: "/products/units",
      },
    ],
  },
  {
    id: 2,
    title: "Sales",
    path: "",
    icon: <PointOfSaleIcon />,
    subCategories: [
      {
        id: 20,
        title: "All Sales",
        path: "/sales",
      },
      {
        id: 21,
        title: "Deliveries",
        path: "/sales/deliveries",
      },
      {
        id: 22,
        title: "Way Bill",
        path: "/sales/way-bill",
      },
      {
        id: 23,
        title: "Sales Returns",
        path: "/sales/returns",
      },
    ],
  },
  {
    id: 3,
    title: "Quotations",
    path: "/quotations",
    icon: <PaidRoundedIcon />,
  },
  {
    id: 4,
    title: "Purchases",
    path: "",
    icon: <RequestQuoteRoundedIcon />,
    subCategories: [
      {
        id: 40,
        title: "All Purchases",
        path: "/purchases",
      },
      {
        id: 41,
        title: "Purchases Returns",
        path: "/purchases/returns",
      },
    ],
  },
  {
    id: 5,
    title: "Expenses",
    path: "",
    icon: <RequestQuoteRoundedIcon />,
    subCategories: [
      {
        id: 50,
        title: "All Expenses",
        path: "/expenses",
      },
      {
        id: 51,
        title: "Expense Categories",
        path: "/expenses/categories",
      },
    ],
  },
  {
    id: 6,
    title: "Users",
    path: "/users",
    icon: <PeopleRoundedIcon />,
  },
  {
    id: 7,
    title: "Customers",
    path: "",
    icon: <PeopleRoundedIcon />,
    subCategories: [
      {
        id: 70,
        title: "All Customers",
        path: "/customers",
      },
      {
        id: 71,
        title: "Customer Groups",
        path: "/customers/groups",
      },
    ],
  },
  {
    id: 8,
    title: "Suppliers",
    path: "/suppliers",
    icon: <PeopleRoundedIcon />,
  },
  {
    id: 9,
    title: "Iventory",
    path: "",
    icon: <SummarizeRoundedIcon />,
    subCategories: [
      {
        id: 90,
        title: "Products Stock",
        path: "/inventory",
      },
      {
        id: 91,
        title: "Inventory Logs",
        path: "/inventory/inventory-logs",
      },
    ],
  },
  {
    id: 9,
    title: "Documents",
    path: "/documents",
    icon: <SummarizeRoundedIcon />,
  },
  {
    id: 10,
    title: "Reports",
    path: "/reports",
    icon: <BarChartIcon />,
  },
  {
    id: 11,
    title: "Settings",
    path: "/settings",
    icon: <SettingsRoundedIcon />,
  },
];
