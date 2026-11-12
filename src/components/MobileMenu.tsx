import Link from "next/link";

import type { SiteLink } from "@/content/site";

/**
 * Mobile navigation: an icon button that opens a popover of links.
 * Links, not a menu: `swc-menu` is for actions (menu-button pattern).
 */
export function MobileMenu({ nav }: { nav: SiteLink[] }) {
  return (
    <div className="mobile-menu">
      <swc-action-button id="menu-trigger" quiet accessible-label="Menu">
        <swc-icon-menu-hamburger slot="icon"></swc-icon-menu-hamburger>
      </swc-action-button>
      <swc-popover
        for="menu-trigger"
        placement="bottom-end"
        accessible-label="Site navigation"
        hide-arrow
      >
        <nav aria-label="Primary">
          <ul className="menu-links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </swc-popover>
    </div>
  );
}
