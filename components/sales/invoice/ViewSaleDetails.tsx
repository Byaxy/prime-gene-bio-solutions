import { useRef } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import InvoiceDetails from "./InvoiceDetails";
import Buyer from "./Buyer";
import Seller from "./Seller";
import ProductsTable from "./ProductsTable";
import Total from "./Total";
import Bank from "./Bank";
import { useReactToPrint } from "react-to-print";
import type { Sale } from "@/components/Types";

type ViewSaleDetailsProps = {
  open: boolean;
  handleClose: () => void;
  sale: Sale;
};

export default function ViewSaleDetails({
  open,
  handleClose,
  sale,
}: ViewSaleDetailsProps) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent className="bg-grayColor flex flex-col gap-5">
          <Button
            className="bg-primaryColor hover:bg-primaryColor/95 text-white self-end capitalize"
            onClick={handlePrint}
          >
            Print
          </Button>
          <div ref={componentRef} className="max-w-4xl mx-auto bg-white p-8">
            <Header />
            <div className="w-full bg-primaryColor text-mainColor flex items-center justify-center text-center my-2">
              <span className="font-semibold py-1 text-lg">
                Commercial Invoice
              </span>
            </div>
            <InvoiceDetails
              invoiceDate={sale.createdAt}
              invoiceRefNo={sale.invoiceNumber}
              purchaseOrderNo={sale.purchaseOrderNumber}
              paymentStatus={sale.paymentStatus}
              dueDate={new Date()}
            />
            <div className="w-full mt-3 flex flex-row items-start justify-between">
              <Seller />
              <Buyer customer={sale.customer} />
            </div>
            <ProductsTable products={sale.products} />
            <Total subTotal={sale.subTotal} tax={sale.tax} total={sale.total} />
            <div className="w-full flex justify-between mt-3 pt-5 text-xs pl-5 break-inside-avoid">
              <div className="flex flex-col gap-8 text-primaryColor flex-[2]">
                <span className="font-semibold">Stamp & Signature</span>
                <span className="font-semibold">Sales Manager</span>
              </div>
              <div className="flex flex-col gap-8 text-primaryColor flex-1">
                <span className="font-semibold">Stamp & Signature</span>
                <span className="font-semibold">Customer</span>
              </div>
            </div>
            <Bank />
            <Footer />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
