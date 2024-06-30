import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import type { DataType } from "@/data/sidenavData";

export default function SidebarMenu({
  data,
  open,
}: {
  data: DataType[];
  open: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ul className="flex flex-col gap-2 items-start justify-center px-1 w-full bg-white">
      {data.map((item, index) => (
        <SidebarItem
          key={item.title}
          data={item}
          open={open}
          isOpen={openIndex === index}
          handleClick={() => handleItemClick(index)}
        />
      ))}
    </ul>
  );
}
