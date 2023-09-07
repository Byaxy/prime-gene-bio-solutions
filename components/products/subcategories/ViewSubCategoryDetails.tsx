import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { subcategoriesData } from "@/data/subcategoriesData";
import type { ProductSubCategory } from "@/components/Types";

type ViewSubCategoryDetailsProps = {
  open: boolean;
  handleClose: () => void;
  subCategoryID: string;
};

export default function ViewSubCategoryDetails({
  open,
  handleClose,
  subCategoryID,
}: ViewSubCategoryDetailsProps) {
  const [subCategory, setSubCategory] = useState<ProductSubCategory | null>(
    null
  );

  useEffect(() => {
    const subCategoryDetails = subcategoriesData.data.find(
      (cate) => cate.id === subCategoryID
    );
    if (subCategoryDetails) {
      setSubCategory(subCategoryDetails);
    }
  }, [subCategoryID]);

  if (!subCategory) {
    return null; // or render a loading state
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Sub Category Details
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
                  {subCategory.createdAt.toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Name</TableCell>
                <TableCell className="text-[17px]">
                  {subCategory.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Code</TableCell>
                <TableCell className="text-[17px]">
                  {subCategory.code}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Description
                </TableCell>
                <TableCell className="text-[17px]">
                  {subCategory.description}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-semibold text-lg">
                  Sub Categories
                </TableCell>
                <TableCell className="text-[17px]">
                  {subCategory.subCategories?.map((sub) => sub.name).join(", ")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="large" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
