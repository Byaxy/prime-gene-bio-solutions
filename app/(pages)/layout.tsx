"use client";

import "../globals.css";
import appwriteService from "@/appwrite/appwriteConfig";
import { AuthProvider } from "@/context/authContext";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/utils/theme";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Loading from "./Loading";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authStatus, setAuthStatus] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    appwriteService
      .isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setLoader(false));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider value={{ authStatus, setAuthStatus }}>
          <Toaster />
          {loader ? <Loading /> : <main>{children}</main>}
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
