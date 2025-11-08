import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


interface Props {
  includeHeader?: boolean;
  children?: React.ReactNode;
  centerChildren?: boolean;
}

export default function Layout(props?: Props) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {props?.includeHeader && <Header />}
        <main className={`${props?.centerChildren ? "flex justify-center" : ""}`}>{props?.children}</main>
      </body>
    </html>
  );
}
