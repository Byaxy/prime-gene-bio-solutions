import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "@/utils/providers";

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Prime Gene Biomedical Solutions Invoicing and Inventory System",
  description:
    "The Prime Gene Biomedical Solutions Invoicing and Inventory System is a comprehensive software solution designed to streamline the financial and inventory management processes for Prime Gene Biomedical Solutions. This system provides efficient invoicing, tracking of sales and purchases, and real-time inventory monitoring, enabling businesses to optimize their operations and improve overall productivity.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
