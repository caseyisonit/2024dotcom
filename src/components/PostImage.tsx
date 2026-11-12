import { densestRow, generateComposition, type Shape } from "@/lib/post-image";

const CELL = 100;

function shapePath(s: Shape) {
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
        return <polygon points={`${x},${y} ${x + CELL},${y} ${x},${y + CELL}`} />;
      case "semicircle":
        // Flat side on the cell's left edge, bulging into the cell.
        return <path d={`M${x},${y} A${c},${c} 0 0 1 ${x},${y + CELL} Z`} />;
      case "quarter":
        // Anchored in the top-left corner, radius = cell.
        return <path d={`M${x},${y} L${x + CELL},${y} A${CELL},${CELL} 0 0 1 ${x},${y + CELL} Z`} />;
    }
  })();
  return (
    <g key={`${s.col}-${s.row}`} transform={`rotate(${s.turn * 90} ${x + c} ${y + c})`} fill={`var(--casey-gen-${s.color})`}>
      {body}
    </g>
  );
}

function gridLines(cols: number, rows: number, top: number) {
  const lines = [];
  for (let c = 1; c < cols; c++) lines.push(<line key={`v${c}`} x1={c * CELL} y1={top} x2={c * CELL} y2={top + rows * CELL} />);
  for (let r = 1; r < rows; r++) lines.push(<line key={`h${r}`} x1={0} y1={top + r * CELL} x2={cols * CELL} y2={top + r * CELL} />);
  return (
<g className="post-image-grid">{lines}</g>
  );
}

type Props = { seed: string; cols?: number; rows?: number; className?: string };

/** Full composition plus the mobile strip (densest row). Decorative. */
export function PostImage({ seed, cols = 3, rows = 5, className }: Props) {
  const shapes = generateComposition(seed, cols, rows);
  const strip = densestRow(shapes, rows);

  const classes = (variant: string) => ["post-image", `post-image--${variant}`, className].filter(Boolean).join(" ");

  // swc-asset takes a single <svg>, so the full image and the strip are two assets.
  return (
    <>
      <swc-asset decorative className={classes("full")}>
        <svg viewBox={`0 0 ${cols * CELL} ${rows * CELL}`} aria-hidden="true" focusable="false">
          {shapes.map(shapePath)}
          {gridLines(cols, rows, 0)}
        </svg>
      </swc-asset>
      <swc-asset decorative className={classes("strip")}>
        <svg viewBox={`0 ${strip * CELL} ${cols * CELL} ${CELL}`} aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={`strip-${seed}`}>
              <rect x={0} y={strip * CELL} width={cols * CELL} height={CELL} />
            </clipPath>
          </defs>
          <g clipPath={`url(#strip-${seed})`}>
            {shapes.filter((s) => s.row === strip).map(shapePath)}
            <g className="post-image-grid">
              {Array.from({ length: cols - 1 }, (_, i) => (
                <line key={i} x1={(i + 1) * CELL} y1={strip * CELL} x2={(i + 1) * CELL} y2={(strip + 1) * CELL} />
              ))}
            </g>
          </g>
        </svg>
      </swc-asset>
    </>
  );
}
