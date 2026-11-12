import type { ElementType, ReactNode } from "react";

export type HeadlineRole = "display" | "heading";
export type HeadlinePosition = "top" | "end";

type Props = {
  /** Authored string: `**…**` is stress, `\n` is a line break. */
  text: string;
  as?: ElementType;
  role?: HeadlineRole;
  /** Display only: which stress color to use. */
  position?: HeadlinePosition;
  className?: string;
  id?: string;
};

const NBSP = "\u00A0";

/** "on it" is one unit and never breaks. */
function keepTogether(s: string) {
  return s.replace(/\bon it\b/g, `on${NBSP}it`);
}

export function parseEmphasis(text: string) {
  const runs: { text: string; stress: boolean }[] = [];
  let last = 0;
  for (const m of text.matchAll(/\*\*([\s\S]+?)\*\*/g)) {
    if (m.index > last)
      runs.push({ text: text.slice(last, m.index), stress: false });
    runs.push({ text: m[1], stress: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) runs.push({ text: text.slice(last), stress: false });
  return runs;
}

function withBreaks(s: string, key: string): ReactNode[] {
  return s
    .split("\n")
    .flatMap((part, i) =>
      i === 0 ? [part] : [<br key={`${key}-${i}`} />, part],
    );
}

export function Headline({
  text,
  as: Tag = "h1",
  role = "display",
  position = "top",
  className,
  id,
}: Props) {
  const runs = parseEmphasis(keepTogether(text));
  const stressed = runs.some((r) => r.stress);
  const classes = [
    "headline",
    `headline--${role}`,
    role === "display" && `headline--${position}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // No authored stress means the whole headline is the payoff.
  const content = stressed ? (
    runs.map((r, i) =>
      r.stress ? (
        <strong key={i}>{withBreaks(r.text, `s${i}`)}</strong>
      ) : (
        withBreaks(r.text, `t${i}`)
      ),
    )
  ) : (
    <strong>{withBreaks(runs.map((r) => r.text).join(""), "all")}</strong>
  );

  return (
    <Tag className={classes} id={id}>
      {content}
    </Tag>
  );
}
