import React, { useEffect, useState } from "react";
import type { Customer } from "@/components/Types";
import axios from "axios";

type BuyerProps = {
  customer?: string;
};

export default function Buyer({ customer }: BuyerProps) {
  const [buyerDetails, setBuyerDetails] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/customers");
        let buyer = data.find(
          (cust: Customer) =>
            cust.name.toLowerCase().trim() === customer?.toLowerCase().trim()
        );
        if (buyer) {
          setBuyerDetails(buyer);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, [buyerDetails, customer]);

  return (
    <div className="flex-1">
      <span className="text-primaryColor font-bold leading-tight text-sm">
        Delivery Address:
      </span>
      <ul className="list-none m-0 text-primaryColor text-xs pl-4">
        <li className="font-semibold mb-1">{buyerDetails?.name}</li>
        <li>
          {buyerDetails?.address}, {buyerDetails?.state}
        </li>
        <li>
          {buyerDetails?.city}, {buyerDetails?.country}
        </li>
        <li></li>
        <li>{buyerDetails?.phone}</li>
        <li>{buyerDetails?.email}</li>
      </ul>
    </div>
  );
}
