import React, { useEffect, useState } from "react";
import { customersData } from "@/data/customersData";
import type { Customer } from "@/components/Types";

type BuyerProps = {
  customer?: string;
};

export default function Buyer({ customer }: BuyerProps) {
  const [buyerDetails, setBuyerDetails] = useState<Customer | null>(null);

  useEffect(() => {
    let buyer = customersData.data.filter(
      (cust) => cust.name.toLowerCase() === customer?.toLowerCase()
    );
    if (buyer) {
      setBuyerDetails(buyer[0]);
    }

    console.log(buyerDetails);
  }, [buyerDetails, customer]);

  return (
    <div className="flex-1">
      <span className="text-primaryColor font-medium leading-tight text-sm">
        Delivery Address:
      </span>
      <ul className="list-none m-0 text-primaryColor text-xs pl-4">
        <li className="font-semibold mb-1">{buyerDetails?.name}</li>
        <li>
          <span>{buyerDetails?.address}</span>,{" "}
          <span>{buyerDetails?.state}</span>
        </li>
        <li>{buyerDetails?.city}</li>
        <li>{buyerDetails?.country}</li>
        <li>{buyerDetails?.phone}</li>
        <li>{buyerDetails?.email}</li>
      </ul>
    </div>
  );
}
