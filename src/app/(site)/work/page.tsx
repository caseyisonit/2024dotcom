import type { Metadata } from "next";

import { FocusMeters } from "@/components/FocusMeters";
import { Headline } from "@/components/Headline";
import { site } from "@/content/site";
import { formatTenure, getCurrentRole, getRoles, getYearsByFocus, getYearsWorking, tenureYears, type Role } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };

const yearOf = (iso: string) => iso.slice(0, 4);

function RoleDates({ role }: { role: Role }) {
  const start = <time dateTime={role.start}>{yearOf(role.start)}</time>;
  if (!role.end) return <>{start} – Now</>;
  if (yearOf(role.end) === yearOf(role.start)) return start;
  return (
    <>
      {start} – <time dateTime={role.end}>{yearOf(role.end)}</time>
    </>
  );
}

export default async function WorkPage() {
  const [roles, focus, years, current] = await Promise.all([getRoles(), getYearsByFocus(), getYearsWorking(), getCurrentRole()]);
  const linkedIn = site.social.find((s) => s.label === "LinkedIn");
  const maxMonths = Math.max(...roles.map((r) => Math.round(tenureYears(r) * 12)), 1);

  return (
    <>
      <section className="section hero hero--stacked grid" aria-labelledby="work-title">
        <div className="cell hero-text hero-text--full">
          <Headline id="work-title" text={site.work.hero.replace("{years}", String(years))} className="work-title" />
          <p className="dek">{site.work.dek}</p>
        </div>
        <div className="hero-panels">
          {current && (
            <div className="cell panel">
              <p className="eyebrow">Currently</p>
              <p className="panel-strong">
                {current.role} at {current.company}
              </p>
            </div>
          )}
          <div className="cell panel">
            {linkedIn && (
              <a href={linkedIn.href} className="swc-Link swc-Link--quiet panel-strong" rel="me noopener" target="_blank">
                LinkedIn
                <swc-icon-chevron-right size="s"></swc-icon-chevron-right>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            )}
            <p className="meta">
              {site.home.location.place} · {site.home.location.status.toLowerCase()}
            </p>
          </div>
        </div>
      </section>

      <section className="work field" aria-labelledby="focus-title">
        <div className="grid">
          <div className="cell meters-cell">
            <h2 id="focus-title" className="eyebrow">
              Years by area of focus
            </h2>
            <FocusMeters items={focus} />
          </div>
        </div>
      </section>

      <section className="section roles" aria-labelledby="roles-title">
        <header className="section-header grid">
          <div className="cell section-header-title">
            <h2 id="roles-title" className="headline headline--heading section-title structure">
              Roles
            </h2>
          </div>
          <div className="cell section-header-aside">
            <p className="meta legend">
              <span className="legend-bar" aria-hidden="true" /> = tenure
            </p>
          </div>
        </header>
        <ol className="role-list">
          {roles.map((r) => {
            const tenure = tenureYears(r);
            return (
              <li key={`${r.company}-${r.start}`} className="role-row grid">
                <div className="cell role-dates">
                  <p className="meta">
                    <RoleDates role={r} />
                  </p>
                  <swc-meter
                    className="tenure"
                    value={Math.max(1, Math.round(tenure * 12))}
                    max-value={maxMonths}
                    value-label={formatTenure(tenure)}
                    accessible-label="Tenure"
                  ></swc-meter>
                </div>
                <div className="cell role-name">
                  <h3 className="headline headline--heading role-title">{r.role}</h3>
                  <p className="meta">
                    {r.company} · {r.location}
                  </p>
                </div>
                <ul className="cell role-highlights">
                  {r.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                {r.focusAreas.length > 0 && (
                  <div className="cell role-focus">
                    <p className="eyebrow">Focus</p>
                    <ul>
                      {r.focusAreas.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
