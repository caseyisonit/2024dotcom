import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "@adobe/spectrum-wc/swc.css";
import "@adobe/spectrum-wc/typography.css";
import "@adobe/spectrum-wc/link.css";
import "@/styles/brand/brand.css";
import "./globals.css";
import "@/styles/site.css";

import { SiteHeader } from "@/components/SiteHeader";
import { themeBootScript } from "@/components/ThemeToggle";
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
    // The boot script may swap the theme class before hydration.
    <html lang="en" className={`swc-theme--adaptive ${fontVariables}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SwcRegistry />
        <SiteHeader />
        {/* Route groups own <main> and the footer: (site) rotates the footer statement, (post) puts Next post there. */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
