// components/icons.tsx
// Forest-themed custom SVG icons. 24x24, stroke-based.
// Default stroke uses currentColor so callers control via text-* classes.
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 19c0-8 6-13 14-13 0 8-6 13-14 13Z" />
      <path d="M5 19c3-5 6-8 10-10" />
    </svg>
  );
}

export function Tree(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 6 11h3l-3 4h12l-3-4h3L12 3Z" />
      <path d="M12 15v6" />
    </svg>
  );
}

export function MossCluster(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="13" r="4" />
      <circle cx="15" cy="11" r="4" />
      <circle cx="13" cy="16" r="3" />
    </svg>
  );
}

export function Acorn(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9a6 6 0 0 1 12 0Z" />
      <path d="M7 9a5 6 0 0 0 10 0" />
      <path d="M12 21v-3" />
    </svg>
  );
}

export function Owl(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="10" r="3" />
      <circle cx="15" cy="10" r="3" />
      <path d="m12 12 1.5 2h-3L12 12Z" />
      <path d="M5 7c1-2 3-3 7-3s6 1 7 3" />
    </svg>
  );
}

export function Deer(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3 5 7M7 3l2 2M17 3l2 4M17 3l-2 2" />
      <path d="M9 9c0 4 1 6 3 6s3-2 3-6" />
      <path d="M10 19h4" />
      <path d="M12 15v4" />
    </svg>
  );
}

export function Spore(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
