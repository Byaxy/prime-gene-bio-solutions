import React from "react";

type InvoiceDetailsProps = {
  invoiceDate?: Date;
  invoiceRefNo?: string;
  purchaseOrderNo?: string;
  paymentStatus?: string;
  dueDate?: Date;
};

export default function InvoiceDetails({
  invoiceDate,
  invoiceRefNo,
  purchaseOrderNo,
  paymentStatus,
  dueDate,
}: InvoiceDetailsProps) {
  return (
    <div className="w-full flex flex-col">
      <ul className="list-none p-0 m-0 text-primaryColor text-xs">
        <li>
          <span className="font-semibold">Invoice Date:</span>{" "}
          {invoiceDate?.toDateString()}
        </li>
        <li>
          <span className="font-semibold">Invoice Ref No:</span> {invoiceRefNo}
        </li>
        <li>
          <span className="font-semibold">Purchase Order No:</span>{" "}
          {purchaseOrderNo}
        </li>
        <li>
          <span className="font-semibold">Payment Status:</span> {paymentStatus}
        </li>
        <li>
          <span className="font-semibold">Due Date:</span>{" "}
          {dueDate?.toDateString()}
        </li>
      </ul>
    </div>
  );
}
