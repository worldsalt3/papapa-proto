export default function MarketIllustration({
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
      {/* Background grid */}
      <line x1="20" y1="95" x2="100" y2="95" stroke="#e2e8f0" strokeWidth="1" />
      <line
        x1="20"
        y1="75"
        x2="100"
        y2="75"
        stroke="#e2e8f0"
        strokeWidth="0.5"
        strokeDasharray="2 2"
      />
      <line
        x1="20"
        y1="55"
        x2="100"
        y2="55"
        stroke="#e2e8f0"
        strokeWidth="0.5"
        strokeDasharray="2 2"
      />
      <line
        x1="20"
        y1="35"
        x2="100"
        y2="35"
        stroke="#e2e8f0"
        strokeWidth="0.5"
        strokeDasharray="2 2"
      />
      {/* YES bars */}
      <rect
        x="28"
        y="45"
        width="12"
        height="50"
        rx="2"
        fill="#059669"
        opacity="0.7"
      />
      <rect
        x="48"
        y="55"
        width="12"
        height="40"
        rx="2"
        fill="#059669"
        opacity="0.5"
      />
      <rect
        x="68"
        y="35"
        width="12"
        height="60"
        rx="2"
        fill="#059669"
        opacity="0.8"
      />
      <rect
        x="88"
        y="50"
        width="12"
        height="45"
        rx="2"
        fill="#059669"
        opacity="0.6"
      />
      {/* NO bars (overlapping, lighter) */}
      <rect
        x="32"
        y="65"
        width="12"
        height="30"
        rx="2"
        fill="#ef4444"
        opacity="0.3"
      />
      <rect
        x="52"
        y="60"
        width="12"
        height="35"
        rx="2"
        fill="#ef4444"
        opacity="0.35"
      />
      <rect
        x="72"
        y="70"
        width="12"
        height="25"
        rx="2"
        fill="#ef4444"
        opacity="0.25"
      />
      <rect
        x="92"
        y="58"
        width="12"
        height="37"
        rx="2"
        fill="#ef4444"
        opacity="0.3"
      />
      {/* Labels */}
      <text x="20" y="112" fontSize="7" fill="#059669" fontWeight="600">
        YES
      </text>
      <text x="42" y="112" fontSize="7" fill="#ef4444" fontWeight="600">
        NO
      </text>
      {/* Trend line */}
      <polyline
        points="34,42 54,52 74,32 94,47"
        stroke="#059669"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="94" cy="47" r="3" fill="#059669">
        <animate
          attributeName="r"
          values="3;4;3"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Top label */}
      <rect
        x="55"
        y="12"
        width="40"
        height="16"
        rx="4"
        fill="#059669"
        opacity="0.08"
      />
      <text x="62" y="23" fontSize="7" fontWeight="600" fill="#059669">
        75% YES
      </text>
    </svg>
  );
}
