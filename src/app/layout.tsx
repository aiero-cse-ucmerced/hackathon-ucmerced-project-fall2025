import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
<<<<<<< HEAD
import ThemeProvider from "../components/ThemeProvider";
=======
>>>>>>> 9211fb8010dcb4a5f302f5118b16a6575d505d3c

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

<<<<<<< HEAD
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Intelligent Flashcards",
  description: "Learn with intelligent flashcards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
=======

interface Props {
  children?: React.ReactNode;
  centerChildren?: boolean;
}

export default function Layout(props?: Props) {
  return (
    <html lang="en">
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
>>>>>>> 9211fb8010dcb4a5f302f5118b16a6575d505d3c
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
<<<<<<< HEAD
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  var html = document.documentElement;
                  if (theme === 'system') {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    html.classList.add(prefersDark ? 'dark' : 'light');
                  } else {
                    html.classList.add(theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
=======
        {props?.children}
>>>>>>> 9211fb8010dcb4a5f302f5118b16a6575d505d3c
      </body>
    </html>
  );
}
