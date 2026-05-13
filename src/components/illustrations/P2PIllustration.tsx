export default function P2PIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left person */}
      <circle cx="30" cy="40" r="12" fill="#059669" opacity="0.1" />
      <circle cx="30" cy="36" r="6" fill="#059669" opacity="0.3" />
      <path
        d="M20 48 Q30 55 40 48"
        stroke="#059669"
        strokeWidth="1.5"
        opacity="0.3"
        fill="none"
      />
      {/* Right person */}
      <circle cx="90" cy="40" r="12" fill="#059669" opacity="0.1" />
      <circle cx="90" cy="36" r="6" fill="#059669" opacity="0.3" />
      <path
        d="M80 48 Q90 55 100 48"
        stroke="#059669"
        strokeWidth="1.5"
        opacity="0.3"
        fill="none"
      />
      {/* Connection line */}
      <line
        x1="42"
        y1="40"
        x2="78"
        y2="40"
        stroke="#059669"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.4"
      />
      {/* Center money bubble */}
      <circle
        cx="60"
        cy="40"
        r="10"
        fill="#d97706"
        opacity="0.08"
        stroke="#d97706"
        strokeWidth="1"
        opacity="0.2"
      />
      <text x="55" y="44" fontSize="10" fontWeight="600" fill="#d97706">
        ₦
      </text>
      {/* Arrows flowing */}
      <path
        d="M45 36 L52 36"
        stroke="#059669"
        strokeWidth="1.5"
        markerEnd="url(#arrowG)"
        opacity="0.5"
      />
      <path
        d="M75 44 L68 44"
        stroke="#059669"
        strokeWidth="1.5"
        markerEnd="url(#arrowG)"
        opacity="0.5"
      />
      {/* Bottom: no middleman */}
      <rect
        x="25"
        y="70"
        width="70"
        height="28"
        rx="8"
        fill="#f8fafb"
        stroke="#e2e8f0"
        strokeWidth="1"
      />
      <line
        x1="48"
        y1="78"
        x2="72"
        y2="92"
        stroke="#ef4444"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <line
        x1="72"
        y1="78"
        x2="48"
        y2="92"
        stroke="#ef4444"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <text
        x="42"
        y="88"
        fontSize="7"
        fill="#64748b"
        textAnchor="middle"
        transform="rotate(-4, 42, 88)"
      >
        house
      </text>
      <text x="60" y="100" fontSize="6" fill="#64748b" textAnchor="middle">
        No middleman
      </text>
      <defs>
        <marker
          id="arrowG"
          markerWidth="6"
          markerHeight="4"
          refX="5"
          refY="2"
          orient="auto"
        >
          <path d="M0 0 L6 2 L0 4" fill="#059669" opacity="0.5" />
        </marker>
      </defs>
    </svg>
  );
}
