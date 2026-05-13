export default function HeroIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left phone */}
      <rect
        x="40"
        y="40"
        width="130"
        height="240"
        rx="16"
        fill="#f8fafb"
        stroke="#e2e8f0"
        strokeWidth="2"
      />
      <rect x="50" y="60" width="110" height="20" rx="4" fill="#e2e8f0" />
      <rect
        x="50"
        y="90"
        width="110"
        height="70"
        rx="8"
        fill="white"
        stroke="#e2e8f0"
        strokeWidth="1.5"
      />
      {/* Wager card inside left phone */}
      <text x="58" y="108" fontSize="8" fontWeight="600" fill="#0f172a">
        Nigeria vs Ghana
      </text>
      <text x="58" y="120" fontSize="7" fill="#64748b">
        AFCON qualifier
      </text>
      <rect
        x="58"
        y="128"
        width="50"
        height="6"
        rx="3"
        fill="#059669"
        opacity="0.7"
      />
      <rect
        x="108"
        y="128"
        width="44"
        height="6"
        rx="3"
        fill="#ef4444"
        opacity="0.5"
      />
      <text x="58" y="148" fontSize="9" fontWeight="700" fill="#059669">
        ₦5,000
      </text>
      <text x="110" y="148" fontSize="7" fill="#64748b">
        stake
      </text>
      {/* User avatar left */}
      <circle cx="66" y="175" r="10" fill="#059669" opacity="0.15" />
      <text x="62" y="179" fontSize="8" fontWeight="600" fill="#059669">
        CO
      </text>
      <text x="82" y="179" fontSize="7" fill="#64748b">
        @chioma_win
      </text>

      {/* Center escrow lock icon */}
      <g transform="translate(175, 120)">
        <circle r="30" fill="#059669" opacity="0.08" />
        <circle r="20" fill="#059669" opacity="0.12" />
        {/* Lock body */}
        <rect x="-10" y="-4" width="20" height="16" rx="3" fill="#059669" />
        {/* Lock shackle */}
        <path
          d="M-6 -4 V-10 a6 6 0 0 1 12 0 V-4"
          stroke="#059669"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Keyhole */}
        <circle cx="0" cy="4" r="2.5" fill="white" />
        <rect x="-1" y="4" width="2" height="4" rx="1" fill="white" />
      </g>
      {/* Escrow label */}
      <text
        x="175"
        y="170"
        fontSize="8"
        fontWeight="600"
        fill="#059669"
        textAnchor="middle"
      >
        ESCROW
      </text>
      <text x="175" y="182" fontSize="7" fill="#64748b" textAnchor="middle">
        Funds locked
      </text>

      {/* Connection lines */}
      <path
        d="M170 140 L145 140"
        stroke="#059669"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.4"
      />
      <path
        d="M210 140 L235 140"
        stroke="#059669"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.4"
      />

      {/* Right phone */}
      <rect
        x="230"
        y="40"
        width="130"
        height="240"
        rx="16"
        fill="#f8fafb"
        stroke="#e2e8f0"
        strokeWidth="2"
      />
      <rect x="240" y="60" width="110" height="20" rx="4" fill="#e2e8f0" />
      <rect
        x="240"
        y="90"
        width="110"
        height="70"
        rx="8"
        fill="white"
        stroke="#e2e8f0"
        strokeWidth="1.5"
      />
      {/* Wager card inside right phone */}
      <text x="248" y="108" fontSize="8" fontWeight="600" fill="#0f172a">
        Accept wager?
      </text>
      <text x="248" y="120" fontSize="7" fill="#64748b">
        Nigeria vs Ghana
      </text>
      <rect x="248" y="128" width="94" height="6" rx="3" fill="#e2e8f0" />
      <rect
        x="248"
        y="128"
        width="55"
        height="6"
        rx="3"
        fill="#059669"
        opacity="0.3"
      />
      <text x="248" y="148" fontSize="9" fontWeight="700" fill="#d97706">
        ₦5,000
      </text>
      <text x="300" y="148" fontSize="7" fill="#64748b">
        to match
      </text>
      {/* Accept button */}
      <rect x="248" y="172" width="46" height="18" rx="4" fill="#059669" />
      <text x="258" y="184" fontSize="7" fontWeight="600" fill="white">
        Accept
      </text>
      <rect
        x="300"
        y="172"
        width="40"
        height="18"
        rx="4"
        fill="white"
        stroke="#e2e8f0"
        strokeWidth="1"
      />
      <text x="310" y="184" fontSize="7" fontWeight="500" fill="#64748b">
        Pass
      </text>

      {/* Floating elements */}
      {/* Money flow particles */}
      <circle cx="155" cy="130" r="3" fill="#059669" opacity="0.3">
        <animate
          attributeName="opacity"
          values="0.3;0.7;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="195" cy="150" r="2" fill="#059669" opacity="0.4">
        <animate
          attributeName="opacity"
          values="0.4;0.8;0.4"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="215" cy="130" r="3" fill="#059669" opacity="0.3">
        <animate
          attributeName="opacity"
          values="0.3;0.6;0.3"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Bottom stats bar */}
      <rect
        x="60"
        y="210"
        width="90"
        height="24"
        rx="6"
        fill="white"
        stroke="#e2e8f0"
        strokeWidth="1"
      />
      <circle cx="74" cy="222" r="4" fill="#059669" opacity="0.2" />
      <text x="82" y="226" fontSize="6" fill="#64748b">
        Win rate: 78%
      </text>

      <rect
        x="250"
        y="210"
        width="90"
        height="24"
        rx="6"
        fill="white"
        stroke="#e2e8f0"
        strokeWidth="1"
      />
      <circle cx="264" cy="222" r="4" fill="#d97706" opacity="0.2" />
      <text x="272" y="226" fontSize="6" fill="#64748b">
        Rep: 72
      </text>
    </svg>
  );
}
