/*
 * Post image generator (DESIGN.md › Shapes).
 *
 * Deterministic from a seed (the slug): the same post always gets the same
 * composition. Shapes fill their cell or sit on a grid line. Colors step
 * through every accent in reading order from a seeded start, with a stride
 * coprime to the palette size, so all accents appear and neighbors differ.
 */

export type ShapeKind = "circle" | "square" | "triangle" | "semicircle" | "quarter";

export type Shape = {
  kind: ShapeKind;
  col: number;
  row: number;
  /** Quarter turns, 0–3. */
  turn: number;
  /** Index into the generator palette (--casey-gen-0 … --casey-gen-6). */
  color: number;
};

export const PALETTE_SIZE = 7;
const STRIDE = 3;
const EMPTY_CHANCE = 0.3;

const KINDS: [ShapeKind, number][] = [
  ["circle", 0.24],
  ["semicircle", 0.26],
  ["quarter", 0.26],
  ["triangle", 0.14],
  ["square", 0.1],
];

function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return h >>> 0;
}

function random(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickKind(r: number): ShapeKind {
  let acc = 0;
  for (const [kind, weight] of KINDS) if ((acc += weight) >= r) return kind;
  return "circle";
}

/** Which cells may hold a shape; the rest stay empty (for example, where a photo sits). */
export type CellMask = (col: number, row: number) => boolean;

export function generateComposition(seed: string, cols = 3, rows = 5, mask?: CellMask): Shape[] {
  const h = hash(seed);
  const rand = random(h);
  const start = h % PALETTE_SIZE;
  const cells: { col: number; row: number }[] = [];
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) if (!mask || mask(col, row)) cells.push({ col, row });

  // Keep at least one full pass of the palette so every accent shows; grids
  // with fewer cells than accents (the strip) fill every cell.
  const minimum = Math.min(PALETTE_SIZE, cells.length);
  const filled = cells.filter(() => rand() >= EMPTY_CHANCE);
  for (const cell of cells) if (filled.length < minimum && !filled.includes(cell)) filled.push(cell);
  filled.sort((a, b) => a.row - b.row || a.col - b.col);

  return filled.map((cell, i) => ({
    ...cell,
    kind: pickKind(rand()),
    turn: Math.floor(rand() * 4),
    color: (start + i * STRIDE) % PALETTE_SIZE,
  }));
}

/** Below 1200px the hero shows its own 5×1 strip from the same seed. */
export const STRIP = { cols: 5, rows: 1 } as const;
