import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShuffleIcon from "@mui/icons-material/Shuffle";

export const data = [
  {
    id: 0,
    title: "Dashboard",
    path: "/",
    icon: <GridViewRoundedIcon />,
  },
  {
    id: 1,
    title: "Products",
    path: "/products",
    icon: <PeopleRoundedIcon />,
    subCategories: [
      {
        title: "Stock Adjustment",
        path: "/products/stock-adjustment",
      },
      {
        title: "Stock Ledger",
        path: "/products/stock-ledger",
      },
    ],
  },
  {
    id: 2,
    title: "Sales",
    path: "/sales",
    icon: <PointOfSaleIcon />,
    subCategories: [
      {
        title: "Deliveries",
        path: "/sales/deliveries",
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
    path: "/purchases",
    icon: <RequestQuoteRoundedIcon />,
  },
  {
    id: 5,
    title: "Expenses",
    path: "/expenses",
    icon: <RequestQuoteRoundedIcon />,
  },
  {
    id: 6,
    title: "Returns",
    path: "/returns",
    icon: <ShuffleIcon />,
  },
  {
    id: 7,
    title: "People",
    path: "/people",
    icon: <PeopleRoundedIcon />,
    subCategories: [
      {
        title: "Users",
        path: "/people/users",
      },
      {
        title: "Customers",
        path: "/people/customers",
      },
      {
        title: "Suppliers",
        path: "/people/suppliers",
      },
    ],
  },
  {
    id: 8,
    title: "Documents",
    path: "/documents",
    icon: <SummarizeRoundedIcon />,
  },
  {
    id: 9,
    title: "Reports",
    path: "/reports",
    icon: <BarChartIcon />,
  },
  {
    id: 10,
    title: "Settings",
    path: "/settings",
    icon: <SettingsRoundedIcon />,
  },
];
