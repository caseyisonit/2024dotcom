import { Headline } from "@/components/Headline";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer field">
      <Headline as="p" text={site.footer.statement} position="end" className="statement" />
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
