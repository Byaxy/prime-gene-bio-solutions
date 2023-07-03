type SettingsType = {
  title: string;
  description: string;
  path: string;
};
export const settingsData: SettingsType[] = [
  {
    title: "Product Units",
    description: "View all product units and register new units",
    path: "/settings/products-units",
  },
  {
    title: "Product Types",
    description: "View all product types and register new types",
    path: "/settings/products-types",
  },
  {
    title: "Product Categories",
    description:
      "View all product categories, register new categories, and manage their coresponding subcategories",
    path: "/settings/products-categories",
  },
  {
    title: "Product Brands",
    description: "View all product brands and register new brands",
    path: "/settings/products-brands",
  },
];
