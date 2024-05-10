import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import type { DataType } from "@/data/sidenavData";
import { useRouter } from "next/navigation";

export default function SidebarMenu({
  data,
  open,
}: {
  data: DataType[];
  open: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const router = useRouter();

  const handleItemClick = (index: number, path: string) => {
    setOpenIndex(openIndex === index ? null : index);
    router.push(path);
  };

  return (
    <ul className="flex flex-col gap-2 items-start justify-center px-1 w-full bg-white">
      {data.map((item, index) => (
        <SidebarItem
          key={item.title}
          data={item}
          open={open}
          isOpen={openIndex === index}
          handleClick={() => handleItemClick(index, item.path)}
        />
      ))}
    </ul>
  );
}
