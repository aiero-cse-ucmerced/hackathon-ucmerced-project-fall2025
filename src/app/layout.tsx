import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import ThemeProvider from "../components/ThemeProvider";

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
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Intelligent Flashcards",
  description: "Learn with intelligent flashcards",
};

interface Props {
  includeHeader?: boolean;
  children?: React.ReactNode;
}

export default function Layout(props?: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
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
          {props?.includeHeader && <Header />}
          <main>{props?.children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
