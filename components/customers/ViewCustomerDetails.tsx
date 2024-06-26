import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import type { Customer } from "../Types";

type ViewCustomerDetailsProps = {
  open: boolean;
  handleClose: () => void;
  customer: Customer;
};

export default function ViewCustomerDetails({
  open,
  handleClose,
  customer,
}: ViewCustomerDetailsProps) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="flex justify-between items-center">
          <span className="text-2xl text-primaryDark font-bold">
            Customer Details
          </span>
          <CancelIcon
            fontSize="large"
            className="text-primaryDark cursor-pointer"
            onClick={handleClose}
          />
        </DialogTitle>
        <DialogContent>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Date of Registration
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {new Date(customer?.createdAt).toDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Status
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {customer?.isActive ? "Active" : "Not Active"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Name
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {customer?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Email
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {customer?.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Phone
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {customer?.phone}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Group/Category
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {customer?.customerGroup}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Address
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {customer?.address}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  City
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {customer?.city}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  State
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {customer?.state}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg text-primaryDark">
                  Country
                </TableCell>
                <TableCell className="text-[17px] text-primaryDark">
                  {customer?.country}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <h3 className="text-2xl text-primaryDark font-bold mb-0 mt-10 px-4">
            Contact Person Details
          </h3>
          {customer?.contactPerson ? (
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Name
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {customer.contactPerson?.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Email
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {customer.contactPerson?.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Phone Number
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {customer.contactPerson?.phone}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold text-lg text-primaryDark">
                    Status
                  </TableCell>
                  <TableCell className="text-[17px] text-primaryDark">
                    {customer.contactPerson?.isActive ? "Active" : "Not Active"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <span className="font-semibold text-lg text-primaryDark px-4 py-6 block">
              No Contact Person
            </span>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            size="large"
            onClick={handleClose}
            className="cancelBtn"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
