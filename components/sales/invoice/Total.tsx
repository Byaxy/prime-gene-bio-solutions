import React from "react";

type TotalProps = {
  subTotal?: number;
  tax?: number;
  total?: number;
};

export default function Total({ subTotal, tax, total }: TotalProps) {
  return (
    <div className="w-full flex flex-col gap-1 px-5 pt-5 items-end text-primaryColor break-inside-avoid">
      <div className="w-[200px] flex flex-row justify-between items-center">
        <span className="font-semibold">Sub Total:</span>
        <span className="font-semibold">$ {subTotal}</span>
      </div>
      <div className="w-[200px] flex flex-row justify-between items-center">
        <span className="font-semibold">Tax:</span>
        <span className="font-semibold">{tax}%</span>
      </div>
      <div className="w-[200px] flex flex-row justify-between items-center">
        <span className="font-semibold">Total:</span>
        <span className="font-semibold">$ {total}</span>
      </div>
    </div>
  );
}
