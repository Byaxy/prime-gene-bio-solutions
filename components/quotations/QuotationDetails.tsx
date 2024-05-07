type QuotationDetailsProps = {
  quotationDate: Date;
  quotationRefNo: string;
  quotationStatus: string;
};
const QuotationDetails = ({
  quotationDate,
  quotationRefNo,
  quotationStatus,
}: QuotationDetailsProps) => {
  return (
    <div className="w-full flex flex-col">
      <ul className="list-none p-0 m-0 text-primaryColor text-xs">
        <li>
          <span className="font-semibold">Quotation Date:</span>{" "}
          {new Date(quotationDate).toDateString()}
        </li>
        <li>
          <span className="font-semibold">Quotation Ref No:</span>{" "}
          {quotationRefNo}
        </li>
        <li>
          <span className="font-semibold">Quotation Status:</span>{" "}
          {quotationStatus}
        </li>
      </ul>
    </div>
  );
};

export default QuotationDetails;
