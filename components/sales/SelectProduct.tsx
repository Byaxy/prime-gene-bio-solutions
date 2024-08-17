import React, { useState } from "react";
import {
  Button,
  Popover,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import { Product } from "@/components/Types";

interface SelectProductProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const SelectProduct: React.FC<SelectProductProps> = ({
  products,
  onProductSelect,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSearchTerm("");
    setAnchorEl(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.code.toLowerCase().includes(term)
      )
    );
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        variant="outlined"
        size="large"
        className="w-full flex flex-row items-center justify-between max-w-2xl"
        onClick={handleClick}
      >
        <span className="text-gray-400 capitalize sm:text-lg">
          Select product
        </span>
        {open ? <ArrowDropUpOutlined /> : <ArrowDropDownOutlined />}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="min-w-[672px] flex flex-col gap-5 p-5">
          <TextField
            type="text"
            size="small"
            placeholder="Search products by Name or Code"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Table size="small">
            <TableHead>
              <TableRow className="bg-primaryColor font-semibold text-lg">
                <TableCell className="text-white text-lg w-32">Code</TableCell>
                <TableCell className="text-white text-lg">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="overflow-y-scroll">
              {filteredProducts.map((product, index) => (
                <TableRow
                  key={product.id + index}
                  onClick={() => {
                    onProductSelect(product);
                    handleClose();
                  }}
                  className="cursor-pointer hover:bg-grayColor"
                >
                  <TableCell className="text-primaryDark text-lg">
                    {product.code}
                  </TableCell>
                  <TableCell className="text-primaryDark text-lg">
                    {product.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Popover>
    </div>
  );
};

export default SelectProduct;
