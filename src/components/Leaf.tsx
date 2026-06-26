/** A single botanical leaf (derived from leaf-shapes.svg), tinted by depth. */
export function Leaf({
  className,
  fill = "#2d5a27",
  size = 64,
}: {
  className?: string;
  fill?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 2}
      viewBox="0 0 60 120"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30 118 Q6 74 14 36 Q20 12 30 4 Q40 12 46 36 Q54 74 30 118 Z"
        fill={fill}
      />
      <line x1="30" y1="116" x2="30" y2="10" stroke="#1e3d1a" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}
