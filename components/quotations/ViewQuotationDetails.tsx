import { useRef } from "react";
import { Quotation } from "../Types";
import { useReactToPrint } from "react-to-print";
import { Button, Dialog, DialogContent } from "@mui/material";
import Header from "../sales/invoice/Header";
import QuotationDetails from "./QuotationDetails";
import Seller from "../sales/invoice/Seller";
import Buyer from "../sales/invoice/Buyer";
import ProductsTable from "../sales/invoice/ProductsTable";
import Total from "../sales/invoice/Total";
import Bank from "../sales/invoice/Bank";
import Footer from "../sales/invoice/Footer";

type ViewQuotationDetailsProps = {
  open: boolean;
  handleClose: () => void;
  quotation: Quotation;
};
const ViewQuotationDetails = ({
  open,
  handleClose,
  quotation,
}: ViewQuotationDetailsProps) => {
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
              <span className="font-semibold py-1 text-lg">Quotation</span>
            </div>
            <QuotationDetails
              quotationDate={quotation.createdAt}
              quotationRefNo={quotation.quotationNumber}
              quotationStatus={quotation.quotationStatus}
            />
            <div className="w-full mt-3 flex flex-row items-start justify-between">
              <Seller />
              <Buyer customer={quotation.customer} />
            </div>
            <ProductsTable products={quotation.products} />
            <Total
              subTotal={quotation.subTotal}
              tax={quotation.tax}
              total={quotation.total}
            />
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
};

export default ViewQuotationDetails;
