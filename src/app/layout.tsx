// use client

import type { Metadata } from "next";
import { montserrat } from "./nextFonts";


import "./normalize.css";
import "./webfonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casey Eickhoff - Senior Software Engineer",
  description:
    "Personal Portfolio for Casey Eickhoff as a Senior Frontend Software Engineer, specializing in React, TypeScript, Node.js, Design Systems and Accessibility Web Compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
          {children}
      </body>
    </html>
  );
}
