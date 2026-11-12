import { STRIP, generateComposition, type Shape } from "@/lib/post-image";

export const CELL = 100;

/** One shape in its cell. `fill` is a CSS color: a token on the site, hex in OG images. */
export function shapeElement(s: Shape, fill: string) {
  const x = s.col * CELL;
  const y = s.row * CELL;
  const c = CELL / 2;
  const body = (() => {
    switch (s.kind) {
      case "circle":
        return <circle cx={x + c} cy={y + c} r={c} />;
      case "square":
        return <rect x={x} y={y} width={CELL} height={CELL} />;
      case "triangle":
        return (
          <polygon points={`${x},${y} ${x + CELL},${y} ${x},${y + CELL}`} />
        );
      case "semicircle":
        // Flat side on the cell's left edge, bulging into the cell.
        return <path d={`M${x},${y} A${c},${c} 0 0 1 ${x},${y + CELL} Z`} />;
      case "quarter":
        // Anchored in the top-left corner, radius = cell.
        return (
          <path
            d={`M${x},${y} L${x + CELL},${y} A${CELL},${CELL} 0 0 1 ${x},${y + CELL} Z`}
          />
        );
    }
  })();
  return (
    <g
      key={`${s.col}-${s.row}`}
      transform={`rotate(${s.turn * 90} ${x + c} ${y + c})`}
      fill={fill}
    >
      {body}
    </g>
  );
}

const shapePath = (s: Shape) => shapeElement(s, `var(--casey-gen-${s.color})`);

function gridLines(cols: number, rows: number, top: number) {
  const lines = [];
  for (let c = 1; c < cols; c++)
    lines.push(
      <line
        key={`v${c}`}
        x1={c * CELL}
        y1={top}
        x2={c * CELL}
        y2={top + rows * CELL}
      />,
    );
  for (let r = 1; r < rows; r++)
    lines.push(
      <line
        key={`h${r}`}
        x1={0}
        y1={top + r * CELL}
        x2={cols * CELL}
        y2={top + r * CELL}
      />,
    );
  return <g className="post-image-grid">{lines}</g>;
}

type Props = { seed: string; cols?: number; rows?: number; className?: string };

/** Full composition plus the 5×1 strip for smaller screens. Decorative. */
export function PostImage({ seed, cols = 3, rows = 5, className }: Props) {
  const shapes = generateComposition(seed, cols, rows);
  const strip = generateComposition(seed, STRIP.cols, STRIP.rows);

  const classes = (variant: string) =>
    ["post-image", `post-image--${variant}`, className]
      .filter(Boolean)
      .join(" ");

  // swc-asset takes a single <svg>, so the full image and the strip are two assets.
  return (
    <>
      <swc-asset decorative className={classes("full")}>
        <svg
          viewBox={`0 0 ${cols * CELL} ${rows * CELL}`}
          aria-hidden="true"
          focusable="false"
        >
          {shapes.map(shapePath)}
          {gridLines(cols, rows, 0)}
        </svg>
      </swc-asset>
      <swc-asset decorative className={classes("strip")}>
        <svg
          viewBox={`0 0 ${STRIP.cols * CELL} ${STRIP.rows * CELL}`}
          aria-hidden="true"
          focusable="false"
        >
          {strip.map(shapePath)}
          {gridLines(STRIP.cols, STRIP.rows, 0)}
        </svg>
      </swc-asset>
    </>
  );
}
