"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import appwriteService from "@/appwrite/appwriteConfig";
import { Models } from "appwrite";
import { Avatar, Typography } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<Models.Preferences | null>(null);

  const router = useRouter();
  const { setAuthStatus } = useAuth();

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await appwriteService.logout().then(() => {
      setAuthStatus(false);
      setOpen(false);
      router.replace("/login");
      toast.success("Logout Successful");
    });
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await appwriteService.getCurrentUser();
      setUser(currentUser);
    };

    getCurrentUser();
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className="relative w-full flex flex-row items-center justify-end gap-3">
        <Typography className="hidden sm:flex flex-col justify-center text-white">
          <span className="text-xl capitalize">{user?.name}</span>
          <span className="text-sm text-grayColor/60">{user?.email}</span>
        </Typography>
        <Avatar
          onClick={handleClick}
          className="shadow-lg cursor-pointer flex items-center justify-center"
        >
          <span className="flex items-center cursor-pointer justify-center text-primaryColor w-full h-full text-xl font-bold bg-white">
            {user?.name.split(" ")[0][0]}
            {user?.name.split(" ")[1][0]}
          </span>
        </Avatar>
        {open ? (
          <Box className="absolute top-12 py-5 px-6 right-0 z-10 rounded-md shadow-md bg-white">
            <ul className="flex flex-col items-start justify-center gap-2 list-none max-w-[200px] m-0 p-0">
              <li
                onClick={handleLogout}
                className="flex flex-row items-center justify-center text-white cursor-pointer gap-2 bg-redColor rounded-md py-1 px-6 w-full"
              >
                <span className="text-2xl flex items-center justify-center">
                  <PowerSettingsNewIcon fontSize="inherit" />
                </span>
                <span className="text-lg font-semibold">Log Out</span>
              </li>
            </ul>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
