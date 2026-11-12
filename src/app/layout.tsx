import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "@adobe/spectrum-wc/swc.css";
import "@adobe/spectrum-wc/typography.css";
import "@/styles/brand/brand.css";
import "./globals.css";

import { SwcRegistry } from "@/swc/registry";
import { fontVariables } from "@/styles/fonts";

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
    <html lang="en" className={`swc-theme--adaptive ${fontVariables}`}>
      <body>
        <SwcRegistry />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
