import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useRouter } from "next/navigation";
import appwriteService from "@/appwrite/appwriteConfig";
import useAuth from "@/context/useAuth";
import toast from "react-hot-toast";
import CurrentUser from "./CurrentUser";

export default function Header() {
  const router = useRouter();
  const { setAuthStatus } = useAuth();

  const [show, setShow] = useState(false);

  const userId = 1;

  const handleShow = () => {
    setShow((prev) => !prev);
  };
  const handleLogout = async () => {
    await appwriteService.logout().then(() => {
      setAuthStatus(false);
      setShow(false);
      router.replace("/login");
      toast.success("Logout Successful");
    });
    handleShow();
  };
  const handleProfileClick = () => {
    handleShow();
    router.push(`/profile/${userId}`);
  };
  const handleChangePasswordClick = () => {
    handleShow();
    router.push(`/profile/${userId}`);
  };

  return (
    <>
      <CurrentUser />
    </>
  );
}
