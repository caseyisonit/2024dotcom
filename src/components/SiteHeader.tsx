import Link from "next/link";

import { MobileMenu } from "@/components/MobileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/content/site";
import { hasWriting } from "@/lib/content";

export async function SiteHeader() {
  const writing = await hasWriting();
  const nav = site.nav.filter((item) => writing || item.href !== "/writing");
  return (
    <header className="site-header">
      <Link
        href="/"
        className="logo"
        aria-label={`${site.logo.word}${site.logo.tld}, home`}
      >
        <span className="logo-word">{site.logo.word}</span>
        <span className="logo-tld">{site.logo.tld}</span>
      </Link>
      <div className="site-actions">
        <nav aria-label="Primary" className="site-nav">
          <ul className="links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="swc-Link swc-Link--quiet">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
        <MobileMenu nav={nav} />
      </div>
    </header>
  );
}
