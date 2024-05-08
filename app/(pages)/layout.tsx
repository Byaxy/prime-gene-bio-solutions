import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Prime Gene Biomedical Solutions App",
  description:
    "Inventory managemnet application for Prime Gene Biomedical Solutions",
};

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
