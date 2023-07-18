import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const session = useSession();

  const [show, setShow] = useState(false);
  const [userInitials, setUserInitials] = useState("");

  const userId = 1;

  const handleShow = () => {
    setShow((prev) => !prev);
  };
  const handleLogout = () => {
    handleShow();
    signOut();
    // router.push("/");
  };
  const handleProfileClick = () => {
    handleShow();
    router.push(`/profile/${userId}`);
  };
  const handleChangePasswordClick = () => {
    handleShow();
    router.push(`/profile/${userId}`);
  };
  useEffect(() => {
    let initials = "";
    const getInitials = () => {
      const fullName = session.data?.user?.name;
      const splitNames = fullName?.split(" ");

      splitNames?.map((name) => {
        initials += name[0].toUpperCase();
      });
      setUserInitials(initials);
    };
    getInitials();
  }, [session.data?.user?.name, userInitials]);
  return (
    <Box className="relative w-full flex flex-row items-center justify-end gap-3">
      <Typography className="hidden sm:flex flex-col justify-center text-white">
        <span className="text-xl capitalize">{session.data?.user?.name}</span>
        <span className="text-sm text-grayColor/60">
          {session.data?.user?.email}
        </span>
      </Typography>
      <Avatar
        onClick={handleShow}
        className="shadow-lg cursor-pointer flex items-center justify-center"
      >
        <span className="flex items-center cursor-pointer justify-center text-primaryColor w-full h-full text-xl font-bold bg-white">
          {userInitials}
        </span>
      </Avatar>
      {show && (
        <Box className="slide-left absolute top-12 right-0 p-5 flex flex-col gap-1 w-[260px] sm:w-[300px] rounded-xl shadow-lg bg-grayColor z-10">
          <ul className="flex flex-col items-start justify-start gap-2 list-none w-full m-0 p-0">
            <li
              onClick={handleProfileClick}
              className="w-full flex flex-row items-center justify-start  text-primaryColor cursor-pointer gap-2 group hover:bg-white rounded-md py-1 px-2"
            >
              <span className="text-2xl group-hover:text-primaryColor flex items-center justify-center">
                <PersonIcon fontSize="inherit" />
              </span>
              <span className="text-lg group-hover:text-primaryColor">
                My Profile
              </span>
            </li>
            <li
              onClick={handleChangePasswordClick}
              className="w-full flex flex-row items-center justify-start  text-primaryColor cursor-pointer gap-2 group hover:bg-white rounded-md py-1 px-2"
            >
              <span className="text-2xl group-hover:text-primaryColor flex items-center justify-center">
                <VpnKeyIcon fontSize="inherit" />
              </span>
              <span className="text-lg group-hover:text-primaryColor">
                Change Password
              </span>
            </li>
            <li
              onClick={handleLogout}
              className="w-full flex flex-row items-center justify-start  text-redColor cursor-pointer gap-2 bg-white rounded-md py-1 px-2"
            >
              <span className="text-2xl flex items-center justify-center">
                <PowerSettingsNewIcon fontSize="inherit" />
              </span>
              <span className="text-lg">Log Out</span>
            </li>
          </ul>
        </Box>
      )}
    </Box>
  );
}
