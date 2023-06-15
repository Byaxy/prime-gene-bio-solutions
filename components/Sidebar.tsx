import React, { useState } from "react";
import { data } from "@/data/sidenavData";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Sidebar({ open }) {
  const [show, setShow] = useState(Number);
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  const handleToggle = (index: number) => {
    setShow(index);
    setToggle((prev) => !prev);
  };

  return (
    <List className={`${open ? "px-2" : ""}`}>
      {data.map((item, index) => (
        <>
          {item.subCategories ? (
            <>
              <ListItem
                disablePadding
                className={`${
                  item.path === pathname
                    ? "bg-primaryColor text-mainColor"
                    : "text-primaryColor"
                } block cursor-pointer rounded-lg group hover:bg-primaryColor hover:text-mainColor my-1`}
              >
                <ListItemButton
                  className={`${open ? "" : "justify-center"} px-2`}
                >
                  <Link
                    href={item.path}
                    className={`${
                      item.path === pathname
                        ? "text-mainColor"
                        : "text-primaryColor"
                    } flex items-center w-full no-underline group-hover:text-mainColor`}
                    onClick={() => setShow(index)}
                  >
                    <ListItemIcon
                      title={item.title}
                      className={`${open ? "mr-3" : "auto"} ${
                        item.path === pathname
                          ? "bg-primaryColor text-mainColor"
                          : "text-primaryColor"
                      } min-w-0 justify-center group-hover:text-mainColor`}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      className={`${
                        open ? "opacity-100 font-semibold" : "opacity-0"
                      }`}
                    >
                      {item.title}
                    </ListItemText>
                    {show === item.id && toggle ? (
                      <span
                        onClick={() => setToggle((prev) => !prev)}
                        className={`${
                          open ? "opacity-100" : "opacity-0"
                        } flex items-center justify-center hover:bg-grayColor hover:text-primaryColor p-1 rounded-full `}
                      >
                        <KeyboardArrowDownIcon />
                      </span>
                    ) : (
                      <span
                        onClick={() => setToggle((prev) => !prev)}
                        className={`${
                          open ? "opacity-100" : "opacity-0"
                        } flex items-center justify-center hover:bg-grayColor hover:text-primaryColor p-1 rounded-full `}
                      >
                        <KeyboardArrowRightIcon />
                      </span>
                    )}
                  </Link>
                </ListItemButton>
              </ListItem>
              {show === item.id && toggle ? (
                <ul className="list-none flex flex-col">
                  {item.subCategories.map((item, index) => (
                    <li
                      key={item.title}
                      className={`${
                        item.path === pathname
                          ? "bg-primaryColor text-mainColor"
                          : "text-primaryColor"
                      } block cursor-pointer rounded-lg group hover:bg-primaryColor hover:text-mainColor py-3 px-2 my-1`}
                    >
                      <Link
                        href={item.path}
                        className={`${
                          item.path === pathname
                            ? "text-mainColor"
                            : "text-primaryColor"
                        } flex items-center w-full no-underline group-hover:text-mainColor`}
                      >
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <>
              <ListItem
                disablePadding
                className={`${
                  item.path === pathname
                    ? "bg-primaryColor text-mainColor"
                    : "text-primaryColor"
                } block cursor-pointer rounded-lg group hover:bg-primaryColor hover:text-mainColor my-1`}
              >
                <ListItemButton
                  className={`${open ? "" : "justify-center"} px-2`}
                >
                  <Link
                    href={item.path}
                    className={`${
                      item.path === pathname
                        ? "text-mainColor"
                        : "text-primaryColor"
                    } flex items-center w-full no-underline group-hover:text-mainColor`}
                  >
                    <ListItemIcon
                      title={item.title}
                      className={`${open ? "mr-3" : "auto"} ${
                        item.path === pathname
                          ? "bg-primaryColor text-mainColor"
                          : "text-primaryColor"
                      } min-w-0 justify-center group-hover:text-mainColor`}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      className={`${
                        open ? "opacity-100 font-semibold" : "opacity-0"
                      }`}
                    >
                      {item.title}
                    </ListItemText>
                  </Link>
                </ListItemButton>
              </ListItem>
            </>
          )}
        </>
      ))}
    </List>
  );
}
