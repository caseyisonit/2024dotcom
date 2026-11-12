import Image from "next/image";

import fun from "@/assets/about/about-fun.jpg";
import pro from "@/assets/about/about-pro.jpg";
import {
  generateComposition,
  type CellMask,
  type Shape,
} from "@/lib/post-image";

import { CELL, shapeElement } from "./PostImage";

const SEED = "about";

/*
 * From 768px: cells of 64px. The band is an L across the top two rows and
 * down the right of the 320 × 512 photo. The block is as wide as its column
 * allows, so the right band shows more or fewer columns. Columns 0–6 are the
 * approved Figma composition; columns 7+ come from their own seed.
 */
const L = { cols: 12, designed: 7, rows: 10, cell: 64 };
const inL: CellMask = (col, row) => row < 2 || col >= 5;

/*
 * Smaller screens: 8 rows of 56px beside the photo. The column touching the
 * photo matches the 390px design (a 7-column grid masked to its outer
 * columns); wider screens reveal extra columns from their own seeds.
 */
const SIDE = { cols: 7, rows: 8, cell: 56 };

const fill = (s: Shape) => `var(--casey-gen-${s.color})`;

function sharedEdges(cols: number, rows: number, mask: CellMask) {
  const lines = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!mask(col, row)) continue;
      const x = (col + 1) * CELL;
      const y = (row + 1) * CELL;
      if (col + 1 < cols && mask(col + 1, row))
        lines.push(
          <line key={`v${col}-${row}`} x1={x} y1={row * CELL} x2={x} y2={y} />,
        );
      if (row + 1 < rows && mask(col, row + 1))
        lines.push(
          <line key={`h${col}-${row}`} x1={col * CELL} y1={y} x2={x} y2={y} />,
        );
    }
  }
  return <g className="post-image-grid">{lines}</g>;
}

function sideBand(side: "start" | "end") {
  const inner = generateComposition(
    SEED,
    SIDE.cols,
    SIDE.rows,
    (col) => col === 0 || col === SIDE.cols - 1,
  )
    .filter((s) => (side === "start" ? s.col === 0 : s.col === SIDE.cols - 1))
    .map((s) => ({ ...s, col: side === "start" ? SIDE.cols - 1 : 0 }));
  const outer = generateComposition(
    `${SEED}:${side}`,
    SIDE.cols - 1,
    SIDE.rows,
  ).map((s) => ({
    ...s,
    col: side === "start" ? s.col : s.col + 1,
  }));
  const all = () => true;
  return (
    <swc-asset decorative className={`portrait-band portrait-band--${side}`}>
      {/* Pixel size sets swc-asset's intrinsic size; the band then shrinks to its cell. */}
      <svg
        width={SIDE.cols * SIDE.cell}
        height={SIDE.rows * SIDE.cell}
        viewBox={`0 0 ${SIDE.cols * CELL} ${SIDE.rows * CELL}`}
        preserveAspectRatio={
          side === "start" ? "xMaxYMin slice" : "xMinYMin slice"
        }
        aria-hidden="true"
        focusable="false"
      >
        {[...inner, ...outer].map((s) => shapeElement(s, fill(s)))}
        {sharedEdges(SIDE.cols, SIDE.rows, all)}
      </svg>
    </swc-asset>
  );
}

/** About portrait: the photo framed by generated shapes. Hover swaps in the fun photo. */
export function AboutPortrait() {
  const designed = generateComposition(SEED, L.designed, L.rows, inL);
  const extra = generateComposition(
    `${SEED}:wide`,
    L.cols - L.designed,
    L.rows,
  ).map((s) => ({ ...s, col: s.col + L.designed }));
  const shapes = [...designed, ...extra];
  return (
    <div className="portrait">
      <swc-asset decorative className="portrait-band portrait-band--l">
        <svg
          width={L.cols * L.cell}
          height={L.rows * L.cell}
          viewBox={`0 0 ${L.cols * CELL} ${L.rows * CELL}`}
          preserveAspectRatio="xMinYMin slice"
          aria-hidden="true"
          focusable="false"
        >
          {shapes.map((s) => shapeElement(s, fill(s)))}
          {sharedEdges(L.cols, L.rows, inL)}
        </svg>
      </swc-asset>
      {sideBand("start")}
      <div className="portrait-photo">
        <Image
          src={pro}
          alt="Casey Eickhoff smiling in front of leafy plants, wearing a dark jacket and a patterned silk scarf."
          sizes="(min-width: 768px) 320px, 278px"
          placeholder="blur"
          priority
        />
        <Image
          src={fun}
          alt=""
          aria-hidden="true"
          className="portrait-fun"
          sizes="(min-width: 768px) 320px, 278px"
        />
      </div>
      {sideBand("end")}
    </div>
  );
}
