import type { Metadata } from "next";
import "./globals.scss";

// components
import GlobalHooks from "@/components/GlobalHooks";
import Providers from "@/components/Providers";
import MainFooter from "@/components/layouts/MainFooter";
import MainHeader from "@/components/layouts/MainHeader";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import TopLoader from "@/components/ui/TopLoader";
import { Toaster } from "@/components/ui/Toaster";

import { Noto_Sans as NotoSans } from "next/font/google";

const notoSans = NotoSans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

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
      <body className={notoSans.className}>
        <Providers>
          <TopLoader />
          <GlobalHooks />
          <MainHeader />
          <main className="mt-header min-h-screen">{children}</main>
          <MainFooter />
          <Toaster limit={5} />
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
