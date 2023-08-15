type SettingsType = {
  title: string;
  description: string;
  path: string;
};
export const settingsData: SettingsType[] = [
  {
    title: "Products Categories And Sub Categories",
    description:
      "View all products categories, register new categories, and manage their coresponding subcategories",
    path: "/settings/products-categories",
  },
  {
    title: "Product Units",
    description: "View all products units and register new units",
    path: "/settings/products-units",
  },
  {
    title: "Product Types",
    description: "View all products types and register new types",
    path: "/settings/products-types",
  },

  {
    title: "Product Brands",
    description: "View all products brands and register new brands",
    path: "/settings/products-brands",
  },
  {
    title: "Customer Groups",
    description: "View and manage all your customer groups",
    path: "/settings/customer-groups",
  },
];
