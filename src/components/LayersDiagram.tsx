/** The three layers: each contains the one before it, small to big. */
export function LayersDiagram() {
  const layers = [
    { name: "Design language", tokens: "core tokens", depth: 1 },
    { name: "Platform", tokens: "semantic tokens", depth: 2 },
    { name: "Implementation", tokens: "component tokens", depth: 3 },
  ];
  return (
    <figure className="layers-diagram">
      {layers.map((l) => (
        <div key={l.name} className="layers-cell">
          <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            {l.depth >= 3 && <rect x="0" y="0" width="120" height="120" fill="var(--casey-ink)" />}
            {l.depth >= 2 && <rect x="20" y="20" width="80" height="80" fill="var(--wada-artemisia-green)" />}
            <circle cx="60" cy="60" r="20" fill="var(--casey-data)" />
          </svg>
          <figcaption>
            <strong>{l.name}</strong>
            <code>{l.tokens}</code>
          </figcaption>
        </div>
      ))}
    </figure>
  );
}
