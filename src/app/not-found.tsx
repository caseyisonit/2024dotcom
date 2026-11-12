import Link from "next/link";

import { Headline } from "@/components/Headline";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <main id="main" tabIndex={-1}>
        <section className="section hero grid" aria-labelledby="not-found-title">
          <div className="cell hero-text hero-text--full">
            <Headline id="not-found-title" text="Page not **found.**" className="work-title" />
            <p className="dek">
              <Link href="/" className="swc-Link">
                Go to the home page
              </Link>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
