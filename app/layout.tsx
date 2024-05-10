"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/utils/theme";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
