"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { Avatar, Typography } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import useUser from "@/utils/hooks/useUser";

export default function Header() {
  const [open, setOpen] = useState(false);

  const supabase = supabaseBrowserClient();

  const handleLogout = async () => {
    setOpen(false);
    await supabase.auth.signOut();

    window.location.reload();
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const { data: user } = useUser();

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className="relative w-full flex flex-row items-center justify-end gap-3">
        <Typography className="hidden sm:flex flex-col justify-center text-white">
          <span className="text-xl capitalize">
            {user?.data?.user?.user_metadata?.name}
          </span>
          <span className="text-sm text-grayColor/60">
            {user?.data?.user?.email}
          </span>
        </Typography>
        <Avatar
          onClick={handleClick}
          className="shadow-lg cursor-pointer flex items-center justify-center"
          src="/user.png"
        />
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
