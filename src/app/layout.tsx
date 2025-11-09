'use client';

import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import { useEffect, useState } from "react";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify the weights you need
  variable: "--font-poppins",
});

export const ThemeContext = React.createContext<{
  theme: string;
  setTheme: (theme: string) => void;
}>({
  theme: 'light',
  setTheme: () => {},
});

interface Props {
  includeHeader?: boolean;
  children?: React.ReactNode;
}

export default function Layout(props?: Props) {
  const [theme, setTheme] = useState("light"); // Default theme
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  const applyTheme = (selectedTheme: string) => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(selectedTheme);
    
    if (selectedTheme === 'dark') {
      html.style.backgroundColor = '#1f2937';
      html.style.color = '#f3f4f6';
    } else if (selectedTheme === 'light') {
      html.style.backgroundColor = '#ffffff';
      html.style.color = '#111827';
    } else if (selectedTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark');
        html.style.backgroundColor = '#1f2937';
        html.style.color = '#f3f4f6';
      } else {
        html.classList.add('light');
        html.style.backgroundColor = '#ffffff';
        html.style.color = '#111827';
      }
    }
  };

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      <html lang="en" className={theme}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
        >
          {props?.includeHeader && <Header />}
          <main>{props?.children}</main>
        </body>
      </html>
    </ThemeContext.Provider>
  );
}
