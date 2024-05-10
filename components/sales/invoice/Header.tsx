import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div className="flex flex-row gap-8 justify-between items-start w-full">
      <div className="flex flex-col gap-1 justify-start items-center text-center">
        <div className="relative flex items-start justify-center object-cover w-full">
          <Image src="/logo2.png" width={120} height={80} alt="logo" />
        </div>
        <p className="my-0 z-10 text-primaryColor text-xs font-semibold">
          Legacy of Quality Par Excellence
        </p>
      </div>
      <div className="flex flex-col self-end">
        <h1 className="text-lg leading-tight text-primaryColor font-bold my-0">
          PRIME GENE BIOMEDICAL SOLUTIONS
        </h1>
        <div className="flex flex-col gap-1 mt-2 text-primaryColor text-xs">
          <p className="my-0">
            Rockville Valley, Johnson Compound, Haile Selassie Avenue,
          </p>
          <p className="my-0">Capitol Bypass Monrovia-Liberia</p>
          <p className="my-0">
            +231(0)775508118 / +233 (0)244364439 (whatsapp)
          </p>
          <p className="my-0">www.primegenebiomedicalsolutions.com</p>
        </div>
      </div>
    </div>
  );
}
