import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { categoriesData } from "@/data/categoriesData";
import type { ProductCategory } from "@/components/Types";

type ViewCategoryDetailsProps = {
  open: boolean;
  handleClose: () => void;
  categoryID: string;
};

export default function ViewCategoryDetails({
  open,
  handleClose,
  categoryID,
}: ViewCategoryDetailsProps) {
  const [category, setCategory] = useState<ProductCategory | null>(null);

  useEffect(() => {
    const categoryDetails = categoriesData.find(
      (cate) => cate.id === categoryID
    );
    if (categoryDetails) {
      setCategory(categoryDetails);
    }
  }, [categoryID]);

  if (!category) {
    return null; // or render a loading state
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Category Details
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <Table size="medium">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Date of Registration
                </TableCell>
                <TableCell className="text-[17px]">
                  {category.createdAt.toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Name</TableCell>
                <TableCell className="text-[17px]">{category.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Code</TableCell>
                <TableCell className="text-[17px]">{category.code}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Description
                </TableCell>
                <TableCell className="text-[17px]">
                  {category.description}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            onClick={handleClose}
            className="font-bold bg-redColor/95 hover:bg-redColor text-white"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
