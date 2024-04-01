import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/headers/Header";
import Providers from "@/components/Providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Amazona v2 ",
  description: "Modern Ecommerce Website",
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
        <div className="min-h-screen flex flex-col">
          <Header/>
        {children}
        <footer className="footer footer-center p-4 bg-base-300  text-base-content">
          <p>Copyright @ 2023 -All right reserved by Next Amazon V2</p>
        </footer>
        </div>
        </Providers>
      </body>
    </html>
  );
}
