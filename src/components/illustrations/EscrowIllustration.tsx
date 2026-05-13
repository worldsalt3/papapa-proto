export default function EscrowIllustration({
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
      {/* Shield */}
      <path
        d="M60 10 L95 28 V60 C95 85 75 105 60 112 C45 105 25 85 25 60 V28 Z"
        fill="#059669"
        fillOpacity={0.06}
        stroke="#059669"
        strokeWidth="1.5"
        strokeOpacity={0.3}
      />
      <path
        d="M60 20 L88 34 V58 C88 79 71 96 60 102 C49 96 32 79 32 58 V34 Z"
        fill="#059669"
        opacity="0.04"
      />
      {/* Lock */}
      <rect x="48" y="52" width="24" height="20" rx="4" fill="#059669" />
      <path
        d="M52 52 V45 a8 8 0 0 1 16 0 V52"
        stroke="#059669"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="60" cy="62" r="3" fill="white" />
      <rect x="59" y="62" width="2" height="5" rx="1" fill="white" />
      {/* Money flow arrows */}
      <path
        d="M20 45 Q35 50 45 52"
        stroke="#d97706"
        strokeWidth="1.5"
        strokeDasharray="3 2"
        opacity="0.5"
      />
      <path
        d="M100 45 Q85 50 75 52"
        stroke="#d97706"
        strokeWidth="1.5"
        strokeDasharray="3 2"
        opacity="0.5"
      />
      <circle cx="18" cy="44" r="5" fill="#d97706" opacity="0.15" />
      <text x="15" y="47" fontSize="6" fill="#d97706">
        ₦
      </text>
      <circle cx="102" cy="44" r="5" fill="#d97706" opacity="0.15" />
      <text x="99" y="47" fontSize="6" fill="#d97706">
        ₦
      </text>
      {/* Checkmark */}
      <circle cx="60" cy="90" r="8" fill="#059669" opacity="0.1" />
      <path
        d="M55 90 L58 93 L65 86"
        stroke="#059669"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
