import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JATIN | Built With Discipline",
  description: "3 Years Natural. Built With Discipline. Premium personal fitness coaching by Jatin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black text-[#F5F5F5] selection:bg-[#cc2929]/40 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
