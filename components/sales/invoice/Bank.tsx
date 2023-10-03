import React from "react";

export default function Bank() {
  return (
    <div className="w-full flex justify-between pt-5 break-inside-avoid">
      <div className="text-sm flex flex-col gap-2 flex-[2]">
        <span className="text-primaryColor font-bold leading-tight">
          Bank Details
        </span>
        <ul className="list-none p-0 m-0 text-primaryColor text-xs">
          <li>
            <span className="font-semibold">Bank Name:</span> United Bank for
            African (UBA) Lib. Ltd.
          </li>
          <li>
            <span className="font-semibold">Address:</span> 5th Street, Sinkor,
            Monrovia, Liberia
          </li>
          <li>
            <span className="font-semibold">Account #:</span> 53060160000089
          </li>
          <li>
            <span className="font-semibold"> Swift Code:</span> UNAFLRLM
          </li>
        </ul>
      </div>
      <div className="text-sm flex flex-col gap-2 text-primaryColor flex-1">
        <span className="font-bold leading-tight">Terms & Conditions</span>
        <p className="my-0 text-xs">
          By signing above, you agree the terms on this delivery note are
          correct and accurate, no other terms & conditions shall apply.
        </p>
      </div>
    </div>
  );
}
