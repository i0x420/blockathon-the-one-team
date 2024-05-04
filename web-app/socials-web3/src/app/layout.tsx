import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import GlobalHooks from "@/components/GlobalHooks";
import Providers from "@/components/Providers";
import TopLoader from "@/components/ui/TopLoader";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Super Social Web3",
  description: "Super Social Web3 to change the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TopLoader />
          <GlobalHooks />
          {children}
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
