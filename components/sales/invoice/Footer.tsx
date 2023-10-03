import React from "react";

export default function Footer() {
  return (
    <div className="w-full py-5 break-inside-avoid">
      <div className="w-full bg-primaryColor flex gap-2 p-3 text-[10px]">
        <div className="flex-[1.5]">
          <span className="text-white font-semibold my-0 pb-1 text-xs">
            Products Solutions:
          </span>
          <ul className="text-mainColor list-none my-0 pl-3">
            <li>Medical laboratory Equipment & Consumables </li>
            <li>Medical Imaging Equipment & Consumables</li>
            <li>Medical Equipment & Consumables</li>
            <li>Dental Equipment & Consumables</li>
            <li>Veterinary Equipment & Consumables</li>
            <li>Research & Teaching Equipment & Consumables</li>
          </ul>
        </div>
        <div className="flex-1">
          <span className="text-white font-semibold my-0 pb-1 text-xs">
            Service Solutions:
          </span>
          <ul className="text-mainColor list-none my-0 pl-3">
            <li>Consultancy Services</li>
            <li>Training Services</li>
            <li>QC/QA Services</li>
            <li>OEM production</li>
            <li>Contract manufacturing</li>
          </ul>
        </div>
        <div className="flex-1">
          <span className="text-white font-semibold my-0 pb-1 text-xs">
            Service Solutions:
          </span>
          <ul className="text-mainColor list-none my-0 pl-3">
            <li>Consultancy Services</li>
            <li>Training Services</li>
            <li>QC/QA Services</li>
            <li>OEM production</li>
            <li>Contract manufacturing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
