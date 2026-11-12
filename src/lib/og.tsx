import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { CELL, shapeElement } from "@/components/PostImage";
import { parseEmphasis } from "@/components/Headline";
import { site } from "@/content/site";
import { generateComposition } from "@/lib/post-image";

export const OG_SIZE = { width: 1200, height: 630 };

/*
 * Open Graph images render outside the page, so CSS variables can't resolve.
 * These are the light-mode values of the brand tokens (brand.css).
 */
const INK = "#112F2C"; // --wada-deep-slate-green
const GROUND = "#F8F4F0"; // --mix-blush (mixed, not Wada)
const STRESS = "#42533E"; // --casey-stress-top, light
const GEN = ["#D96629", "#C7D14F", "#E0B3B6", "#986F2D", "#709390", "#42533E", "#112F2C"]; // --casey-gen-0…6, light

const COLS = 3;
const ROWS = 5;
const PANEL = (OG_SIZE.height / ROWS) * COLS;

async function fonts() {
  const dir = join(process.cwd(), "src/assets/og-fonts");
  const [setup, stress, text] = await Promise.all(
    ["bricolage-200.ttf", "bricolage-800.ttf", "hanken-700.ttf"].map((f) => readFile(join(dir, f))),
  );
  return [
    { name: "Bricolage", data: setup, weight: 200 as const, style: "normal" as const },
    { name: "Bricolage", data: stress, weight: 800 as const, style: "normal" as const },
    { name: "Hanken", data: text, weight: 700 as const, style: "normal" as const },
  ];
}

function titleSize(plain: string) {
  if (plain.length <= 18) return 104;
  if (plain.length <= 34) return 84;
  if (plain.length <= 56) return 68;
  return 56;
}

/** Authored title as words, so Satori can wrap and weight each one. */
function Title({ text }: { text: string }) {
  const runs = parseEmphasis(text.replace(/\n/g, " "));
  const stressed = runs.some((r) => r.stress);
  const words = runs.flatMap((r) => r.text.split(/\s+/).filter(Boolean).map((w) => ({ w, stress: r.stress || !stressed })));
  const size = titleSize(words.map((x) => x.w).join(" "));
  return (
    <div style={{ display: "flex", flexWrap: "wrap", fontSize: size, lineHeight: 0.95, letterSpacing: "-0.02em" }}>
      {words.map(({ w, stress }, i) => (
        <span key={i} style={{ fontWeight: stress ? 800 : 200, color: stress ? STRESS : INK, marginRight: "0.22em" }}>
          {w}
        </span>
      ))}
    </div>
  );
}

function Shapes({ seed }: { seed: string }) {
  const shapes = generateComposition(seed, COLS, ROWS);
  const lines = [];
  for (let c = 1; c < COLS; c++) lines.push(<line key={`v${c}`} x1={c * CELL} y1={0} x2={c * CELL} y2={ROWS * CELL} />);
  for (let r = 1; r < ROWS; r++) lines.push(<line key={`h${r}`} x1={0} y1={r * CELL} x2={COLS * CELL} y2={r * CELL} />);
  return (
    <svg width={PANEL} height={OG_SIZE.height} viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}>
      {shapes.map((s) => shapeElement(s, GEN[s.color]))}
      <g stroke={INK} strokeWidth={0.8}>
        {lines}
      </g>
    </svg>
  );
}

type Card = { title: string; seed: string; meta?: string };

/** Share card: title on the ground, the seeded shape panel on the right. */
export async function ogImage({ title, seed, meta }: Card) {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: GROUND, color: INK, fontFamily: "Bricolage" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: OG_SIZE.width - PANEL,
            padding: "56px 64px",
            borderRight: `2px solid ${INK}`,
          }}
        >
          <div style={{ display: "flex", fontSize: 34, letterSpacing: "-0.01em" }}>
            <span style={{ fontWeight: 800 }}>{site.logo.word}</span>
            <span style={{ fontWeight: 200 }}>{site.logo.tld}</span>
          </div>
          <Title text={title} />
          <div style={{ display: "flex", fontFamily: "Hanken", fontWeight: 700, fontSize: 26 }}>{meta ?? site.author}</div>
        </div>
        <Shapes seed={seed} />
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
