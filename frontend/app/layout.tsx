import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { Toaster } from 'react-hot-toast';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eathar AI",
  description: "Created by Vicky with Love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right"/>
        <div className="grid grid-cols-8 items-start justify-start bg-black font-sans dark:bg-black">
          <div className="col-span-1 bg-black h-screen ">
            <Sidebar />
          </div>
          <div className="col-span-7 w-full flex-col px-5 py-8 bg-black">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
