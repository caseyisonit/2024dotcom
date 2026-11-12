import Link from "next/link";

import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="logo" aria-label={`${site.logo.word}${site.logo.tld}, home`}>
        <span className="logo-word">{site.logo.word}</span>
        <span className="logo-tld">{site.logo.tld}</span>
      </Link>
      <nav aria-label="Primary" className="site-nav">
        <ul className="links">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="swc-Link swc-Link--quiet">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="site-actions">
        <ThemeToggle />
        <MobileMenu />
      </div>
    </header>
  );
}
