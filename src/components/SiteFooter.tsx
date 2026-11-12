import { FooterStatement } from "@/components/FooterStatement";
import { site } from "@/content/site";

/** `lead` replaces the rotating statement (posts put Next post there); the links always stay. */
export function SiteFooter({ lead }: { lead?: React.ReactNode }) {
  return (
    <footer className="site-footer field">
      {lead ?? <FooterStatement />}
      <ul className="links">
        {site.social.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <li key={item.href}>
              <a
                href={item.href}
                className="swc-Link swc-Link--quiet"
                {...(external ? { rel: "me noopener", target: "_blank" } : {})}
              >
                {item.label}
                {external && <span className="visually-hidden"> (opens in a new tab)</span>}
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
