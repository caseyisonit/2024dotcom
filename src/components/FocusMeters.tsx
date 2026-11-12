import type { FocusArea } from "@/lib/content";

/** Years by area of focus. Bar = duration (DESIGN.md › Shapes). */
export function FocusMeters({ items }: { items: { area: FocusArea; years: number }[] }) {
  const max = Math.max(...items.map((i) => i.years), 1);
  return (
    <ul className="focus-meters">
      {items.map(({ area, years }) => (
        <li key={area}>
          <swc-meter value={years} max-value={max} value-label={`${years} yrs`}>
            <span slot="label">{area}</span>
          </swc-meter>
        </li>
      ))}
    </ul>
  );
}
