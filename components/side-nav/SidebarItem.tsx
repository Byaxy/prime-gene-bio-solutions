import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SidebarMenu from "./SidebarMenu";
import type { DataType } from "@/data/sidenavData";

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
  return (
    <li className="w-full flex flex-col items-center cursor-pointer gap-2 bg-white">
      <button
        onClick={handleClick}
        className={`${
          isOpen
            ? "text-mainColor bg-primaryColor"
            : "text-primaryColor bg-white"
        } w-full flex flex-row gap-2 items-center justify-start hover:text-mainColor hover:bg-primaryColor border-0 rounded-md p-2 cursor-pointer`}
      >
        <span>{data.icon}</span>
        {data.subCategories && data.subCategories.length !== 0 ? (
          <div
            className={`${
              open ? "opacity-100" : "hidden"
            } w-full flex flex-row gap-4
           items-center justify-between text-[16px] font-medium`}
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
            className={`${open ? "opacity-100" : "hidden"} text-lg font-medium`}
          >
            {data.title}
          </span>
        )}
      </button>
      {isOpen && data.subCategories && (
        <SidebarMenu data={data.subCategories} open={open} />
      )}
    </li>
  );
}
