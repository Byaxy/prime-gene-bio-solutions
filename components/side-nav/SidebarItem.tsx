import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SidebarMenu from "./SidebarMenu";
import type { DataType } from "@/data/sidenavData";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

type SidebarItemProps = {
  data: DataType;
  open: boolean;
  isOpen?: boolean;
  handleClick?: () => void;
};

export default function SidebarItem({
  data,
  isOpen,
  open,
  handleClick,
}: SidebarItemProps) {
  const pathname = usePathname();

  return (
    <li className="w-full flex flex-col items-center cursor-pointer gap-2 bg-white">
      <Link
        href={data.path}
        onClick={handleClick}
        className={clsx(
          "w-full flex flex-row gap-2 items-center justify-start  hover:text-mainColor hover:bg-primaryColor border-0 rounded-md p-2 cursor-pointer",
          {
            "text-mainColor bg-primaryColor": pathname === data.path,
            "text-primaryColor bg-white": pathname !== data.path,
          }
        )}
      >
        <span>{data.icon}</span>
        {data.subCategories && data.subCategories.length !== 0 ? (
          <div
            className={clsx(
              `w-full flex flex-row gap-4
           items-center justify-between text-[16px] font-medium`,
              { "opacity-100": open, hidden: !open }
            )}
          >
            <span>{data.title}</span>
            {isOpen ? (
              <span className="text-xl">
                <KeyboardArrowDownIcon />
              </span>
            ) : (
              <span className="text-xl">
                <KeyboardArrowRightIcon />
              </span>
            )}
          </div>
        ) : (
          <span
            className={clsx("text-lg font-medium", {
              "opacity-100": open,
              hidden: !open,
            })}
          >
            {data.title}
          </span>
        )}
      </Link>
      {isOpen && data.subCategories && (
        <SidebarMenu data={data.subCategories} open={open} />
      )}
    </li>
  );
}
