// Inline SVG product bottle illustration.
// Replaces image files — crisp at any size, zero network cost.
interface ProductBottleProps {
  name: string;
  category: string;
  accentColor: string;
  className?: string;
}

export function ProductBottle({ name, category, accentColor, className = "" }: ProductBottleProps) {
  const id = name.replace(/\s+/g, "-").toLowerCase();
  const darkAccent = "rgba(0,0,0,0.55)";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 400"
      className={className}
      aria-label={`${name} bottle`}
      role="img"
    >
      <defs>
        <radialGradient id={`bg-${id}`} cx="50%" cy="22%" r="78%">
          <stop offset="0%"   stopColor="#161a18" />
          <stop offset="60%"  stopColor="#0f1211" />
          <stop offset="100%" stopColor="#070908" />
        </radialGradient>
        <linearGradient id={`bottle-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={accentColor} stopOpacity="0.9" />
          <stop offset="50%"  stopColor="#1C1410"     stopOpacity="0.92" />
          <stop offset="100%" stopColor="#0B1A0B"     stopOpacity="0.97" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="50%" cy="85%" r="55%">
          <stop offset="0%"   stopColor={accentColor} stopOpacity="0.45" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`sheen-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
          <stop offset="40%"  stopColor="rgba(255,255,255,0.06)" />
          <stop offset="50%"  stopColor="rgba(255,255,255,0.14)" />
          <stop offset="60%"  stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <clipPath id={`bottle-clip-${id}`}>
          <rect x="88" y="110" width="124" height="230" rx="22" />
        </clipPath>
      </defs>

      {/* Background */}
      <rect width="300" height="400" fill={`url(#bg-${id})`} />

      {/* Glow beneath bottle */}
      <ellipse cx="150" cy="350" rx="110" ry="50" fill={`url(#glow-${id})`} />

      {/* Bottle cap */}
      <rect x="112" y="78"  width="76" height="16" rx="5"  fill="#1C1410" />
      <rect x="122" y="66"  width="56" height="20" rx="4"  fill={darkAccent} />
      <rect x="122" y="66"  width="56" height="20" rx="4"  fill={accentColor} fillOpacity="0.15" />

      {/* Bottle body */}
      <rect x="88" y="108" width="124" height="232" rx="22" fill={`url(#bottle-${id})`} />

      {/* Glass sheen */}
      <rect x="88" y="108" width="124" height="232" rx="22" fill={`url(#sheen-${id})`} clipPath={`url(#bottle-clip-${id})`} />

      {/* Bottle border */}
      <rect x="88" y="108" width="124" height="232" rx="22" fill="none"
        stroke={accentColor} strokeOpacity="0.3" strokeWidth="1" />

      {/* Label panel */}
      <rect x="102" y="158" width="96" height="126" rx="10"
        fill="#0B1A0B" fillOpacity="0.6"
        stroke={accentColor} strokeOpacity="0.4" />

      {/* V monogram */}
      <text x="150" y="204" fontFamily="Georgia, serif" fontStyle="italic"
        fontSize="40" fill="#F5F0E6" textAnchor="middle" opacity="0.95">V</text>

      {/* Label divider */}
      <line x1="116" y1="218" x2="184" y2="218"
        stroke={accentColor} strokeOpacity="0.4" strokeWidth="0.8" />

      {/* Product name — first word */}
      <text x="150" y="238" fontFamily="Georgia, serif" fontStyle="italic"
        fontSize="11.5" fill="#F5F0E6" textAnchor="middle" opacity="0.9">
        {name.split(" ").slice(0, 2).join(" ")}
      </text>
      {name.split(" ").length > 2 && (
        <text x="150" y="252" fontFamily="Georgia, serif" fontStyle="italic"
          fontSize="11.5" fill="#F5F0E6" textAnchor="middle" opacity="0.9">
          {name.split(" ").slice(2).join(" ")}
        </text>
      )}

      {/* Category */}
      <text x="150" y="270" fontFamily="Arial, sans-serif"
        fontSize="7.5" letterSpacing="2.5" fill={accentColor} textAnchor="middle" opacity="0.8">
        {category.toUpperCase()}
      </text>

      {/* Ambient spore dots */}
      <circle cx="62"  cy="130" r="3"   fill={accentColor} opacity="0.4" />
      <circle cx="248" cy="175" r="4"   fill={accentColor} opacity="0.35" />
      <circle cx="230" cy="100" r="2.5" fill="#F5F0E6"     opacity="0.3" />
      <circle cx="72"  cy="250" r="2"   fill="#F5F0E6"     opacity="0.25" />
    </svg>
  );
}
