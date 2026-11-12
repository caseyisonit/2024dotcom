import { FooterStatement } from "@/components/FooterStatement";
import { site } from "@/content/site";
import { hasWriting } from "@/lib/content";

/** `lead` replaces the rotating statement (posts put Next post there); the links always stay. */
export async function SiteFooter({ lead }: { lead?: React.ReactNode }) {
  const writing = await hasWriting();
  const links = site.social.filter(
    (item) => writing || item.href !== "/rss.xml",
  );
  return (
    <footer className="site-footer field">
      {lead ?? <FooterStatement />}
      <ul className="links">
        {links.map((item) => {
          const external = item.href.startsWith("http");
          return (
            <li key={item.href}>
              <a
                href={item.href}
                className="swc-Link swc-Link--quiet"
                {...(external ? { rel: "me noopener", target: "_blank" } : {})}
              >
                {item.label}
                {external && (
                  <span className="visually-hidden"> (opens in a new tab)</span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
}
